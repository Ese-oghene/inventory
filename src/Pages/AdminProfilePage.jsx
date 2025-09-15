import React, { useEffect, useState } from "react";
import api from "../api/api"; // ✅ use your custom axios

const AdminProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/profile").then((res) => {
      setForm({
        ...form,
        name: res.data.data.name,
        email: res.data.data.email,
      });
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/profile", form);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-[var(--color-white)] min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-[var(--color-primary-dark)]">
        My Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border border-[var(--color-primary)] rounded"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-[var(--color-primary)] rounded "
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full p-2 border border-[var(--color-primary)] rounded"
        />

        <input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full p-2 border border-[var(--color-primary)] rounded"
        />

        <button
          disabled={loading}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-[var(--color-white)] px-4 py-2 rounded shadow"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfilePage;

