import { useState } from 'react';

function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    website: user.website || '',
    street: user.address?.street || '',
    city: user.address?.city || '',
    company: user.company?.name || ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Name and email are required');
      return;
    }
    const updated = {
      id: form.id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      website: form.website,
      address: { street: form.street, city: form.city },
      company: { name: form.company }
    };
    onSave(updated);
  }
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-xl font-bold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="website" placeholder="Website" value={form.website} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="street" placeholder="Street" value={form.street} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full p-2 border rounded" />

          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;