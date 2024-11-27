import React, { createContext, useContext, useState } from 'react';

const RBACContext = createContext();

export const INITIAL_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
];

export const INITIAL_ROLES = [
  { 
    id: 1, 
    name: 'Admin', 
    permissions: ['create_user', 'edit_user', 'delete_user', 'manage_roles'] 
  },
  { 
    id: 2, 
    name: 'Editor', 
    permissions: ['create_post', 'edit_post', 'delete_post'] 
  },
  { 
    id: 3, 
    name: 'Viewer', 
    permissions: ['view_post', 'view_user'] 
  },
];

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  const value = {
    users,
    setUsers,
    roles,
    setRoles,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
};