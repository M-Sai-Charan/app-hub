import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
type Report = {
    id: string;
    summary: string;
    appName: string;
    appLogo: string;
    status: 'Pending' | 'In Review' | 'Resolved' | 'Duplicate';
    submittedAt?: string;
    replies: number
};
interface Props {
    report: Report;
    onClose: () => void;
}

const ReportDetailsModal: React.FC<Props> = ({ report, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
            <div className="bg-zinc-900 w-full max-w-xl rounded-lg shadow-lg border border-yellow-400 relative overflow-hidden">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-yellow-400">
                    <FaTimes size={18} />
                </button>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Image
                            src={report.appLogo}
                            alt={report.appName}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                            priority
                        />
                        <div>
                            <h2 className="text-xl font-bold text-yellow-400">{report.appName}</h2>
                            <p className="text-sm text-gray-400">{report.submittedAt}</p>
                        </div>
                    </div>

                    <p className="text-white mb-4">{report.summary}</p>

                    <div className="bg-zinc-800 rounded-lg p-3 text-sm text-gray-300">
                        <strong>Status:</strong> <span className="text-yellow-400">{report.status}</span><br />
                        <strong>Replies:</strong> {report.replies}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsModal;
