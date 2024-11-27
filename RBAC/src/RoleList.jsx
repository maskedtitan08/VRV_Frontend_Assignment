import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useRBAC } from './RBACContext';
import RoleModal from './RoleModal';
import RolePermissions from './RolePermissions';

const RoleList = () => {
  const { roles, setRoles, searchTerm } = useRBAC();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPermissions, setShowPermissions] = useState(null);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setSelectedRole(null);
            setShowModal(true);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                <p className="text-sm text-gray-500">
                  {role.permissions.length} permissions
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowModal(true);
                  }}
                  className="p-1 text-blue-600 hover:text-blue-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="p-1 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {role.permissions.slice(0, 3).map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {permission}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <button
                    onClick={() => setShowPermissions(role)}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                  >
                    +{role.permissions.length - 3} more
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RoleModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
      />

      <RolePermissions
        isOpen={!!showPermissions}
        onClose={() => setShowPermissions(null)}
        role={showPermissions}
      />
    </div>
  );
};

export default RoleList;