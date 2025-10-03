import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsers, fetchUsersFromApi, updateUser } from '../store/usersSlice';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import EditUserModal from '../components/EditUserModal';
import { initialUsers } from '../data/localUsers';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);

  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const displayUsers = useMemo(() => {
    let list = [...users];
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'email') {
      list.sort((a, b) => a.email.localeCompare(b.email));
    }
    const term = searchValue.toLowerCase();
    return list.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [users, sortBy, searchValue]);

  function handleSearch(value) {
    setSearchValue(value);
  }

  function loadLocal() {
    dispatch(setUsers(initialUsers));
  }

  async function loadFromApi() {
    await dispatch(fetchUsersFromApi());
  }

  function handleSort(e) {
    setSortBy(e.target.value);
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

  function handleUpdate(updated) {
    console.log("Ndrysho:", updated);
    dispatch(updateUser(updated));
    setEditingUser(null);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <button
          onClick={loadLocal}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          Load Local Users
        </button>
        <button
          onClick={loadFromApi}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Load Users from API
        </button>
        <button
          onClick={() => navigate('/add')}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Add New User
        </button>
        <select
          value={sortBy}
          onChange={handleSort}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      <SearchBar onSearch={handleSearch} />

      <UserList users={displayUsers} onEdit={handleEdit} />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdate}
        />
      )}

      {status === 'loading' && (
        <p className="text-center text-blue-500 py-4 animate-pulse">
          Loading users from API...
        </p>
      )}
    </div>
  );
}

export default HomePage;
