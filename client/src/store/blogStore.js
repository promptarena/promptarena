// // src/store/blogStore.js
// import { create } from 'zustand';
// import axiosInstance from '../services/axiosInstance';
// import { handleError } from '../utils/errorHandler';
// import { handleResponse } from '../utils/responseHandler';
// import toast from 'react-hot-toast';

// export const useBlogStore = create((set, get) => ({
//   blogPosts: [],
//   isLoading: false,
//   error: null,

//   // Fetch all blog posts
//   fetchBlogPosts: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axiosInstance.get('/blog/all');
//       handleResponse(response, (data) => set({ blogPosts: data, isLoading: false }));
//     } catch (error) {
//       handleError(error, (message) => set({ error: message, isLoading: false }));
//     }
//   },

//   // Create a new blog post
//   createBlogPost: async (blogData) => {
//     set({ isLoading: true, error: null });
//     try {
//       const formData = new FormData();
//       formData.append('title', blogData.title);
//       formData.append('content', blogData.content);

//       // Append images and videos to FormData if present
//       if (blogData.images) {
//         blogData.images.forEach((image) => formData.append('images', image));
//       }
//       if (blogData.videos) {
//         blogData.videos.forEach((video) => formData.append('videos', video));
//       }

//       const response = await axiosInstance.post('/blog/create', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       handleResponse(response, (newBlog) => {
//         set((state) => ({
//           blogPosts: [newBlog, ...state.blogPosts],
//           isLoading: false,
//         }));
//         toast.success('Blog post created successfully!');
//       });
//     } catch (error) {
//       handleError(error, (message) => set({ error: message, isLoading: false }));
//     }
//   },

//   // Update an existing blog post
//   updateBlogPost: async (blogId, updatedData) => {
//     set({ isLoading: true, error: null });
//     try {
//       const formData = new FormData();
//       if (updatedData.title) formData.append('title', updatedData.title);
//       if (updatedData.content) formData.append('content', updatedData.content);

//       // Append updated images and videos to FormData if present
//       if (updatedData.images) {
//         updatedData.images.forEach((image) => formData.append('images', image));
//       }
//       if (updatedData.videos) {
//         updatedData.videos.forEach((video) => formData.append('videos', video));
//       }

//       const response = await axiosInstance.put(`/blog/update/${blogId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       handleResponse(response, (updatedBlog) => {
//         set((state) => ({
//           blogPosts: state.blogPosts.map((post) =>
//             post._id === blogId ? updatedBlog : post
//           ),
//           isLoading: false,
//         }));
//         toast.success('Blog post updated successfully!');
//       });
//     } catch (error) {
//       handleError(error, (message) => set({ error: message, isLoading: false }));
//     }
//   },

//   // Delete a blog post
//   deleteBlogPost: async (blogId) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axiosInstance.delete(`/blog/delete/${blogId}`);
//       handleResponse(response, () => {
//         set((state) => ({
//           blogPosts: state.blogPosts.filter((post) => post._id !== blogId),
//           isLoading: false,
//         }));
//         toast.success('Blog post deleted successfully!');
//       });
//     } catch (error) {
//       handleError(error, (message) => set({ error: message, isLoading: false }));
//     }
//   },
// }));

import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useBlogStore = create((set, get) => ({
  blogPosts: [],
  singleBlogPost: null, // New state for single blog post
  isLoading: false,
  error: null,

  // Fetch all blog posts
  fetchBlogPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/blog/all');
      handleResponse(response, data =>
        set({ blogPosts: data, isLoading: false })
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  // Fetch a single blog post
  fetchSingleBlogPost: async blogId => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/blog/${blogId}`);
      handleResponse(response, data =>
        set({ singleBlogPost: data, isLoading: false })
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  // Create a new blog post
  createBlogPost: async blogData => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);

      // Append images and videos to FormData if present
      if (blogData.images) {
        blogData.images.forEach(image => formData.append('images', image));
      }
      if (blogData.videos) {
        blogData.videos.forEach(video => formData.append('videos', video));
      }

      const response = await axiosInstance.post('/blog/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      handleResponse(response, newBlog => {
        set(state => ({
          blogPosts: [newBlog, ...state.blogPosts],
          isLoading: false,
        }));
        toast.success('Blog post created successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  // Update an existing blog post
  updateBlogPost: async (blogId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      if (updatedData.title) formData.append('title', updatedData.title);
      if (updatedData.content) formData.append('content', updatedData.content);

      // Append updated images and videos to FormData if present
      if (updatedData.images) {
        updatedData.images.forEach(image => formData.append('images', image));
      }
      if (updatedData.videos) {
        updatedData.videos.forEach(video => formData.append('videos', video));
      }

      const response = await axiosInstance.put(
        `/blog/update/${blogId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      handleResponse(response, updatedBlog => {
        set(state => ({
          blogPosts: state.blogPosts.map(post =>
            post._id === blogId ? updatedBlog : post
          ),
          isLoading: false,
        }));
        toast.success('Blog post updated successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  // Delete a blog post
  deleteBlogPost: async blogId => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/blog/delete/${blogId}`);
      handleResponse(response, () => {
        set(state => ({
          blogPosts: state.blogPosts.filter(post => post._id !== blogId),
          isLoading: false,
        }));
        toast.success('Blog post deleted successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
}));
