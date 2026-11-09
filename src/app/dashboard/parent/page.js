'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ParentPortal() {
    const [activeMenu, setActiveMenu] = useState('Home'); // 'Home', 'Students', 'Classes', etc.
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pin, setPin] = useState('');
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [household, setHousehold] = useState(null);
    const [user, setUser] = useState(null);
    const [showPinPrompt, setShowPinPrompt] = useState(false);
    const [newPin, setNewPin] = useState('');

    // Form States
    const [studentName, setStudentName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('Kindergarten');
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('Math');
    const [classColor, setClassColor] = useState('#6082b6');
    const [householdName, setHouseholdName] = useState('');
    const [parentPin, setParentPin] = useState('');

    const router = useRouter();
    const menuItems = ['Home', 'Students', 'Classes', 'Assignments', 'Gradebook', 'Attendance', 'Scheduler', 'Settings'];
    const grades = ['Kindergarten', ...Array.from({ length: 12 }, (_, i) => `${i + 1}th Grade`)];
    const colors = ['#6082b6', '#f8a488', '#df8a69', '#10B981', '#EC4899', '#F59E0B'];

    useEffect(() => {
        setIsUnlocked(sessionStorage.getItem('parent_unlocked') === 'true');
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const uDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (uDoc.exists()) {
                    const uData = uDoc.data();
                    setUser(uData);
                    const hDoc = await getDoc(doc(db, 'households', uData.householdId));
                    if (hDoc.exists()) {
                        setHousehold({ id: hDoc.id, ...hDoc.data() });
                        setHouseholdName(hDoc.data().name);
                        const hasNoPin = !hDoc.data().parentPin;
                        const dismissedBefore = sessionStorage.getItem('dismissed_pin_prompt') === 'true';
                        if (hasNoPin && !dismissedBefore) setShowPinPrompt(true);
                    }
                    const sQ = query(collection(db, 'users'), where('householdId', '==', uData.householdId), where('role', '==', 'STUDENT'));
                    const sSnap = await getDocs(sQ);
                    setStudents(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
                    const cQ = query(collection(db, 'classes'), where('householdId', '==', uData.householdId));
                    const cSnap = await getDocs(cQ);
                    setClasses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const handleVerifyPin = (e) => {
        e.preventDefault();
        if (pin === (household?.parentPin || '1234')) {
            sessionStorage.setItem('parent_unlocked', 'true');
            setIsUnlocked(true);
        } else alert('Incorrect PIN!');
    };

    const handleLogout = async () => {
        await signOut(auth);
        sessionStorage.removeItem('parent_unlocked');
        router.push('/login');
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const data = { name: studentName, role: 'STUDENT', gradeLevel, householdId: user.householdId };
        const ref = await addDoc(collection(db, 'users'), data);
        setStudents([...students, { id: ref.id, ...data }]);
        setStudentName('');
    };

    const handleCreateClass = async (e) => {
        e.preventDefault();
        const data = { name: className, subject, color: classColor, householdId: user.householdId };
        const ref = await addDoc(collection(db, 'classes'), data);
        setClasses([...classes, { id: ref.id, ...data }]);
        setClassName('');
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        const data = { name: householdName };
        if (parentPin.length === 4) data.parentPin = parentPin;
        await updateDoc(doc(db, 'households', user.householdId), data);
        setHousehold({ ...household, ...data });
        setParentPin('');
        alert('Settings saved!');
    };

    const handleSavePin = async (e) => {
        e.preventDefault();
        if (newPin.length === 4) {
            await updateDoc(doc(db, 'households', user.householdId), { parentPin: newPin });
            setHousehold({ ...household, parentPin: newPin });
            setShowPinPrompt(false);
            alert('PIN saved!');
        }
    };

    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6 text-center">
                <form onSubmit={handleVerifyPin} className="bg-ivory-pure p-8 rounded-2xl border border-dusty-light/20 shadow-md max-w-sm w-full space-y-4 font-sans">
                    <span className="text-4xl">🔐</span>
                    <h2 className="text-2xl font-bold text-dusty-dark font-serif">Parent Verification</h2>
                    <p className="text-sm text-gray-500">Enter your 4-digit PIN to access Parent Portal.</p>
                    <input type="password" maxLength={4} required placeholder="••••" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full text-center text-2xl tracking-widest px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg focus:ring-dusty-medium" />
                    <button type="submit" className="w-full py-2.5 bg-dusty-medium hover:bg-dusty-dark text-white font-semibold rounded-lg">Verify PIN</button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-ivory font-sans">
            {/* 🚀 Left Sidebar Navigation */}
            <aside className="hidden md:flex flex-col justify-between w-64 bg-ivory-pure border-r border-dusty-light/20 p-6">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl font-black text-dusty-dark font-serif">{household?.name || 'Cox Academy'}</h1>
                        <p className="text-xs text-dusty-medium mt-1 uppercase tracking-wider font-semibold">Parent Portal</p>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map(item => (
                            <button key={item} onClick={() => setActiveMenu(item)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center space-x-3 ${activeMenu === item ? 'bg-dusty-medium text-white shadow-sm' : 'text-dusty-medium hover:bg-ivory hover:text-dusty-dark'}`}>
                                <span>{item === 'Home' ? '🏡' : item === 'Students' ? '👥' : item === 'Classes' ? '📚' : item === 'Assignments' ? '📝' : item === 'Gradebook' ? '📊' : item === 'Attendance' ? '📅' : item === 'Scheduler' ? '🗓️' : '⚙️'}</span>
                                <span>{item}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Footer Controls */}
                <div className="space-y-3 pt-6 border-t border-dusty-light/10">
                    <Link href="/dashboard" className="w-full py-2.5 bg-ivory border border-dusty-light/20 text-dusty-dark text-sm font-semibold rounded-xl hover:bg-ivory-pure transition flex items-center justify-center">
                        Back to Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full py-2.5 border border-peach-medium hover:bg-peach-light text-peach-dark text-sm font-semibold rounded-xl transition">
                        Log Out
                    </button>
                </div>
            </aside>

            {/* 🚀 Right Main Content Pane */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto space-y-6">
                <div className="border-b border-dusty-light/10 pb-4">
                    <h2 className="text-3xl font-bold text-dusty-dark font-serif">{activeMenu}</h2>
                    <p className="text-sm text-dusty-medium mt-1">Configure your homeschool’s {activeMenu.toLowerCase()} settings</p>
                </div>

                {/* Section: Home */}
                {activeMenu === 'Home' && (
                    <div className="bg-ivory-pure p-8 rounded-2xl border border-dusty-light/20 shadow-sm space-y-4">
                        <h3 className="text-xl font-bold text-dusty-dark font-serif">Welcome to the Parent Command Center</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Use the sidebar menu to navigate between students, classes, assignments, and school settings. Everything is saved automatically in real-time to your local database [1, 2]!
                        </p>
                    </div>
                )}

                {/* Section: Students */}
                {activeMenu === 'Students' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                            <h3 className="text-xl font-bold text-dusty-dark font-serif mb-4">Active Students</h3>
                            {students.length === 0 ? <p className="text-gray-400 text-sm">No students registered.</p> : (
                                <div className="space-y-3">
                                    {students.map(std => (
                                        <div key={std.id} className="p-4 bg-ivory rounded-xl flex justify-between items-center border border-dusty-light/10">
                                            <span className="font-semibold text-gray-700">{std.name}</span>
                                            <span className="text-xs bg-peach-light text-peach-dark px-3 py-1 rounded-full font-bold">{std.gradeLevel}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                            <h3 className="text-xl font-bold text-dusty-dark font-serif mb-4">Add a Student</h3>
                            <form onSubmit={handleAddStudent} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-dusty-dark">Student Name</label>
                                    <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dusty-dark">Grade Level</label>
                                    <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium bg-white">
                                        {grades.map(g => <option key={g}>{g}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-dusty-medium to-peach-medium hover:from-dusty-dark hover:to-peach-dark text-white font-semibold rounded-lg shadow-md transition">Add Student</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Section: Classes */}
                {activeMenu === 'Classes' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                            <h3 className="text-xl font-bold text-dusty-dark font-serif mb-4">Current Classes</h3>
                            {classes.length === 0 ? <p className="text-gray-400 text-sm">No classes created.</p> : (
                                <div className="space-y-3">
                                    {classes.map(cls => (
                                        <div key={cls.id} style={{ borderLeftColor: cls.color }} className="border-l-4 bg-ivory p-4 rounded-xl flex justify-between items-center border border-dusty-light/10">
                                            <span className="font-semibold text-gray-700">{cls.name}</span>
                                            <span className="text-xs text-dusty-medium font-bold uppercase">{cls.subject}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                            <h3 className="text-xl font-bold text-dusty-dark font-serif mb-4">Create Class</h3>
                            <form onSubmit={handleCreateClass} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-dusty-dark">Class Name</label>
                                    <input type="text" required placeholder="e.g. Algebra 101" value={className} onChange={(e) => setClassName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dusty-dark">Subject</label>
                                    <input type="text" required placeholder="e.g. Math" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-dusty-dark">Subject Color</label>
                                    <div className="flex space-x-3 mt-2">
                                        {colors.map(c => (
                                            <button type="button" key={c} onClick={() => setClassColor(c)} style={{ backgroundColor: c }} className={`w-8 h-8 rounded-full border-2 transition ${classColor === c ? 'border-dusty-dark scale-110' : 'border-transparent'}`} />
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-dusty-medium to-peach-medium hover:from-dusty-dark hover:to-peach-dark text-white font-semibold rounded-lg shadow-md transition">Create Class</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Placeholder Sections */}
                {['Assignments', 'Gradebook', 'Attendance', 'Scheduler'].includes(activeMenu) && (
                    <div className="bg-ivory-pure p-8 rounded-2xl border border-dusty-light/20 shadow-sm text-center py-16 space-y-3">
                        <span className="text-4xl">{activeMenu === 'Assignments' ? '📝' : activeMenu === 'Gradebook' ? '📊' : activeMenu === 'Attendance' ? '📅' : '🗓️'}</span>
                        <h3 className="text-xl font-bold text-dusty-dark font-serif">{activeMenu} Section</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">This dashboard module is under construction and ready for database integration [1, 2]!</p>
                    </div>
                )}

                {/* Section: Settings */}
                {activeMenu === 'Settings' && (
                    <div className="max-w-md bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm space-y-6">
                        <form onSubmit={handleUpdateSettings} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-dusty-dark">Academy Name</label>
                                <input type="text" required value={householdName} onChange={(e) => setHouseholdName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-dusty-dark">Change Portal PIN (4 Digits)</label>
                                <input type="password" maxLength={4} placeholder="e.g. 5678" value={parentPin} onChange={(e) => setParentPin(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium" />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-dusty-medium hover:bg-dusty-dark text-white font-semibold rounded-lg transition">Save Changes</button>
                        </form>
                    </div>
                )}
            </main>

            {/* Setup PIN Prompt Overlay */}
            {showPinPrompt && (
                <div className="fixed inset-0 bg-dusty-dark/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-ivory-pure p-8 rounded-2xl border border-dusty-light/30 shadow-xl max-w-sm w-full text-center space-y-4">
                        <span className="text-4xl">🛡️</span>
                        <h3 className="text-2xl font-bold text-dusty-dark font-serif">Secure Your Academy</h3>
                        <p className="text-sm text-gray-500">Protect your portal settings! Set a 4-digit Parent PIN.</p>
                        <form onSubmit={handleSavePin} className="space-y-4">
                            <input type="password" maxLength={4} required placeholder="••••" value={newPin} onChange={(e) => setNewPin(e.target.value)} className="w-full text-center text-2xl tracking-widest px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg focus:ring-dusty-medium" />
                            <div className="flex space-x-3">
                                <button type="button" onClick={() => { sessionStorage.setItem('dismissed_pin_prompt', 'true'); setShowPinPrompt(false); }} className="w-1/2 py-2.5 border border-peach-medium hover:bg-peach-light text-peach-dark text-sm font-semibold rounded-lg transition">Not Now</button>
                                <button type="submit" className="w-1/2 py-2.5 bg-dusty-medium hover:bg-dusty-dark text-white text-sm font-semibold rounded-lg transition">Save PIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
