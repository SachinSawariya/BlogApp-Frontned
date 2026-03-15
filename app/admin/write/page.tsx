"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import commonApi from '@/api';
import { FiArrowLeft, FiImage, FiTag, FiType, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function WriteArticlePage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    coverImage: '',
    categoryId: '',
    authorName: '',
    authorAvatar: '',
    tags: '',
    readTime: 5,
    section: 'Regular'
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    }
    if (user) {
        setFormData(prev => ({ ...prev, authorName: user.name, authorAvatar: user.avatar || '' }));
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await commonApi({
          action: 'getCategoriesList'
        });
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        if (name === 'title' && !prev.slug) {
            newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        return newData;
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      coverImage: '',
      categoryId: '',
      authorName: user?.name || '',
      authorAvatar: user?.avatar || '',
      tags: '',
      readTime: 5,
      section: 'Regular'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await commonApi({
        action: 'createBlog',
        data: {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
          readTime: Number(formData.readTime)
        }
      });

      if (response.code === 'DEFAULT') {
        setStatus('success');
        resetForm();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Failed to create blog');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-10 lg:py-16">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 mb-8 transition-colors group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Write New <span className="text-blue-600">Article</span></h1>
          <p className="text-gray-500 font-medium mt-2">Create high-quality content for your developers community</p>
        </div>

        {status === 'success' && (
          <div className="fixed top-24 right-8 z-[100] animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-white border border-green-100 shadow-2xl shadow-green-200/50 rounded-3xl p-6 flex items-center gap-5 min-w-[320px]">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                <FiCheckCircle size={32} />
              </div>
              <div>
                <h4 className="text-gray-900 font-black text-lg">Success!</h4>
                <p className="text-gray-500 font-medium">Article has been published successfully.</p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold border border-red-100">
            <FiAlertCircle size={20} />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 ml-1">Article Title</label>
              <div className="relative">
                <FiType className="absolute left-4 top-4 text-gray-400" />
                <input
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a catchy title..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Slug (URL identifier)</label>
                <input
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="article-url-slug"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Category</label>
                <div className="relative">
                  <FiTag className="absolute left-4 top-4 text-gray-400" />
                  <select
                    name="categoryId"
                    required
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold appearance-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Cover Image URL</label>
                <div className="relative">
                  <FiImage className="absolute left-4 top-4 text-gray-400" />
                  <input
                    name="coverImage"
                    required
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Read Time (minutes)</label>
                <input
                  name="readTime"
                  type="number"
                  required
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 ml-1">Tags (comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="AI, React, WebDev..."
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 ml-1">Content (Markdown supported)</label>
              <textarea
                name="content"
                required
                rows={12}
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your article content here..."
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none min-h-[300px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || status === 'success'}
            className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95 ${
              status === 'success' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Publishing...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <FiCheckCircle size={24} />
                Published Successfully!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Publish Article
                <FiSend />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
