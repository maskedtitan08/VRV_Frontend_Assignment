import React, { useState, useEffect } from 'react';
import { useRBAC } from './RBACContext';
import Dialog from "./Dialog";

const UserModal = ({ isOpen, onClose, user }) => {
    const { users, setUsers, roles } = useRBAC();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Viewer',
        status: 'Active'
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                name: '',
                email: '',
                role: 'Viewer',
                status: 'Active'
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            setUsers(users.map(u =>
                u.id === user.id ? { ...formData, id: user.id } : u
            ));
        } else {
            setUsers([...users, { ...formData, id: Date.now() }]);
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                    {user ? 'Edit User' : 'Add New User'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {user ? 'Save Changes' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default UserModal;