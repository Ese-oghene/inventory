// import React from 'react'

// const CashierCart = ({ cart, onCheckout }) => {

//     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//      <div className="bg-white p-4 shadow rounded mt-4">
//       <h2 className="font-bold mb-2">Cart</h2>
//       {cart.length === 0 ? <p>No items in cart.</p> : (
//         <ul>
//           {cart.map((item, i) => (
//             <li key={i} className="flex justify-between">
//               <span>{item.name} (x{item.quantity})</span>
//               <span>{item.price * item.quantity}₦</span>
//             </li>
//           ))}
//         </ul>
//       )}
//       <p className="mt-2 font-bold">Total: {total}₦</p>
//       <button
//          onClick={() => onCheckout(cart)}
//         className="mt-2 bg-brown-700 text-black px-3 py-1 rounded"
//       >
//         Checkout
//       </button>
//     </div>
//   )
// }

// export default CashierCart




import React from "react";

const CashierCart = ({ cart, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl mt-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-primary mb-4">🛒 Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between py-2">
              <span className="text-gray-800">
                {item.name} <span className="text-gray-500">(x{item.quantity})</span>
              </span>
              <span className="font-medium text-gray-700">
                ₦{item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-lg font-bold text-gray-800">
        Total: <span className="text-primary">₦{total}</span>
      </p>

      <button
        onClick={() => onCheckout(cart)}
        className="mt-4 w-full bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg shadow transition"
      >
        ✅ Checkout
      </button>
    </div>
  );
};

export default CashierCart;
