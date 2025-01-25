import React from 'react';

const Popup = (
  {
    isOpen,
    onClose,
    children
  }
) => {

  if (!isOpen) return null; // Return null if popup is not open

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Popup</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mb-4">
          {children} {/* Render passed content */}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
