"use client";

import { useState } from "react";
import Header from "../components/Header/Header";
import { useRouter } from 'next/navigation';

const dummyUserData = {
    feedbackCount: 4,
    upvotesReceived: 42,
    badge: "Top Reporter Lvl 2",
};

const recentFeedback = [
    {
        id: 1,
        app: "Netflix",
        title: "Add subtitle font support",
        type: "Suggestion",
        upvotes: 10,
        status: "In Review",
    },
    {
        id: 2,
        app: "WhatsApp",
        title: "Can’t open camera",
        type: "Bug",
        upvotes: 8,
        status: "Resolved",
    },
];

const activities = [
    "✅ Zomato bug was marked RESOLVED",
    "💬 2 new comments on Flipkart feedback",
];

const watchedApps = [
    { app: "Netflix", newReports: 3, claimed: true },
    { app: "Instagram", newReports: 1, claimed: false },
];

export default function Dashboard() {
    const [username, setUsername] = useState("User");
    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            <Header onUsernameLoaded={(name) => setUsername(name)} />

            <main className="p-4 md:p-8 space-y-8">
                {/* Welcome Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-800 rounded-xl p-6 shadow-lg">
                    <div>
                        <h2 className="text-2xl font-bold">Welcome back, {username} 👋</h2>
                        <p className="mt-2 text-sm text-zinc-300">🎖 {dummyUserData.badge}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-4">
                        <StatCard label="Reports" value={dummyUserData.feedbackCount} />
                        <StatCard label="Upvotes" value={dummyUserData.upvotesReceived} />
                    </div>
                </section>

                <FeedbackSection />
                <ActivitySection />
                <WatchedAppsSection />

                {/* Stats + Actions */}
                <section className="bg-zinc-800 rounded-xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Stats />
                    <Actions />
                </section>
            </main>
        </div>
    );
}

// --- Component Blocks ---

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-zinc-700 flex-1 min-w-[100px] p-4 rounded-lg text-center shadow">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-zinc-400">{label}</p>
        </div>
    );
}

function FeedbackSection() {
    return (
        <section className="bg-zinc-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📌 My Feedback</h3>
            <ul className="space-y-3">
                {recentFeedback.map((fb) => (
                    <li key={fb.id} className="flex justify-between items-center p-4 bg-zinc-700 rounded-lg">
                        <div>
                            <p className="font-medium">{fb.app}</p>
                            <p className="text-sm text-zinc-300 mt-1">{fb.title}</p>
                        </div>
                        <div className="text-right">
                            <p>👍 {fb.upvotes}</p>
                            <span className="text-sm text-green-400">{fb.status}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="mt-4 text-blue-400 hover:underline">View All →</button>
        </section>
    );
}

function ActivitySection() {
    return (
        <section className="bg-zinc-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🔔 Recent Activity</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
                {activities.map((act, i) => (
                    <li key={i}>{act}</li>
                ))}
            </ul>
        </section>
    );
}

function WatchedAppsSection() {
    return (
        <section className="bg-zinc-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🕵️ Watched Apps</h3>
            <ul className="space-y-3">
                {watchedApps.map((app, i) => (
                    <li key={i} className="flex justify-between items-center p-4 bg-zinc-700 rounded-lg">
                        <div>
                            <p className="font-medium">{app.app}</p>
                            <p className="text-sm text-zinc-400">
                                • {app.newReports} new reports
                            </p>
                        </div>
                        <span
                            className={`text-sm font-semibold ${app.claimed ? "text-green-400" : "text-red-400"
                                }`}
                        >
                            {app.claimed ? "Claimed ✅" : "Unclaimed ❌"}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function Stats() {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">📈 My Stats</h3>
            <div className="flex flex-wrap gap-4">
                <StatCard label="Bugs" value={2} />
                <StatCard label="Suggestions" value={2} />
                <StatCard label="Votes" value={42} />
                <StatCard label="Badges" value={1} />
            </div>
        </div>
    );
}

function Actions() {
    const buttons = [
        "Submit Feedback",
        "Track My Reports",
        "Discover Apps",
        "Account Settings",
    ];
    const router = useRouter();
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">⚡ Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
                {buttons.map((text) => (
                    <button
                        key={text}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                        onClick={() => {
                            if (text === "Discover Apps") {
                                router.push('/discover');
                            } else {
                                console.log(`${text} clicked`);
                                // You can handle other routes or modals here
                            }
                        }}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
}
