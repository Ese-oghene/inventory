// import React, { useState } from "react";
// import api from "../api/api";

// const CashierSearch = ({ onAddToCart }) => {
//   const [sku, setSku] = useState("");
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState("1"); // keep as string

//   const searchProduct = async () => {
//     try {
//       const res = await api.get(`/products/${sku}`);
//       setProduct(res.data.data);
//     } catch {
//       alert("Product not found!");
//     }
//   };

//   const handleQuantityChange = (e) => {
//     const value = e.target.value;

//     // only allow digits
//     if (/^\d*$/.test(value)) {
//       setQuantity(value);
//     }
//   };

//   const incrementQuantity = () => {
//     const current = parseInt(quantity || "0", 10);
//     setQuantity(String(current + 1));
//   };

//   const decrementQuantity = () => {
//     const current = parseInt(quantity || "0", 10);
//     if (current > 1) {
//       setQuantity(String(current - 1));
//     }
//   };

//   const handleAddToCart = () => {
//     const qty = parseInt(quantity, 10) || 1; // convert safely
//     onAddToCart({ ...product, quantity: qty });
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//       {/* Header */}
//       <h2 className="text-xl font-semibold text-primary mb-4">
//         🔍 Search Product by code
//       </h2>

//       {/* Search Box */}
//       <div className="flex gap-3">
//         <input
//           type="text"
//           value={sku}
//           onChange={(e) => setSku(e.target.value)}
//           placeholder="Enter product code..."
//           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
//         />
//         <button
//           onClick={searchProduct}
//           className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2 rounded-lg transition"
//         >
//           Search
//         </button>
//       </div>

//       {/* Product Result */}
//       {product && (
//         <div className="mt-5 p-4 border rounded-xl bg-gray-50 shadow-sm">
//           <p className="text-lg font-bold text-gray-800">{product.name}</p>
//           <p className="text-gray-600 mb-3">Price: ₦{product.price}</p>

//           <div className="flex items-center gap-3">
//             {/* Decrement button */}
//             <button
//               onClick={decrementQuantity}
//               className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-3 py-1 rounded-lg"
//             >
//               −
//             </button>

//             {/* Quantity input */}
//             <input
//               type="text"
//               inputMode="numeric"
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="border rounded-lg px-3 py-1 w-20 text-center focus:ring-2 focus:ring-primary"
//             />

//             {/* Increment button */}
//             <button
//               onClick={incrementQuantity}
//               className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-3 py-1 rounded-lg"
//             >
//               +
//             </button>

//             {/* Add to Cart */}
//             <button
//               onClick={handleAddToCart}
//               className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg shadow transition"
//             >
//              Add to Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CashierSearch;





// import React, { useState, useEffect } from "react";
// import api from "../api/api";

// const CashierSearch = ({ onAddToCart }) => {
//   const [sku, setSku] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState("1");
//   const [loading, setLoading] = useState(false);

//   // 🔹 fetch suggestions as user types
//   useEffect(() => {
//     if (sku.length < 1) {
//       setSuggestions([]);
//       return;
//     }

//     const delayDebounce = setTimeout(async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/products/search/${sku}`);
//         setSuggestions(res.data.data || []);
//       } catch (err) {
//         setSuggestions([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 300); // debounce: wait 300ms

//     return () => clearTimeout(delayDebounce);
//   }, [sku]);

//   const handleQuantityChange = (e) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) setQuantity(value);
//   };

//   const incrementQuantity = () => {
//     const current = parseInt(quantity || "0", 10);
//     setQuantity(String(current + 1));
//   };

//   const decrementQuantity = () => {
//     const current = parseInt(quantity || "0", 10);
//     if (current > 1) setQuantity(String(current - 1));
//   };

//   const handleAddToCart = () => {
//     const qty = parseInt(quantity, 10) || 1;
//     onAddToCart({ ...product, quantity: qty });
//   };

//   const handleSelectProduct = (item) => {
//     setProduct(item);
//     setSku(item.sku); // fill input with chosen sku
//     setSuggestions([]); // hide dropdown
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//       {/* Header */}
//       <h2 className="text-xl font-semibold text-primary mb-4">
//         🔍 Search Product by code
//       </h2>

