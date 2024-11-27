import React from 'react';
import { useRBAC } from './RBACContext';
import { Users, ShieldCheck, Search } from 'lucide-react';
import StatCard from './StatCard';
import UserList from './UserList';
import RoleList from './RoleList';
import Header from './Header';

const DashboardLayout = () => {
  const { 
    users, 
    roles, 
    activeTab, 
    setActiveTab,
    searchTerm,
    setSearchTerm,
  } = useRBAC();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-700">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, roles, and permissions</p>
        </div>
        <Header/>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            title="Total Users" 
            value={users.length} 
            icon={<Users className="h-4 w-4 text-gray-500" />} 
          />
          <StatCard 
            title="Active Roles" 
            value={roles.length} 
            icon={<ShieldCheck className="h-4 w-4 text-gray-500" />} 
          />
          <StatCard 
            title="Total Permissions" 
            value={roles.reduce((acc, role) => acc + role.permissions.length, 0)} 
            icon={<ShieldCheck className="h-4 w-4 text-gray-500" />} 
          />
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
              <div className="flex space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'users' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('roles')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'roles' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Roles</span>
                </button>
              </div>

              {/* Search */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === 'users' ? <UserList /> : <RoleList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;