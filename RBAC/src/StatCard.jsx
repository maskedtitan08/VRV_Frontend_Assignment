import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
      </div>
    </Card>
  );
};

export default StatCard;