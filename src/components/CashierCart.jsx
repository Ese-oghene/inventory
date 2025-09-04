import React from 'react'

const CashierCart = ({ cart, onCheckout }) => {

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
     <div className="bg-white p-4 shadow rounded mt-4">
      <h2 className="font-bold mb-2">Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : (
        <ul>
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>{item.price * item.quantity}₦</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 font-bold">Total: {total}₦</p>
      <button
         onClick={() => onCheckout(cart)}
        className="mt-2 bg-brown-700 text-black px-3 py-1 rounded"
      >
        Checkout
      </button>
    </div>
  )
}

export default CashierCart
