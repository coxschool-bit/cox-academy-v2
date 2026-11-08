'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase'; // Point directly to your firebase.js
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PARENT'); // Default to Parent
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // 1. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Automatically create their profile document in Cloud Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name,
                email,
                role,
                createdAt: new Date().toISOString(),
            });

            // 3. Navigate straight to the dashboard
            router.push('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Create Account</h2>
                <p className="text-sm text-gray-500 mt-1">Join Cox Academy and start learning</p>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-dusty-medium bg ivory focus:border-dusty-medium text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-ivory-pure border border-dusty-light/40 rounded-lg shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-dusty-medium focus:ring-1 focus:ring-dusty-medium transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-dusty-medium focus:border-dusty-medium text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">I am registering as a...</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-dusty-medium bg-ivory focus:border-dusty-light/30 text-sm bg-white"
                    >
                        <option value="PARENT">Parent / Guardian</option>
                        <option value="TEACHER">Independent Teacher / Tutor</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-dusty-medium hover:bg-dusty-dark rounded-lg shadow-sm transition disabled:opacity-50"
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500">
                Already have an account? <Link href="/login" className="font-semibold text-dusty-medium hover:text-dusty-dark">Sign in</Link>
            </p>
        </div>
    );
}
