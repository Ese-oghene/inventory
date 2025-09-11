import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Printer } from "lucide-react";

const CashierHistory = () => {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch sales from backend with per_page=5
  const fetchSales = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/sales?page=${pageNumber}&per_page=5`);
      setSales(res.data.data);
      setLastPage(res.data.meta.last_page);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch sales!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(page);
  }, [page]);

  // Print a sale receipt
  const handlePrint = (sale) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<h2>Sales Receipt</h2>`);
    printWindow.document.write(`<p><strong>Sale ID:</strong> ${sale.id}</p>`);
    printWindow.document.write(`<p><strong>Cashier:</strong> ${sale.cashier}</p>`);
    printWindow.document.write(`<p><strong>Date:</strong> ${new Date(sale.sale_date).toLocaleString()}</p>`);
    printWindow.document.write(`<p><strong>Total:</strong> ₦${sale.total_amount}</p>`);

    if (sale.items && sale.items.length > 0) {
      printWindow.document.write("<h3>Items:</h3><ul>");
      sale.items.forEach((item) => {
        printWindow.document.write(
          `<li>${item.product_name} x ${item.quantity} @ ₦${item.unit_price} = ₦${item.subtotal}</li>`
        );
      });
      printWindow.document.write("</ul>");
    }

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sales History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
           <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Cashier</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{sale.id}</td>
                <td className="px-4 py-2">{sale.cashier}</td>
                <td className="px-4 py-2">{new Date(sale.sale_date).toLocaleString()}</td>
                <td className="px-4 py-2 capitalize">{sale.payment_method}</td> {/* ✅ show method */}
                <td className="px-4 py-2">₦{sale.total_amount}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handlePrint(sale)}
                    className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark transition"
                  >
                    <Printer size={16} /> Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{page}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={page === lastPage}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CashierHistory;
