import React from "react";

const CashierCart = ({
  cart,
  onCheckout,
  paymentMethod,
  setPaymentMethod,
  onRemoveItem,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl mt-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-primary mb-4">🛒 Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between items-center py-2">
              <div>
                <span className="text-gray-800">
                  {item.name} <span className="text-gray-500">(x{item.quantity})</span>
                </span>
                <span className="ml-3 font-medium text-gray-700">
                  ₦{item.price * item.quantity}
                </span>
              </div>
              <div className="flex space-x-2">
              
                <button
                  onClick={() => onRemoveItem(i)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-lg font-bold text-gray-800">
        Total: <span className="text-primary">₦{total}</span>
      </p>

      {/* Payment Method */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="cash">💵 Cash</option>
          <option value="transfer">🏦 Bank Transfer</option>
          <option value="card">💳 ATM Card</option>
        </select>
      </div>

      <button
        onClick={() => onCheckout(cart)}
        // disabled={cart.length === 0}
        className="mt-4 w-full bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg shadow transition disabled:opacity-50"
      >
        ✅ Checkout
      </button>
    </div>
  );
};

export default CashierCart;
