import React from "react";

const ReportTable = ({ report }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-xl font-bold text-brown-700 mb-4">📊 CEO Report</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-brown-100 rounded-xl shadow text-center">
          <p className="text-sm text-brown-600">Total Revenue</p>
          <p className="text-lg font-bold text-brown-800">
            ₦{report.total_revenue.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-100 rounded-xl shadow text-center">
          <p className="text-sm text-green-600">Items Sold</p>
          <p className="text-lg font-bold text-green-800">
            {report.total_items_sold}
          </p>
        </div>
        <div className="p-4 bg-blue-100 rounded-xl shadow text-center">
          <p className="text-sm text-blue-600">Products</p>
          <p className="text-lg font-bold text-blue-800">
            {report.products.length}
          </p>
        </div>
        <div className="p-4 bg-purple-100 rounded-xl shadow text-center">
          <p className="text-sm text-purple-600">Period</p>
          <p className="text-lg font-bold text-purple-800">
            Sept 2025
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Sold</th>
              <th className="p-3 text-center">Remaining</th>
              <th className="p-3 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {report.products.map((p, i) => (
              <tr
                key={i}
                className="border-b hover:bg-brown-50 transition"
              >
                <td className="p-3 font-medium text-gray-700">{p.name}</td>
                <td className="p-3 text-center text-green-700 font-semibold">
                  {p.sold_quantity}
                </td>
                <td className="p-3 text-center text-red-600 font-semibold">
                  {p.remaining_stock}
                </td>
                <td className="p-3 text-right font-bold text-gray-800">
                  ₦{p.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;








