'use client';

import React, { useState } from 'react';
import { FaFilter, FaSearch, FaArrowLeft } from 'react-icons/fa';
import ReportCard from '../components/ReportCard';
import ReportDetailsModal from '../components/ReportDetailsModal';
import { useRouter } from 'next/navigation';
type Report = {
  id: string;
  summary: string;
  appName: string;
  appLogo: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Duplicate';
  submittedAt?: string;
  replies:number
};

const dummyReports: Report[] = [
    {
        id: 'r1',
        appName: 'Photo Editor Pro',
        appLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        summary: 'Crash when applying filter',
        status: 'In Review',
        submittedAt: '2025-07-10', // ✅ Fixed key name
        replies:2
    },
    {
        id: 'r2',
        appName: 'Media Sync',
        appLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        summary: 'Feature request: bulk upload',
        status: 'Resolved',
        submittedAt: '2025-07-05', // ✅ Fixed key name
        replies:5
    },
    {
        id: 'r3',
        appName: 'Instagram',
        appLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        summary: 'Feature request: bulk upload',
        status: 'Resolved',
        submittedAt: '2025-07-05', // ✅ Fixed key name
        replies:5
    },
    {
        id: 'r4',
        appName: 'Netflix',
        appLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        summary: 'Feature request: bulk upload',
        status: 'Pending',
        submittedAt: '2025-07-05', // ✅ Fixed key name
        replies:5
    },
    {
        id: 'r5',
        appName: 'Media Sync',
        appLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxG07G7imc8d_msbZ2helPYuVmRmacEghCg&s',
        summary: 'Feature request: bulk upload',
        status: 'Duplicate',
        submittedAt: '2025-07-05', // ✅ Fixed key name
        replies:5
    },
];

const TrackMyReports = () => {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const router = useRouter();
    return (
        <main className="min-h-screen bg-black text-white px-4 md:px-10 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-yellow-400">📋 My Reports</h1>
                <button className="flex items-center gap-2 text-white hover:text-yellow-400"
                    onClick={() => router.push('/dashboard')}>
                    <FaArrowLeft className="text-lg" />
                    <span>Back</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Search your reports..."
                    className="w-full bg-zinc-900 text-white px-4 py-2 rounded border border-zinc-700 focus:outline-none focus:border-yellow-400"
                />
                <FaSearch className="absolute right-4 top-3 text-gray-400" />
            </div>

            {/* Report List */}
            <div className="grid md:grid-cols-2 gap-4">
                {dummyReports.map((report) => (
                    <ReportCard key={report.id} report={report} onClick={() => setSelectedReport(report)} />
                ))}
            </div>

            {/* Report Detail Modal */}
            {selectedReport && (
                <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />
            )}
        </main>
    );
};

export default TrackMyReports;
