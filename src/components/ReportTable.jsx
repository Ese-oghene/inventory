import React from 'react'

const ReportTable = ({ report }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">CEO Report</h2>
      <p>Total Revenue: {report.total_revenue}₦</p>
      <p>Total Items Sold: {report.total_items_sold}</p>
      <table className="w-full mt-3 border">
        <thead>
          <tr className="bg-brown-700 text-white">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Sold</th>
            <th className="p-2 border">Remaining</th>
            <th className="p-2 border">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {report.products.map((p, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.sold_quantity}</td>
              <td className="p-2 border">{p.remaining_stock}</td>
              <td className="p-2 border">{p.revenue}₦</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
