// src/components/admin/blog/AdminBlogDashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminBlogDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get('/api/admin/blogs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  const handleDelete = async postId => {
    await axios.delete(`/api/admin/blogs/${postId}`);
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <div>
      <h1>Blog Management</h1>
      <Link to="/admin/blog/create">Create New Blog Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {post.title} - {post.published ? 'Published' : 'Draft'}
            <Link to={`/admin/blog/edit/${post._id}`}>Edit</Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBlogDashboard;
