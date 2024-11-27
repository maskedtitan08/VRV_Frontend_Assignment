import { useState, useCallback } from 'react';
import { INITIAL_USERS } from '../context/RBACContext';

export const useUsers = () => {
  const [users, setUsers] = useState(INITIAL_USERS);

  const addUser = useCallback((user) => {
    setUsers(prev => [...prev, { ...user, id: Date.now() }]);
  }, []);

  const updateUser = useCallback((id, updatedUser) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  }, []);

  const deleteUser = useCallback((id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
  };
};