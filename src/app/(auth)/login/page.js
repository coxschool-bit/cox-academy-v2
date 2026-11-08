'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../lib/firebase'; // Point directly to your firebase.js
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            router.push('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Welcome Back</h2>
                <p className="text-sm text-gray-500 mt-1">Sign in to your Cox Academy account</p>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-dusty-light/30 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-dusty-medium bg-ivory focus:border-dusty-medium text-sm"
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
                <button type="submit" className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-dusty-medium hover:bg-dusty-dark rounded-lg shadow-sm transition">
                    Sign In
                </button>
            </form>

            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <span className="relative px-3 bg-white text-xs text-gray-500 uppercase">Or continue with</span>
            </div>

            <button onClick={handleGoogleLogin} className="w-full py-2.5 px-4 border border-dusty-light/30 hover:bg-ivory bg-ivory-pure rounded-lg flex items-center justify-center space-x-2 text-sm font-semibold text-gray-700 transition">
                <span>🔑 Google Sign-In</span>
            </button>

            <p className="text-center text-sm text-gray-500">
                Don't have an account? <Link href="/signup" className="font-semibold text-dusty-medium hover:text-dusty-dark">Sign up</Link>
            </p>
        </div>
    );
}
