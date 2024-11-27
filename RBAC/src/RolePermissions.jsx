import React from 'react';
import  Dialog  from './Dialog';
import { PERMISSIONS } from './permissions';

const RolePermissions = ({ isOpen, onClose, role }) => {
  if (!role) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">{role.name} Permissions</h2>
        <div className="space-y-4">
          {role.permissions.map((permission) => {
            const permissionDetails = PERMISSIONS.find(p => p.value === permission);
            return (
              <div key={permission} className="p-3 bg-gray-50 rounded">
                <h3 className="font-medium text-gray-900">{permissionDetails?.label || permission}</h3>
                <p className="text-sm text-gray-500">{permissionDetails?.description || 'No description available'}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default RolePermissions;