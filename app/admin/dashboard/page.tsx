"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { FiEdit, FiPlusCircle, FiUser, FiLogOut, FiLayout } from 'react-icons/fi';

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin <span className="text-blue-600">Dashboard</span></h1>
            <p className="text-gray-500 font-medium">Welcome back, {user.name}</p>
          </div>
          <button 
            onClick={() => { logout(); router.push('/admin/login'); }}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-red-600 font-bold hover:bg-red-50 transition-all shadow-sm active:scale-95"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            <Link href="/admin/write" className="group p-8 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiPlusCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Write Article</h3>
              <p className="text-blue-100 font-medium">Create and publish a new blog post to the site.</p>
            </Link>

            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 hover:border-blue-100 transition-all">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <FiLayout size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Manage Blogs</h3>
              <p className="text-gray-500 font-medium">View, edit, or delete existing articles (Coming soon).</p>
            </div>
          </div>

          {/* Profile Card */}
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
        </div>
      </div>
    </div>
  );
}
