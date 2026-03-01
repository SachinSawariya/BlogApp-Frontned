const baseUrl = 'api/v1';

export const apiList = {
  // Auth
  // login: {
  //   url: () => `/${baseUrl}/auth/login`,
  //   method: 'POST'
  // },
  // register: {
  //   url: () => `/${baseUrl}/auth/register`,
  //   method: 'POST'
  // },
  // getProfile: {
  //   url: () => `/${baseUrl}/auth/me`,
  //   method: 'GET'
  // },

  // Articles
  getArticleSections: {
    url: () => `/${baseUrl}/blogs/get-sections`,
    method: 'GET'
  },
  getFeaturedArticles: {
    url: () => `/${baseUrl}/blogs/featured-articles`,
    method: 'GET'
  },
  getBlogPost: {
    url: (slug) => `/${baseUrl}/blogs/article/${slug}`,
    method: 'GET'
  },
  getCategoryArticles: {
    url: (slug, page = 1, limit = 12) => `/${baseUrl}/blogs/articles/${slug}?page=${page}&limit=${limit}`,
    method: 'GET'
  },
  // createArticle: {
  //   url: () => `/${baseUrl}/articles`,
  //   method: 'POST'
  // },
  // updateArticle: {
  //   url: (id) => `/${baseUrl}/articles/${id}`,
  //   method: 'PUT'
  // },
  // deleteArticle: {
  //   url: (id) => `/${baseUrl}/articles/${id}`,
  //   method: 'DELETE'
  // },

  // Categories
  getCategoriesList: {
    url: () => `/${baseUrl}/categories/list`,
    method: 'GET'
  },
  getTopCategories: {
    url: () => `/${baseUrl}/categories/top-categories`,
    method: 'GET'
  },
  // getCategory: {
  //   url: (id) => `/${baseUrl}/categories/${id}`,
  //   method: 'GET'
  // },
  // createCategory: {
  //   url: () => `/${baseUrl}/categories`,
  //   method: 'POST'
  // },
  // updateCategory: {
  //   url: (id) => `/${baseUrl}/categories/${id}`,
  //   method: 'PUT'
  // },
  // deleteCategory: {
  //   url: (id) => `/${baseUrl}/categories/${id}`,
  //   method: 'DELETE'
  // },

  // Comments
  // getComments: {
  //   url: (articleId) => `/${baseUrl}/articles/${articleId}/comments`,
  //   method: 'GET'
  // },
  // addComment: {
  //   url: (articleId) => `/${baseUrl}/articles/${articleId}/comments`,
  //   method: 'POST'
  // },
  // deleteComment: {
  //   url: (commentId) => `/${baseUrl}/comments/${commentId}`,
  //   method: 'DELETE'
  // }
};

export default apiList;
