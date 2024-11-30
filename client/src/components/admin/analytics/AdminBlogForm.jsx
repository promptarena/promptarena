import React, { useState } from 'react';
import { useBlogStore } from '../store/blogStore';
import { handleError, showToast } from '../../utils/errorHandler';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';

const AdminBlogForm = ({ updateBlogPost, blogPost }) => {
  const { createBlogPost } = useBlogStore();
  const [title, setTitle] = useState(blogPost ? blogPost.title : '');
  const [content, setContent] = useState(blogPost ? blogPost.content : '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleVideoUpload = event => {
    const files = Array.from(event.target.files);
    setVideos(files);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (updateBlogPost) {
        // Update existing blog post
        const response = await updateBlogPost({
          blogId: updateBlogPost.id,
          title,
          content,
          images,
          videos,
        });
        if (response.status === 200) {
          showToast('Blog post updated successfully!', 'success');
          // Reset form or handle further actions
        } else {
          handleError(response, setError);
        }
      } else {
        // Create new blog post
        const response = await createBlogPost({
          title,
          content,
          images,
          videos,
        });
        if (response.status === 201) {
          showToast('Blog post created successfully!', 'success');
          // Reset form or handle further actions
        } else {
          handleError(response, setError);
        }
      }
    } catch (error) {
      handleError(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Upload Images:
        </label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="videos" className="block text-gray-700 font-bold mb-2">
          Upload Videos:
        </label>
        <input
          type="file"
          id="videos"
          multiple
          accept="video/*"
          onChange={handleVideoUpload}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AdminBlogForm;
