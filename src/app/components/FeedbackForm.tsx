'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPaperclip, FaBug, FaSmile, FaStar } from 'react-icons/fa';

const feedbackTypes = [
    { label: 'Bug', icon: <FaBug /> },
    { label: 'Suggestion', icon: <FaStar /> },
    { label: 'Outage', icon: <FaBug /> },
    { label: 'Compliment', icon: <FaSmile /> },
    { label: 'Other', icon: <FaPaperclip /> },
];

const SubmitFeedback = () => {
    const router = useRouter();
    const [appName, setAppName] = useState('OLP Discovery'); // Can be autofilled from context
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const [osInfo, setOsInfo] = useState(navigator.userAgent);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!type || !description) return alert('Please fill in required fields');
        console.log({ appName, type, description, steps, attachment, osInfo });
        setSubmitted(true);
        setTimeout(() => {
            router.back()
            setSubmitted(false)
        }, 3000);

    };

    return (
        <main className="bg-black min-h-screen text-white px-4 md:px-10 py-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-yellow-400">📝 Submit Feedback</h1>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white hover:text-yellow-400"
                >
                    <FaArrowLeft className="text-lg" />
                    <span>Back</span>
                </button>
            </div>

            {/* Form */}
            <div className="bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm space-y-5">

                {/* App Name (Autofilled) */}
                <div>
                    <label className="block text-sm mb-1">App Name</label>
                    <input
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-black/40 border border-gray-700 focus:outline-yellow-400"
                    />
                </div>

                {/* Feedback Type */}
                <div>
                    <label className="block text-sm mb-2">Feedback Type <span className="text-red-400">*</span></label>
                    <div className="flex flex-wrap gap-3">
                        {feedbackTypes.map(({ label, icon }) => (
                            <button
                                key={label}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${type === label ? 'bg-yellow-400 text-black' : 'border-gray-600 text-white hover:bg-white/10'
                                    }`}
                                onClick={() => setType(label)}
                            >
                                {icon} {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm mb-1">Describe the issue or suggestion <span className="text-red-400">*</span></label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="You can use **markdown** here..."
                        className="w-full px-4 py-2 rounded bg-black/40 border border-gray-700 focus:outline-yellow-400"
                    />
                </div>

                {/* Steps to Reproduce (Optional) */}
                <div>
                    <label className="block text-sm mb-1">Steps to Reproduce (optional)</label>
                    <textarea
                        rows={3}
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="E.g., 1. Click X, 2. Open Y, 3. See error"
                        className="w-full px-4 py-2 rounded bg-black/40 border border-gray-700"
                    />
                </div>

                {/* Attachments */}
                <div>
                    <label className="block text-sm mb-1">Attachment (Screenshot or Log)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                        className="text-sm text-gray-400 file:bg-gray-700 file:border-none file:rounded file:px-4 file:py-2"
                    />
                </div>

                {/* OS Info */}
                <div>
                    <label className="block text-sm mb-1">Device Info</label>
                    <input
                        value={osInfo}
                        disabled
                        className="w-full px-4 py-2 rounded bg-black/40 border border-gray-700 text-gray-400 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 transition"
                    >
                        Submit Feedback
                    </button>
                </div>
            </div>

            {/* Confirmation Toast */}
            {submitted && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
                    ✅ Thank you! Your feedback has been submitted.
                </div>
            )}
        </main>
    );
};

export default SubmitFeedback;
