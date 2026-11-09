'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../lib/firebase'; // Point directly to your firebase.js
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const [profile, setProfile] = useState(null);
    const [household, setHousehold] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uDoc = await getDoc(doc(db, 'users', user.uid));
                if (uDoc.exists()) {
                    const uData = uDoc.data();
                    // Smart Redirect: If user is a student, instantly route them to their dashboard!
                    if (uData.role === 'STUDENT') {
                        router.push('/dashboard/student');
                        return;
                    }
                    setProfile(uData);
                    if (uData.householdId) {
                        const hDoc = await getDoc(doc(db, 'households', uData.householdId));
                        if (hDoc.exists()) setHousehold(hDoc.data());
                    }
                    const sQuery = query(collection(db, 'users'), where('householdId', '==', uData.householdId), where('role', '==', 'STUDENT'));
                    const sSnapshot = await getDocs(sQuery);
                    setStudents(sSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
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
        sessionStorage.removeItem('parent_unlocked'); // Clears Parent Portal PIN
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <p className="text-dusty-medium animate-pulse font-semibold">Loading Cox Academy...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory p-6 md:p-12 space-y-8 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-dusty-light/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-dusty-dark font-serif">{household?.name || 'Cox Academy'}</h1>
                    <p className="text-dusty-medium mt-1">Welcome back, {profile?.name}!</p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button onClick={handleLogout} className="px-4 py-2 border border-peach-medium hover:bg-peach-light text-peach-dark text-sm font-semibold rounded-xl transition">Log Out</button>
                    <Link href="/dashboard/parent" className="px-6 py-2.5 bg-dusty-medium hover:bg-dusty-dark text-white text-sm font-semibold rounded-xl shadow-sm transition">Open Parent Portal</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Cards Grid */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm space-y-4">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif">Student Portals</h2>
                    {students.length === 0 ? (
                        <p className="text-gray-400 text-sm">No students registered yet. Go to your Parent Portal to add one!</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {students.map(std => (
                                <div key={std.id} className="p-5 bg-ivory border border-dusty-light/10 rounded-xl flex flex-col justify-between">
                                    <span className="font-bold text-gray-800">{std.name}</span>
                                    <span className="text-xs text-gray-400 mt-1">{std.gradeLevel}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Task Widget */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif mb-4">Today's Tasks</h2>
                    <div className="flex flex-col items-center justify-center p-8 bg-ivory rounded-xl border border-dusty-light/10 text-center">
                        <span className="text-2xl mb-2">🎉</span>
                        <p className="text-sm font-semibold text-dusty-medium font-sans">All caught up for today!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
