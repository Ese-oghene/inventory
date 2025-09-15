import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = () => {
    api.get("/users").then((res) => setUsers(res.data.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Management (Cashiers)</h1>

      <button
        onClick={() => navigate("/admin/users/new")}
        className="mb-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded"
      >
        + Add Cashier
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => navigate(`/admin/users/${u.id}/edit`)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
