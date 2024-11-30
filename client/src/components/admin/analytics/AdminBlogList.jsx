import React from 'react';
import { Link } from 'react-router-dom';

const AdminBlogList = ({ blogPosts, onDeletePost }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Author</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogPosts.map(post => (
          <tr key={post._id}>
            <td className="border px-4 py-2">{post.title}</td>
            <td className="border px-4 py-2">{post.author?.username}</td>
            <td className="border px-4 py-2">{formatDate(post.createdAt)}</td>
            <td className="border px-4 py-2">
              <Link
                to={`/admin/blog/${post._id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => onDeletePost(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminBlogList;
