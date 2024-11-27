import React from 'react';

const Select = ({ className = '', children, ...props }) => {
  return (
    <select
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;