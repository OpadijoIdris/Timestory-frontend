import { useEffect, useState } from "react";
import { getAdminUsers } from "../../../api/users.api";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-white shadow rounded p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 mb-4 rounded w-full md:w-1/3"
      />

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Verified</th>
              <th className="p-2 border">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                      N/A
                    </div>
                  )}
                </td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border capitalize">{user.role}</td>
                <td className="p-2 border">
                  {user.isVerified ? "Yes" : "No"}
                </td>
                <td className="p-2 border">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default AdminUsers;