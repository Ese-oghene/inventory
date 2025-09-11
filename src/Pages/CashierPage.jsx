import React, { useState } from "react";
import CashierSearch from "../components/CashierSearch";
import CashierCart from "../components/CashierCart";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";

const CashierPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receiptModal, setReceiptModal] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
  };

  const checkout = async () => {
    try {
      const res = await api.post("/sales", {
        items: cart.map((item) => ({
          sku: item.sku,
          quantity: item.quantity,
        })),
        payment_method: paymentMethod,
      });

      const sale = res.data.data; // ✅ backend returns sale details
      setCart([]);
      setLastSale(sale);
      setReceiptModal(true); // ✅ open modal
    } catch (err) {
      console.error(err);
      alert("Failed to record sale.");
    }
  };


  const printReceipt = (sale) => {
  const receiptWindow = window.open("", "_blank");
  if (!receiptWindow) return;

  const receiptHTML = `
    <html>
      <head>
        <title>Receipt #${sale.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            padding: 10px;
          }
          .header {
            text-align: center;
            border-bottom: 1px dashed #000;
            margin-bottom: 10px;
            padding-bottom: 6px;
          }
          .header h2 {
            margin: 0;
            font-size: 18px;
          }
          .header p {
            margin: 2px 0;
            font-size: 12px;
          }
          .info p {
            margin: 3px 0;
            font-size: 13px;
          }
          .items {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 6px 0;
            margin: 12px 0;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin: 4px 0;
            font-size: 13px;
          }
          .total {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 15px;
            border-top: 1px solid #000;
            padding-top: 6px;
            margin-top: 12px;
          }
          .footer {
            text-align: center;
            border-top: 1px dashed #000;
            margin-top: 12px;
            padding-top: 6px;
            font-style: italic;
            font-size: 12px;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h2>🛍 KIMVIA LUXURIES</h2>
          <p>123 Market Street, City</p>
          <p>Tel: +234-000-111-222</p>
        </div>

        <!-- Sale Info -->
        <div class="info">
          <p><strong>Receipt:</strong> #${sale.id}</p>
          <p><strong>Date:</strong> ${new Date(sale.sale_date).toLocaleString()}</p>
          <p><strong>Cashier:</strong> ${sale.cashier}</p>
          <p><strong>Payment:</strong> ${sale.payment_method}</p>
        </div>

        <!-- Items -->
        <div class="items">
          ${sale.items
            .map(
              (item) => `
              <div class="item">
                <span>${item.product_name} x${item.quantity}</span>
                <span>₦${item.subtotal}</span>
              </div>
            `
            )
            .join("")}
        </div>

        <!-- Total -->
        <div class="total">
          <span>Total</span>
          <span>₦${sale.total_amount}</span>
        </div>

        <!-- Footer -->
        <div class="footer">
          ✨ Thank you for shopping with us! ✨
        </div>
      </body>
    </html>
  `;

  receiptWindow.document.documentElement.innerHTML = receiptHTML;
  // receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
  receiptWindow.focus();
  receiptWindow.print();
};


//   const printReceipt = (sale) => {
//   const receiptWindow = window.open("", "_blank");
//   if (!receiptWindow) return;

//   const receiptHTML = `
//     <html>
//       <head>
//         <title>Receipt #${sale.id}</title>
//         <style>
//           body {
//             font-family: monospace, Arial, sans-serif;
//             font-size: 12px;
//             color: #000;
//             width: 80mm;
//             margin: 0 auto;
//             padding: 5px;
//           }
//           .header {
//             text-align: center;
//             border-bottom: 1px dashed #000;
//             margin-bottom: 8px;
//             padding-bottom: 4px;
//           }
//           .header h2 {
//             margin: 0;
//             font-size: 14px;
//           }
//           .header p {
//             margin: 2px 0;
//             font-size: 11px;
//           }
//           .info p {
//             margin: 2px 0;
//           }
//           .items {
//             border-top: 1px dashed #000;
//             border-bottom: 1px dashed #000;
//             padding: 5px 0;
//             margin: 8px 0;
//           }
//           .item {
//             display: flex;
//             justify-content: space-between;
//             margin: 2px 0;
//           }
//           .total {
//             display: flex;
//             justify-content: space-between;
//             font-weight: bold;
//             font-size: 13px;
//             border-top: 1px solid #000;
//             padding-top: 5px;
//             margin-top: 8px;
//           }
//           .footer {
//             text-align: center;
//             border-top: 1px dashed #000;
//             margin-top: 8px;
//             padding-top: 4px;
//             font-style: italic;
//             font-size: 11px;
//           }
//           @media print {
//             @page {
//               size: 80mm auto; 
//               margin: 0;
//             }
//             body {
//               margin: 0;
//               padding: 0;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <!-- Header -->
//         <div class="header">
//           <h2>🛍 My Store</h2>
//           <p>123 Market Street, City</p>
//           <p>Tel: +234-000-111-222</p>
//         </div>

