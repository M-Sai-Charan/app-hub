'use client';
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation";
export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                toast.error('Please verify your email before logging in.');
                return;
            }
            toast.success('Login successful!');
            router.push("/dashboard"); 
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                'message' in error
            ) {
                const err = error as { code: string; message: string };
                switch (err.code) {
                    case 'auth/user-not-found':
                        toast.error('No user found with this email.');
                        break;
                    case 'auth/wrong-password':
                        toast.error('Incorrect password.');
                        break;
                    default:
                        toast.error(err.message);
                }
            } else {
                toast.error('Login failed. Please try again.');
            }
        }
    };

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success('Password reset email sent!');
            setShowForgot(false);
            setResetEmail('');
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'message' in err) {
                toast.error((err as { message: string }).message, {
                    duration: 4000,
                    position: 'top-center',
                });
            } else {
                toast.error('An unexpected error occurred.', {
                    duration: 4000,
                    position: 'top-center',
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in">
                {!showForgot && (
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back 👋</h1>
                        <p className="text-sm text-gray-500">Sign in to continue to your account</p>
                    </div>
                )}
                {!showForgot ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right text-sm">
                            <button
                                type="button"
                                onClick={() => setShowForgot(true)}
                                className="text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-center text-gray-700">
                            Reset Your Password
                        </h2>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        <button
                            onClick={handleForgotPassword}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                        >
                            Send Reset Email
                        </button>
                        <button
                            onClick={() => setShowForgot(false)}
                            className="w-full text-sm text-gray-600 hover:underline text-center mt-2"
                        >
                            Back to login
                        </button>
                    </div>
                )}

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
