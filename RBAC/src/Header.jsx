import React from 'react';
import { useRBAC } from './RBACContext';

const Header = () => {
  const { activeTab } = useRBAC();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {activeTab === 'users' ? 'User Management' : 'Role Management'}
      </h1>
      <p className="text-gray-600">
        {activeTab === 'users' 
          ? 'Manage user accounts and their roles' 
          : 'Configure roles and their permissions'}
      </p>
    </div>
  );
};

export default Header;