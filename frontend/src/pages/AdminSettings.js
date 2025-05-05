import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSettings() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    password: '',
    is_admin: false,
    ldap_enabled: false,
    ldap_server_ip: '',
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingUserId) {
        await axios.put(`/api/users/${editingUserId}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('/api/users', form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      setForm({
        username: '',
        password: '',
        is_admin: false,
        ldap_enabled: false,
        ldap_server_ip: '',
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      password: '',
      is_admin: user.is_admin,
      ldap_enabled: user.ldap_enabled,
      ldap_server_ip: user.ldap_server_ip || '',
    });
    setEditingUserId(user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User and LDAP Settings</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Password {editingUserId ? '(leave blank to keep unchanged)' : ''}</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            {...(!editingUserId && { required: true })}
          />
        </div>
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            name="is_admin"
            checked={form.is_admin}
            onChange={handleChange}
            id="is_admin"
            className="mr-2"
          />
          <label htmlFor="is_admin" className="font-semibold">Is Admin</label>
        </div>
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            name="ldap_enabled"
            checked={form.ldap_enabled}
            onChange={handleChange}
            id="ldap_enabled"
            className="mr-2"
          />
          <label htmlFor="ldap_enabled" className="font-semibold">LDAP Enabled</label>
        </div>
        {form.ldap_enabled && (
          <div className="mb-2">
            <label className="block font-semibold mb-1">LDAP Server IP</label>
            <input
              type="text"
              name="ldap_server_ip"
              value={form.ldap_server_ip}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required={form.ldap_enabled}
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
        {editingUserId && (
          <button
            type="button"
            onClick={() => {
              setForm({
                username: '',
                password: '',
                is_admin: false,
                ldap_enabled: false,
                ldap_server_ip: '',
              });
              setEditingUserId(null);
              setError('');
            }}
            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>

      <h3 className="text-xl font-semibold mb-2">Users</h3>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-1 text-left">Username</th>
            <th className="border border-gray-300 px-3 py-1 text-left">Is Admin</th>
            <th className="border border-gray-300 px-3 py-1 text-left">LDAP Enabled</th>
            <th className="border border-gray-300 px-3 py-1 text-left">LDAP Server IP</th>
            <th className="border border-gray-300 px-3 py-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-1">{user.username}</td>
              <td className="border border-gray-300 px-3 py-1">{user.is_admin ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 px-3 py-1">{user.ldap_enabled ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 px-3 py-1">{user.ldap_server_ip || '-'}</td>
              <td className="border border-gray-300 px-3 py-1">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSettings;
