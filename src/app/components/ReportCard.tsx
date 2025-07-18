import React from 'react';

type Report = {
  id: string;
  summary: string;
  appName: string;
  appLogo: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Duplicate';
  submittedAt?: string;
};

type Props = {
  report: Report;
  onClick: () => void;
};

// Status badge color helper
const getStatusColor = (status: Report['status']) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-500 text-black';
    case 'In Review':
      return 'bg-blue-500 text-white';
    case 'Resolved':
      return 'bg-green-600 text-white';
    case 'Duplicate':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const ReportCard: React.FC<Props> = ({ report, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-zinc-900 border border-yellow-400 rounded-lg p-4 shadow-md hover:shadow-yellow-500/20 hover:border-yellow-300 transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-yellow-300">
          {report.summary}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>
      <p className="text-sm text-gray-400">App: {report.appName}</p>
      {report.submittedAt && (
        <p className="text-xs text-gray-500 mt-1">Submitted: {report.submittedAt}</p>
      )}
    </div>
  );
};

export default ReportCard;
