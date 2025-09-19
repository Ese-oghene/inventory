import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // backend expects id for update

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    sku: "",
    description: "",
    price: "",
    stock_qty: "",
    color: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  // Load product if editing
  useEffect(() => {
    if (id) {
      api
        .get(`/products/${id}`) // ✅ Backend "show" uses SKU, so make sure you pass sku in route params
        .then((res) => {
          const p = res.data.data;
          setFormData({
            category_id: p.category_id || "",
            name: p.name,
            sku: p.sku,
            description: p.description || "",
            price: p.price,
            stock_qty: p.stock_qty,
            color: p.color || "",
            image: null, // don’t preload file
          });
          setImagePreview(p.image_url || null);
        })
        .catch((err) => {
          console.error("Failed to fetch product", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      if (id) {
        // ✅ Update expects product id
        await api.post(`/products/${id}?_method=PUT`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product updated successfully!");
      } else {
        await api.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product created successfully!");
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await api.post("/categories", { name: newCategory });
      setCategories((prev) => [...prev, res.data.data]);
      setFormData((prev) => ({
        ...prev,
        category_id: res.data.data.id,
      }));
      setNewCategory("");
      setShowCategoryModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add category");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-6">
        {id ? "✏️ Update Product" : "➕ Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-2xl"
      >
        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <div className="flex gap-2">
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="flex-1 border px-3 py-2 rounded"
            >
              <option value="">-- Select --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowCategoryModal(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              ➕
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
           // disabled={!!id} // SKU locked when updating
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock Qty</label>
            <input
              type="number"
              name="stock_qty"
              value={formData.stock_qty}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-24 rounded border object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </button>
      </form>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-3">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Category name"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminProductForm;

