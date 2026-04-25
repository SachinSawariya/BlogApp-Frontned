"use client";

import { FiType, FiTag, FiImage, FiCheckCircle, FiAlertCircle, FiSend } from 'react-icons/fi';
import { useWriteArticle } from './hooks/useWriteArticle';
import LexicalEditor from '@/shared/Editor/LexicalEditor';

export const WriteArticleForm = () => {
  const {
    categories,
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useWriteArticle();

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
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
          <label className="text-sm font-bold text-gray-900 ml-1">Content (Rich Text Editor)</label>
          <LexicalEditor 
            value={formData.content} 
            onChange={(val) => {
              handleChange({ target: { name: 'content', value: val } } as unknown as React.ChangeEvent<HTMLInputElement>);
            }} 
            placeholder="Write your article content here..."
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
  );
};
