"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import commonApi from '@/api';

export const useWriteArticle = () => {
  const { user, isLoading: authLoading } = useAuth();
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

  return {
    user,
    authLoading,
    categories,
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};
