"use client";

import Header from "../components/Header/Header";


export default function Dashboard() {
  const stats = [
    { label: "Total Reports", value: 3 },
    { label: "Resolved", value: 1 },
    { label: "Pending", value: 1 },
    { label: "In Review", value: 1 },
  ];

  const reports = [
    {
      id: 1,
      title: "Login button unresponsive on Amazon",
      status: "Pending",
      app: "Amazon",
      date: "2025-07-18",
    },
    {
      id: 2,
      title: "Checkout crashes in Flipkart",
      status: "Resolved",
      app: "Flipkart",
      date: "2025-07-16",
    },
    {
      id: 3,
      title: "Video buffering in Netflix",
      status: "In Review",
      app: "Netflix",
      date: "2025-07-14",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-neutral-800 text-white px-4 md:px-10 pt-6 pb-10">
      {/* Reusable Header */}
      <Header />
      <div className="pt-5">
      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-zinc-800 p-4 rounded-lg shadow border border-zinc-700 text-center"
          >
            <h2 className="text-2xl font-bold text-yellow-400">{stat.value}</h2>
            <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Recent Reports */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">📝 Recent Reports</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-sm hover:bg-zinc-800 transition"
            >
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                Status:{" "}
                <span className="text-yellow-400">{report.status}</span> • App:{" "}
                <span className="text-blue-400">{report.app}</span> • Date:{" "}
                {report.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-200">
          ➕ Create New Report
        </button>
      </div>
      </div>
    </div>
  );
}
