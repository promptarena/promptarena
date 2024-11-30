import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../store/blogStore';
import LoadingSpinner from '../components/animations/loader/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const BlogPage2 = () => {
  const { blogPosts, fetchBlogPosts, isLoading, error } = useBlogStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    toast.error(error);
    return (
      <div className="text-red-500 text-center">
        <p>Error loading blog posts.</p>
        <button
          onClick={fetchBlogPosts}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
      {/* {user.role === 'admin'  && (
        <div className='mb-4'>
          <Link
            to='/admin/blog/create'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2'
          >
            Create New Post
          </Link>
          <Link
            to='/admin/blog'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Manage Blog
          </Link>
        </div>
      )} */}
      {blogPosts.length === 0 ? (
        <div className="text-gray-500 text-center">
          No blog posts available.
        </div>
      ) : (
        <ul className="space-y-4">
          {blogPosts.map(post => (
            <li key={post._id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold">
                <Link
                  to={`/blog/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
              <p className="text-gray-500">
                By:{' '}
                <Link
                  to={`/profile/username/${post.author.username}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.author.username}
                </Link>
              </p>
              <p className="text-gray-500">
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                Updated: {new Date(post.updatedAt).toLocaleDateString()}
              </p>
              {/* {user.role === 'admin' && (
                <Link
                  to={`/admin/blog/edit/${post._id}`}
                  className='text-white badge badge-tertiary rounded-md hover:bg-blue-600'
                >
                  Edit
                </Link>
              )} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPage2;
