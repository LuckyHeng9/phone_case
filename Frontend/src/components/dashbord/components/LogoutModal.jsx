import React from "react";
import { IoCloseOutline } from "react-icons/io5";
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="z-50 flex items-center flex-col dark:bg-gray-800 p-6 rounded-lg shadow-md w-[25rem]">
        <button
          className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          <IoCloseOutline className="text-3xl hover:text-gray-400" />
        </button>
        <h2 className="text-lg font-bold mb-4 text-gray-500 dark:text-gray-300">
          Confirm Logout
        </h2>
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-8">
          <button
            onClick={onClose}
            className="py-2 px-6 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
