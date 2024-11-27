import React, { useState, useEffect } from 'react';
import { useRBAC } from './RBACContext';
import  Dialog  from './Dialog';
import { PERMISSIONS } from './permissions';

const RoleModal = ({ isOpen, onClose, role }) => {
  const { roles, setRoles } = useRBAC();
  const [formData, setFormData] = useState({
    name: '',
    permissions: []
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData({
        name: '',
        permissions: []
      });
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role) {
      setRoles(roles.map(r => 
        r.id === role.id ? { ...formData, id: role.id } : r
      ));
    } else {
      setRoles([...roles, { ...formData, id: Date.now() }]);
    }
    onClose();
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          {role ? 'Edit Role' : 'Add New Role'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Permissions</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded">
              {PERMISSIONS.map((permission) => (
                <label key={permission.value} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.value)}
                    onChange={() => togglePermission(permission.value)}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-medium">{permission.label}</p>
                    <p className="text-xs text-gray-500">{permission.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {role ? 'Update' : 'Add'} Role
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default RoleModal;