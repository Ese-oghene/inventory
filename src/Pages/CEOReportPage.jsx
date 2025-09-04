import React from 'react'
import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import ReportTable from "../components/ReportTable";

const CEOReportPage = () => {

     const [report, setReport] = useState({
    total_revenue: 0,
    total_items_sold: 0,
    products: [],
  });

  const fetchReport = async () => {
    const res = await api.get("/reports/ceo", {
      params: {
        start_date: "2025-09-01",
        end_date: "2025-09-30",
      },
    });
    setReport(res.data.data);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">CEO Report</h1>
      <ReportTable report={report} />
    </DashboardLayout>
  )
}

export default CEOReportPage
