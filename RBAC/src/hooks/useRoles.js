import { useState, useCallback } from 'react';
import { INITIAL_ROLES } from '../context/RBACContext';

export const useRoles = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);

  const addRole = useCallback((role) => {
    setRoles(prev => [...prev, { ...role, id: Date.now() }]);
  }, []);

  const updateRole = useCallback((id, updatedRole) => {
    setRoles(prev => prev.map(role => 
      role.id === id ? { ...role, ...updatedRole } : role
    ));
  }, []);

  const deleteRole = useCallback((id) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  }, []);

  return {
    roles,
    addRole,
    updateRole,
    deleteRole,
  };
};