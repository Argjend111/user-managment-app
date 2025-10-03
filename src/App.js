import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDetailsPage from './pages/UserDetailsPage';
import AddUserPage from './pages/AddUserPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">User Management App</h1>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetailsPage />} />
        <Route path="/add" element={<AddUserPage />} />
      </Routes>
    </div>
  );
}

export default App;