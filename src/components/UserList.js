import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/usersSlice';

function UserList({ users, onEdit }) {
  const dispatch = useDispatch();
  if (!users.length) return <p className="text-center text-gray-500 py-8">No users available.</p>;

  function handleDelete(id) {
    if (window.confirm('Delete this user?')) {
      dispatch(deleteUser(id));
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td data-label="Name" className="px-6 py-4 whitespace-nowrap">
                <Link to={`/user/${u.id}`} className="text-blue-600 hover:text-blue-900 font-medium">
                  {u.name}
                </Link>
              </td>
              <td data-label="Email" className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {u.email}
              </td>
              <td data-label="Company" className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {u.company?.name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button 
                  onClick={() => onEdit(u)} 
                  className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(u.id)} 
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
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
}

export default UserList;