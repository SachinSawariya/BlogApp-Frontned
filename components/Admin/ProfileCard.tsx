"use client";

import { FiUser } from 'react-icons/fi';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-100/50 h-fit">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 mb-4 border-4 border-white shadow-lg overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <FiUser size={40} />
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
        <p className="text-gray-400 font-medium mb-6">{user.email}</p>
        
        <div className="w-full pt-6 border-t border-gray-50 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-bold uppercase tracking-wider">Role</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold">{user.role}</span>
          </div>
          
          <button 
            className="w-full py-3 bg-gray-50 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
            onClick={() => alert('Profile editing coming soon! For now, manage your content.')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
