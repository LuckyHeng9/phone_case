import React from "react";
import Sidebar from "../components/dashbord/Sidebar";
import Header from "../components/dashbord/Header";

const ReportsPage = () => {
  const reportData = [
    { id: 1, reportName: "Monthly Sales", date: "2025-06-01", status: "Completed" },
    { id: 2, reportName: "Customer Growth", date: "2025-06-10", status: "In Progress" },
    { id: 3, reportName: "Revenue Breakdown", date: "2025-06-15", status: "Completed" },
  ];

  return (
    <div className="flex bg-[#F4F4F2]">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <main className="flex-grow p-8 bg-white rounded-tl-3xl shadow-inner">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-4xl font-semibold text-gray-800">Reports</h1>
            <p className="text-gray-600 mt-2">Overview of analytics and data insights</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Report Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Date</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((report) => (
                  <tr key={report.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">{report.reportName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
