'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ParentPortal() {
    const [activeTab, setActiveTab] = useState('students');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pin, setPin] = useState('');
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [household, setHousehold] = useState(null);
    const [user, setUser] = useState(null);

    // Form States
    const [studentName, setStudentName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('Kindergarten');
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('Math');
    const [classColor, setClassColor] = useState('#6082b6');
    const [householdName, setHouseholdName] = useState('');
    const [parentPin, setParentPin] = useState('');

    const router = useRouter();
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

    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6 text-center">
                <form onSubmit={handleVerifyPin} className="bg-ivory-pure p-8 rounded-2xl border border-dusty-light/20 shadow-md max-w-sm w-full space-y-4">
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
        <div className="min-h-screen bg-ivory p-6 md:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-dusty-light/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-dusty-dark font-serif">Parent Portal</h1>
                    <p className="text-dusty-medium mt-1">Configure {household?.name}</p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button onClick={handleLogout} className="px-4 py-2 border border-peach-medium hover:bg-peach-light text-peach-dark text-sm font-semibold rounded-xl transition">Log Out</button>
                    <Link href="/dashboard" className="px-6 py-2 bg-ivory-pure border border-dusty-light/20 text-dusty-dark text-sm font-semibold rounded-xl hover:bg-ivory transition">Back to Dashboard</Link>
                </div>
            </div>

            <div className="flex space-x-2 border-b border-dusty-light/10 pb-2">
                {['students', 'classes', 'settings'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition uppercase tracking-wider ${activeTab === tab ? 'bg-dusty-medium text-white shadow-sm' : 'text-dusty-medium hover:bg-ivory-pure'}`}>{tab}</button>
                ))}
            </div>

            {activeTab === 'students' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                        <h2 className="text-xl font-bold text-dusty-dark font-serif mb-4">Active Students</h2>
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
                        <h2 className="text-xl font-bold text-dusty-dark font-serif mb-4">Add a Student</h2>
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

            {activeTab === 'classes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                        <h2 className="text-xl font-bold text-dusty-dark font-serif mb-4">Current Classes</h2>
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
                        <h2 className="text-xl font-bold text-dusty-dark font-serif mb-4">Create Class</h2>
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

            {activeTab === 'settings' && (
                <div className="max-w-md mx-auto bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif">Settings</h2>
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
        </div>
    );
}
