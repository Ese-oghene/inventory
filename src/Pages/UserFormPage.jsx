import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const UserFormPage = () => {
  const { id } = useParams(); // if present → edit mode
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // fetch user for edit
      api.get(`/users`).then((res) => {
        const user = res.data.data.find((u) => u.id === parseInt(id));
        if (user) {
          setForm({ name: user.name, email: user.email, password: "", password_confirmation: "" });
        }
      });
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/users/${id}`, form);
        alert("Cashier updated successfully!");
      } else {
        await api.post("/users", form);
        alert("Cashier created successfully!");
      }
      navigate("/admin/users");
    } catch (err) {
      alert("Failed to save cashier");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{id ? "Edit Cashier" : "Add Cashier"}</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={id ? "New Password (optional)" : "Password"}
          className="w-full p-2 border rounded"
          {...(id ? {} : { required: true })}
        />
        <input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder={id ? "Confirm New Password (optional)" : "Confirm Password"}
          className="w-full p-2 border rounded"
          {...(id ? {} : { required: true })}
        />
        <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : id ? "Update Cashier" : "Add Cashier"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/users")}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserFormPage;
