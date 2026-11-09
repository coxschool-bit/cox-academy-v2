'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase'; // Points directly to your firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
    const [profile, setProfile] = useState(null);
    const [classes, setClasses] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uDoc = await getDoc(doc(db, 'users', user.uid));
                if (uDoc.exists() && uDoc.data().role === 'STUDENT') {
                    const uData = uDoc.data();
                    setProfile(uData);

                    // 1. Fetch all classes in this student's household
                    const cQ = query(collection(db, 'classes'), where('householdId', '==', uData.householdId));
                    const cSnap = await getDocs(cQ);
                    setClasses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));

                    // 2. Fetch student's assignment submissions and grades
                    const sQ = query(collection(db, 'submissions'), where('studentId', '==', user.uid));
                    const sSnap = await getDocs(sQ);
                    setSubmissions(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
                } else {
                    router.push('/dashboard'); // Redirect parents back to parent dashboard
                }
            } else {
                router.push('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        sessionStorage.removeItem('parent_unlocked');
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center font-sans">
                <p className="text-dusty-medium animate-pulse font-semibold">Loading Student Portal...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory p-6 md:p-12 space-y-8 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-dusty-light/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-dusty-dark font-serif">Cox Academy</h1>
                    <p className="text-dusty-medium mt-1">Welcome back, {profile?.name}! ({profile?.gradeLevel})</p>
                </div>
                <button onClick={handleLogout} className="mt-4 sm:mt-0 px-6 py-2 bg-ivory-pure border border-peach-medium text-peach-dark text-sm font-semibold rounded-xl hover:bg-peach-light transition">
                    Log Out
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column 1: Enrolled Classes Grid */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm space-y-4">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif">My Classes</h2>
                    {classes.length === 0 ? (
                        <p className="text-gray-400 text-sm">You aren't enrolled in any classes yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {classes.map(cls => (
                                <div key={cls.id} style={{ borderLeftColor: cls.color || '#6082b6' }} className="border-l-4 bg-ivory p-4 rounded-xl flex justify-between items-center border border-dusty-light/10">
                                    <span className="font-semibold text-gray-700">{cls.name}</span>
                                    <span className="text-xs text-dusty-medium font-bold uppercase">{cls.subject}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Column 2: Assignments Feed */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm space-y-4">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif">My Assignments</h2>
                    {submissions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 bg-ivory rounded-xl border border-dusty-light/10 text-center">
                            <span className="text-2xl mb-2">🎉</span>
                            <p className="text-sm font-semibold text-dusty-medium">All homework submitted!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {submissions.map(sub => (
                                <div key={sub.id} className="p-4 bg-ivory rounded-xl border border-dusty-light/10 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-gray-700">{sub.assignmentTitle}</h4>
                                        <span className="text-xs text-gray-400">Due {sub.dueDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`text-xs px-3 py-1 rounded-full font-bold ${sub.status === 'GRADED' ? 'bg-dusty-light text-dusty-dark' : 'bg-peach-light text-peach-dark'}`}>{sub.status}</span>
                                        {sub.grade && <span className="text-sm font-black text-dusty-dark">{sub.grade}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
