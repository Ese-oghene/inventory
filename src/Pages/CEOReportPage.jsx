import React, { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import ReportTable from "../components/ReportTable";

const CEOReportPage = () => {
  const [report, setReport] = useState({
    total_revenue: 0,
    total_items_sold: 0,
    products: [],
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReport = async () => {
    if (!startDate || !endDate) return;
    try {
      const res = await api.get("/reports/ceo", {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setReport(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch report!");
    }
  };

  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

    setStartDate(firstDay);
    setEndDate(lastDay);

    api
      .get("/reports/ceo", {
        params: { start_date: firstDay, end_date: lastDay },
      })
      .then((res) => setReport(res.data.data));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4 print:hidden">CEO Report</h1>

      {/* Date Filter + Buttons (hidden on print) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 print:hidden">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brown-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-brown-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchReport}
            className="w-full bg-brown-700 hover:bg-brown-800 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            🔍 Filter
          </button>
        </div>
        <div className="flex items-end">
          <button
            onClick={handlePrint}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2 rounded-lg transition"
          >
            🖨 Print
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="print-area">
        <ReportTable report={report} />
      </div>
    </DashboardLayout>
  );
};

export default CEOReportPage;




// import React from 'react'
// import { useEffect, useState } from "react";
// import api from "../api/api";
// import DashboardLayout from "../components/DashboardLayout";
// import ReportTable from "../components/ReportTable";

// const CEOReportPage = () => {

//      const [report, setReport] = useState({
//     total_revenue: 0,
//     total_items_sold: 0,
//     products: [],
//   });

//   const fetchReport = async () => {
//     const res = await api.get("/reports/ceo", {
//       params: {
//         start_date: "2025-09-01",
//         end_date: "2025-09-30",
//       },
//     });
//     setReport(res.data.data);
//   };

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   return (
//     <DashboardLayout>
//       <h1 className="text-xl font-bold mb-4">CEO Report</h1>
//       <ReportTable report={report} />
//     </DashboardLayout>
//   )
// }

// export default CEOReportPage










