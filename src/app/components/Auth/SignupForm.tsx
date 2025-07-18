'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { auth } from '@/lib/firebase';

export default function SignupScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [resendEmail, setResendEmail] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCred.user;
            await sendEmailVerification(user);

            toast.success('Signup successful! Please verify your email.', {
                duration: 5000,
                position: 'top-center',
            });

            router.push('/login');
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
        finally {
            setLoading(false);
        }
    };
    const handleResendVerification = async () => {
        if (!resendEmail) {
            toast.error('Please enter an email address');
            return;
        }
        try {
            const methods = await fetchSignInMethodsForEmail(auth, resendEmail);
            if (methods.length === 0) {
                toast.error('Email not found. Please sign up.');
                return;
            }
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const err = error as { code: string; message?: string };

                if (err.code === 'auth/wrong-password') {
                    const user = auth.currentUser;
                    if (user) {
                        await sendEmailVerification(user);
                        toast.success('Verification email resent successfully.');
                        setShowModal(false);
                        return;
                    }
                }

                toast.error(err.message || 'An unknown error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create a New Account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link href="/login" className="text-blue-600 hover:underline ml-1">
                        Sign in
                    </Link>
                </p>

                {/* <div className="text-center mt-2">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-sm text-purple-600 underline hover:text-purple-800"
                    >
                        Resend Verification Email
                    </button>
                </div> */}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Resend Verification Email</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={resendEmail}
                            onChange={(e) => setResendEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResendVerification}
                                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
