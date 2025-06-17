import React from "react";
import Sidebar from "../components/dashbord/Sidebar";
import Header from "../components/dashbord/Header";

const SettingsPage = () => {
  return (
    <div className="flex bg-[#F4F4F2]">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <main className="flex-grow p-8 bg-white rounded-tl-3xl shadow-inner">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-4xl font-semibold text-gray-800">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your application preferences and profile</p>
          </div>

          <form className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                Enable email notifications
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
