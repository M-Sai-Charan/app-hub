'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(180); // 3 minutes

    useEffect(() => {
        if (otpSent && timer > 0) {
            const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(countdown);
        }
    }, [otpSent, timer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success('OTP sent to your email!');
            setOtpSent(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            toast.error('Enter valid 6-digit OTP');
            return;
        }

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, otp }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success('Email verified!');
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                {!otpSent ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h1 className="text-2xl font-bold text-center text-gray-800">Create a New Account</h1>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
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
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
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
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            Already have an account?
                            <Link href="/login" className="text-blue-600 hover:underline ml-1">Login</Link>
                        </p>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-center text-gray-800">Verify Email</h2>
                        <p className="text-center text-gray-600">Please enter the 6-digit code sent to <b>{form.email}</b></p>
                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}

                            className="w-full px-4 py-2 border text-center  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="Enter OTP"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                        >
                            Verify & Continue
                        </button>
                        <p className="text-sm text-center text-gray-500">
                            Code expires in: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
