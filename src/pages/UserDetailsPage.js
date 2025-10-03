import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function UserDetailsPage() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.list);
  const localUser = users.find((u) => String(u.id) === id) || null;
  const [user, setUser] = useState(localUser);

  async function loadUser() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    setUser(data);
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <Link to="/" className="inline-block mb-4 text-blue-600 hover:text-blue-900 font-medium">⬅ Back</Link>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Details</h2>

      {user ? (
        <div className="space-y-3">
          <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
          {user.phone && <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phone}</p>}
          {user.website && <p className="text-gray-700"><span className="font-semibold">Website:</span> {user.website}</p>}
          {user.address && (
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span> {user.address.street}, {user.address.city}
            </p>
          )}
          {user.company && <p className="text-gray-700"><span className="font-semibold">Company:</span> {user.company.name}</p>}
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-500">User not found locally.</p>
          <button 
            onClick={loadUser} 
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Load from API
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDetailsPage;