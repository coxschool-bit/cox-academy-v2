'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ParentPortal() {
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('1st Grade');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const q = query(collection(db, 'users'), where('householdId', '==', currentUser.uid), where('role', '==', 'STUDENT'));
                const querySnapshot = await getDocs(q);
                setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const studentData = { name: studentName, role: 'STUDENT', gradeLevel, householdId: user.uid, email: `${studentName.toLowerCase().replace(/\s+/g, '')}@coxacademy.com` };
            const docRef = await addDoc(collection(db, 'users'), studentData);
            setStudents([...students, { id: docRef.id, ...studentData }]);
            setStudentName('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-ivory p-6 md:p-12 space-y-8">
            <div>
                <h1 className="text-3xl font-black text-dusty-dark">Parent Portal</h1>
                <p className="text-dusty-medium mt-1">Manage student registries and academic settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active Students List */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                    <h2 className="text-xl font-bold text-dusty-dark mb-4">Active Students</h2>
                    {students.length === 0 ? <p className="text-gray-400 text-sm">No students registered yet.</p> : (
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

                {/* Add Student Form */}
                <div className="bg-ivory-pure p-6 rounded-2xl border border-dusty-light/20 shadow-sm">
                    <h2 className="text-xl font-bold text-dusty-dark mb-4">Add a Student</h2>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-dusty-dark">Student Name</label>
                            <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 rounded-lg shadow-sm focus:ring-1 focus:ring-dusty-medium text-sm bg-ivory" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dusty-dark">Grade Level</label>
                            <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 rounded-lg shadow-sm focus:ring-1 focus:ring-dusty-medium text-sm bg-ivory">
                                <option>Kindergarten</option><option>1st Grade</option><option>2nd Grade</option><option>3rd Grade</option><option>4th Grade</option><option>5th Grade</option><option>6th Grade</option><option>7th Grade</option><option>8th Grade</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-dusty-medium to-peach-medium hover:from-dusty-dark hover:to-peach-dark rounded-lg shadow-md transition">Add Student</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
