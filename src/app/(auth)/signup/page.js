'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase'; // Point directly to your firebase.js
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PARENT'); // Default to Parent
    const [householdName, setHouseholdName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {

            // 1. Create user incredentials in Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let householdId = null;

            // 2. Now that the user is logged in, creating the Household will succeed!
            if (role === 'PARENT') {
                const householdRef = await addDoc(collection(db, 'households'), {
                    name: householdName,
                    subscriptionTier: 'no_cost_trial',
                    createdAt: new Date().toISOString()
                });
                householdId = householdRef.id;
            }

            // 3. Create the parent profile document linking to the Household
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name,
                email,
                role,
                householdId, //Links the parent to their new household
                createdAt: new Date().toISOString()
            });

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
                <p className="text-sm text-gray-500 mt-1 font-sans">Join Cox Academy and start learning</p>
            </div>

            {error &&
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                    {error}
                </div>}

            <form onSubmit={handleSignup} className="space-y-4 font-sans">
                <div>
                    <label className="block text-sm font-semibold text-dusty-dark">Register as a...</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium bg-white"
                    >
                        <option value="PARENT"> Parent / Guardian</option>
                        <option value="TEACHER">Independent Teacher / Tutor</option>
                    </select>
                </div>

                {/* Dynamically hide the Household input if they select Teacher! */}
                {role === 'PARENT' && (
                    <div className="transition">
                        <label className="block text-sm font-semibold text-dusty-dark">Household Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Jones Family"
                            value={householdName}
                            onChange={(e) => setHouseholdName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-semibold text-dusty-dark">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-dusty-dark">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-dusty-dark">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 bg-ivory rounded-lg text-sm focus:ring-dusty-medium" />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-dusty-medium to peach-medium hover:from-dusty-dark hover-to-peach-dark rounded-lg shadow-md transition disabled:opacity-50">
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 font-sans">
                Already have an account? <Link href="/login" className="font-semibold text-dusty-medium hover:text-dusty-dark">Sign in</Link>
            </p>
        </div>
    );
}
