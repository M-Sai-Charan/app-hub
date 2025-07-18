'use client';

import {
    getAuth,
    updateProfile,
    signOut,
    User,
    onAuthStateChanged,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, storage } from '@/lib/firebase';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfileSettings() {
    const auth = getAuth(app);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [instagram, setInstagram] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (!u) router.push('/login');
            else {
                setUser(u);
                setDisplayName(u.displayName || '');
                setPhotoURL(u.photoURL || '');
                // TODO: load profile JSON from Firestore
            }
        });
        return unsub;
    }, [auth, router]);

    const handleImageSelect = (file: File | null) => {
        if (!file) return;
        setPhotoFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleProfileUpdate = async () => {
        if (!user) return toast.error('Not signed in');
        try {
            setLoading(true);
            let finalPhotoURL = photoURL;

            if (photoFile) {
                const fileRef = ref(storage, `avatars/${user.uid}`);
                await uploadBytes(fileRef, photoFile);
                finalPhotoURL = await getDownloadURL(fileRef);
            }

            await updateProfile(user, {
                displayName,
                photoURL: finalPhotoURL,
            });
            setPhotoURL(finalPhotoURL);
            toast.success('Profile updated!');
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8">
                <div className="max-w-3xl mx-auto bg-zinc-800 rounded-xl p-6 md:p-10 shadow-lg space-y-8">
                    <button
                        className="text-gray-300 hover:text-white mb-4"
                        onClick={() => router.push('/dashboard')}
                    >
                        ← Back to Dashboard
                    </button>

                    <h1 className="text-2xl font-bold text-yellow-400">
                        Profile Settings
                    </h1>

                    {/* Avatar and name */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative w-28 h-28 rounded-full border-2 border-yellow-500 overflow-hidden">
                            <Image
                                src={
                                    previewImage ||
                                    photoURL ||
                                    `https://ui-avatars.com/api/?name=${displayName || 'User'}`
                                }
                                alt="Avatar"
                                fill
                                className="object-cover"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-2 right-2 bg-yellow-400 p-2 rounded-full text-black hover:bg-yellow-300"
                            >
                                <FaEdit size={16} />
                            </button>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => handleImageSelect(e.target.files?.[0] || null)}
                        />
                        <div className="flex-1 space-y-2">
                            <label className="block text-sm text-gray-300">Name</label>
                            <input
                                className="w-full bg-zinc-700 rounded-md p-2"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Contact & personal info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                disabled
                                value={user?.email || ''}
                                className="w-full bg-zinc-700 rounded-md p-2 text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-300">Location (City)</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-zinc-700 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-300">Phone (optional)</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                className="w-full bg-zinc-700 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-300">Website</label>
                            <input
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                type="url"
                                className="w-full bg-zinc-700 rounded-md p-2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm text-gray-300">Instagram</label>
                            <input
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                placeholder="@yourhandle"
                                className="w-full bg-zinc-700 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Bio / About</label>
                        <textarea
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full bg-zinc-700 rounded-md p-2 resize-none"
                            placeholder="Tell us a bit about yourself..."
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleProfileUpdate}
                            disabled={loading}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold p-3 rounded-md transition"
                        >
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold p-3 rounded-md transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
