"use client";

import { FiLogOut } from 'react-icons/fi';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export const DashboardHeader = ({ userName, onLogout }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Admin <span className="text-blue-600">Dashboard</span></h1>
        <p className="text-gray-500 font-medium">Welcome back, {userName}</p>
      </div>
      <button 
        onClick={onLogout}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-red-600 font-bold hover:bg-red-50 transition-all shadow-sm active:scale-95"
      >
        <FiLogOut /> Logout
      </button>
    </div>
  );
};