//         <!-- Sale Info -->
//         <div class="info">
//           <p><strong>Receipt:</strong> #${sale.id}</p>
//           <p><strong>Date:</strong> ${new Date(sale.sale_date).toLocaleString()}</p>
//           <p><strong>Cashier:</strong> ${sale.cashier}</p>
//           <p><strong>Payment:</strong> ${sale.payment_method}</p>
//         </div>

//         <!-- Items -->
//         <div class="items">
//           ${sale.items
//             .map(
//               (item) => `
//               <div class="item">
//                 <span>${item.product_name} x${item.quantity}</span>
//                 <span>₦${item.subtotal}</span>
//               </div>
//             `
//             )
//             .join("")}
//         </div>

//         <!-- Total -->
//         <div class="total">
//           <span>Total</span>
//           <span>₦${sale.total_amount}</span>
//         </div>

//         <!-- Footer -->
//         <div class="footer">
//           ✨ Thank you for shopping with us! ✨
//         </div>
//       </body>
//     </html>
//   `;

//   // receiptWindow.document.write(receiptHTML);
//   receiptWindow.document.documentElement.innerHTML = receiptHTML;
//   // receiptWindow.document.close();
//   receiptWindow.focus();
//   receiptWindow.print();
// };



  // const printReceipt = (sale) => {
  //   const receiptWindow = window.open("", "_blank");
  //   if (!receiptWindow) return;

  //   const receiptHTML = `
  //     <head>
  //       <title>Receipt #${sale.id}</title>
  //       <style>
  //         body { font-family: Arial, sans-serif; padding: 10px; }
  //         h2, h3 { margin: 0; }
  //         ul { list-style: none; padding: 0; }
  //         li { margin: 4px 0; }
  //         .total { font-size: 18px; font-weight: bold; margin-top: 10px; }
  //       </style>
  //     </head>
  //     <body>
  //       <h2>Sale Receipt #${sale.id}</h2>
  //       <p><strong>Cashier:</strong> ${sale.cashier}</p>
  //       <p><strong>Date:</strong> ${sale.sale_date}</p>
  //       <p><strong>Payment:</strong> ${sale.payment_method}</p>
  //       <hr/>
  //       <ul>
  //         ${sale.items
  //           .map(
  //             (item) =>
  //               `<li>${item.product_name} x ${item.quantity} - ₦${item.subtotal}</li>`
  //           )
  //           .join("")}
  //       </ul>
  //       <p class="total">Total: ₦${sale.total_amount}</p>
  //       <hr/>
  //     </body>
  //   `;

  //   // ✅ Use innerHTML (no deprecated API)
  //   receiptWindow.document.documentElement.innerHTML = receiptHTML;

  //   receiptWindow.focus();
  //   receiptWindow.print();
  // };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Cashier</h1>

      <CashierSearch onAddToCart={addToCart} />

      <CashierCart
        cart={cart}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onCheckout={checkout}
      />

      {/* ✅ Receipt Modal */}
      {receiptModal && lastSale && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-2">
              Sale recorded successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Do you want to print the receipt for Sale #{lastSale.id}?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReceiptModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  printReceipt(lastSale);
                  setReceiptModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CashierPage;


