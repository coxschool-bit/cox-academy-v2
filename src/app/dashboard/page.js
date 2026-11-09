'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

export default function DashboardPage() {
    const [profile, setProfile] = useState(null);
    const [household, setHousehold] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // 1. Fetch user's profile
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const profileData = userDoc.data();
                    setProfile(profileData);

                    // 2. Fetch Household details
                    const houseDoc = await getDoc(doc(db, 'households', profileData.householdId));
                    if (profileData.householdId) {
                        const houseDoc = await getDoc(doc(db, 'households', profileData.householdId));
                        if (houseDoc.exists()) {
                            setHousehold(houseDoc.data());
                        }
                    }

                    // 3. Fetch all students belonging to this Household
                    const studentQuery = query(
                        collection(db, 'users'),
                        where('householdId', '==', profileData.householdId),
                        where('role', '==', 'STUDENT')
                    );
                    const studentSnapshot = await getDocs(studentQuery);
                    setStudents(studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center font-sans">
                <p className="text-dusty-medium animate-pulse font-semibold">Loading Cox Academy...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory p-6 md:p-12 space-y-8 font-sans">
            {/* Dynamic Household Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-dusty-light/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-dusty-dark font-serif">
                        {household?.name || 'Cox Academy'}
                    </h1>
                    <p className="text-dusty-medium mt-1">Welcome back, {profile?.name}!</p>
                </div>
                {profile?.role === 'PARENT' && (
                    <Link href="/dashboard/parent" className="mt-4 sm:mt-0 px-6 py-2.5 bg-dusty-medium hover:bg-dusty-dark text-white text-sm font-semibold rounded-xl shadow-sm transition">
                        Open Parent Portal
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Student Portals Section */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm space-y-4">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif">Student Portals</h2>
                    {students.length === 0 ? (
                        <p className="text-gray-400 text-sm">No students registered yet. Go to your Parent Portal to add one!</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {students.map(std => (
                                <Link
                                    href={`/student/${std.id}`}
                                    key={std.id}
                                    className="p-5 bg-ivory hover:bg-peach-light/40 border border-dusty-light/10 hover:border-peach-medium rounded-xl flex flex-col justify-between transition group transform hover:-translate-y-0.5"
                                >
                                    <span className="font-bold text-gray-800 group-hover:text-peach-dark">{std.name}</span>
                                    <span className="text-xs text-dusty-medium font-bold mt-2">Open Portal ➔</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Schedule Widget */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                    <h2 className="text-xl font-bold text-dusty-dark font-serif mb-4">Today's Tasks</h2>
                    <div className="flex flex-col items-center justify-center p-8 bg-ivory rounded-xl border border-dusty-light/10 text-center">
                        <span className="text-2xl mb-2">🎉</span>
                        <p className="text-sm font-semibold text-dusty-medium">All caught up for today!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
