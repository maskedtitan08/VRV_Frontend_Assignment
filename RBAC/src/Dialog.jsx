import React from 'react';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => onOpenChange(false)} />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;