//       {/* Search Box */}
//       <div className="relative">
//         <input
//           type="text"
//           value={sku}
//           onChange={(e) => setSku(e.target.value)}
//           placeholder="Enter product code..."
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
//         />

//         {/* Suggestions Dropdown */}
//         {suggestions.length > 0 && (
//           <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-10">
//             {suggestions.map((item) => (
//               <li
//                 key={item.id}
//                 onClick={() => handleSelectProduct(item)}
//                 className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//               >
//                 {item.sku} - {item.name}
//               </li>
//             ))}
//           </ul>
//         )}

//         {loading && <p className="text-sm text-gray-400 mt-1">Loading...</p>}
//       </div>

//       {/* Product Result */}
//       {product && (
//         <div className="mt-5 p-4 border rounded-xl bg-gray-50 shadow-sm">
//           <p className="text-lg font-bold text-gray-800">{product.name}</p>
//           <p className="text-gray-600 mb-3">Price: ₦{product.price}</p>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={decrementQuantity}
//               className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-3 py-1 rounded-lg"
//             >
//               −
//             </button>

//             <input
//               type="text"
//               inputMode="numeric"
//               value={quantity}
//               onChange={handleQuantityChange}
//               className="border rounded-lg px-3 py-1 w-20 text-center focus:ring-2 focus:ring-primary"
//             />

//             <button
//               onClick={incrementQuantity}
//               className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-3 py-1 rounded-lg"
//             >
//               +
//             </button>

//             <button
//               onClick={handleAddToCart}
//               className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg shadow transition"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CashierSearch;





import React, { useState, useEffect } from "react";
import api from "../api/api";

const CashierSearch = ({ onAddToCart }) => {
  const [sku, setSku] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false); // 🔹 new flag

  // 🔹 fetch suggestions as user types
  useEffect(() => {
    if (isProductSelected) return; // ✅ stop searching if a product is already chosen

    if (sku.length < 1) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/search/${sku}`);
        setSuggestions(res.data.data || []);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [sku, isProductSelected]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setQuantity(value);
  };

  const incrementQuantity = () => {
    const current = parseInt(quantity || "0", 10);
    setQuantity(String(current + 1));
  };

  const decrementQuantity = () => {
    const current = parseInt(quantity || "0", 10);
    if (current > 1) setQuantity(String(current - 1));
  };

  const handleAddToCart = () => {
    const qty = parseInt(quantity, 10) || 1;
    onAddToCart({ ...product, quantity: qty });
  };

  const handleSelectProduct = (item) => {
    setProduct(item);
    setSku(item.sku);        // fill input with chosen sku
    setSuggestions([]);      // hide dropdown
    setIsProductSelected(true); // ✅ prevent further searching
  };

  const resetSearch = () => {
    setSku("");
    setProduct(null);
    setIsProductSelected(false); // ✅ allow searching again
    setQuantity("1");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-xl font-semibold text-primary mb-4">
        🔍 Search Product by code
      </h2>

      {/* Search Box */}
      <div className="relative">
        <input
          type="text"
          value={sku}
          onChange={(e) => {
            setSku(e.target.value);
            setIsProductSelected(false); // ✅ typing again resumes searching
          }}
          placeholder="Enter product code..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        />

        {/* Suggestions Dropdown */}
        {!isProductSelected && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-10">
            {suggestions.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectProduct(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item.sku} - {item.name}
              </li>
            ))}
          </ul>
        )}

        {loading && !isProductSelected && (
          <p className="text-sm text-gray-400 mt-1">Loading...</p>
        )}
      </div>

      {/* Product Result */}
      {product && (
        <div className="mt-5 p-4 border rounded-xl bg-gray-50 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-lg font-bold text-gray-800">{product.name}</p>
              <p className="text-gray-600">Price: ₦{product.price}</p>
            </div>
            {/* Reset button */}
            <button
              onClick={resetSearch}
              className="text-sm text-red-500 hover:underline"
            >
              ✖ Change
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={decrementQuantity}
              className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-3 py-1 rounded-lg"
            >
              −
            </button>

            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded-lg px-3 py-1 w-20 text-center focus:ring-2 focus:ring-primary"
            />

            <button
              onClick={incrementQuantity}
              className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-3 py-1 rounded-lg"
            >
              +
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg shadow transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierSearch;


