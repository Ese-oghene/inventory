import React, { useState, useEffect } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";

const AdminSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchSales = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/sales?per_page=5&page=${pageNumber}`);
      setSales(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(page);
  }, [page]);

  const handlePrev = () => {
    if (meta.current_page > 1) setPage(meta.current_page - 1);
  };

  const handleNext = () => {
    if (meta.current_page < meta.last_page) setPage(meta.current_page + 1);
  };

  const printReceipt = (sale) => {
    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(`<h2>Sale Receipt #${sale.id}</h2>`);
    receiptWindow.document.write(`<p>Cashier: ${sale.cashier}</p>`);
    receiptWindow.document.write(`<p>Date: ${sale.sale_date}</p>`);
    receiptWindow.document.write("<hr>");
    receiptWindow.document.write("<ul>");
    sale.items.forEach((item) => {
      receiptWindow.document.write(
        `<li>${item.product_name} x ${item.quantity} - ₦${item.subtotal}</li>`
      );
    });
    receiptWindow.document.write("</ul>");
    receiptWindow.document.write(`<h3>Total: ₦${sale.total_amount}</h3>`);
    receiptWindow.document.write("<hr>");
    receiptWindow.document.close();
    receiptWindow.print();
  };

  return (
    
    <div className="space-y-6">
        <h1 className="text-xl font-bold mb-4">All Sales</h1>

      {loading ? (
        <p>Loading...</p>
      ) : sales.length === 0 ? (
        <p>No sales available</p>
      ) : (
        <div className="">
          <table className="w-full border rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Cashier</th>
                <th className="px-4 py-2 border">Date</th>
                 <th className="px-4 py-2 border">Payment Method</th> {/* ✅ new */}
                <th className="px-4 py-2 border">Products Sold</th>
                <th className="px-4 py-2 border">Total Amount</th>
                {/* <th className="px-4 py-2 border">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{sale.id}</td>
                  <td className="px-4 py-2">{sale.cashier}</td>
                  <td className="px-4 py-2">{sale.sale_date}</td>
                   <td className="px-4 py-2 capitalize">{sale.payment_method}</td> {/* ✅ show method */}
                  <td className="px-4 py-2">
                    {sale.items.map((item) => (
                      <div key={item.product_id}>
                        {item.product_name} x {item.quantity} - ₦{item.subtotal}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2">₦{sale.total_amount}</td>
                  {/* <td className="px-4 py-2">
                    <button
                      onClick={() => printReceipt(sale)}
                      className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                      <Printer size={16} /> Print
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>


          {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={handlePrev}
            disabled={meta.current_page <= 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Prev
          </button>

          {/* Show current page / total pages */}
          <span className="px-3 py-1 font-medium">
            {meta.current_page} / {meta.last_page}
          </span>

          <button
            onClick={handleNext}
            disabled={meta.current_page >= meta.last_page}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>

        </div>
      )}
      </div>
    
    
  );
};

export default AdminSalesPage;

