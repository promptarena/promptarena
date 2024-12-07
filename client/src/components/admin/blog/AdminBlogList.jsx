// // src/components/admin/blog/AdminBlogList.jsx
// import React, { useEffect } from 'react';
// import { useBlogStore } from '../../../store/blogStore';
// import { Link } from 'react-router-dom';
// import LoadingSpinner from '../../animations/loader/LoadingSpinner';
// import { formatDate } from '../../../utils/date'; // Assuming you have a date formatting utility

// const AdminBlogList = () => {
//   const { fetchBlogPosts, blogPosts, isLoading, error, deleteBlogPost } =
//     useBlogStore();

//   useEffect(() => {
//     fetchBlogPosts();
//   }, [fetchBlogPosts]);
//   console.log('blogPosts: ', blogPosts);

//   const handleDeletePost = blogId => {
//     if (window.confirm('Are you sure you want to delete this blog post?')) {
//       deleteBlogPost(blogId);
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {/* <h1 className='text-3xl font-bold mb-4'>Manage Blog Posts</h1> */}

//       <Link
//         to="/admin/blog/create"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Create New Post
//       </Link>

//       <table className="table-auto w-full mt-5">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">Title</th>
//             <th className="px-4 py-2 border">Author</th>
//             <th className="px-4 py-2 border">Created At</th>{' '}
//             <th className="px-4 py-2 border">Content</th>{' '}
//             <th className="px-4 py-2 border">Image</th>{' '}
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogPosts.map(post => (
//             <tr key={post._id}>
//               <td className="border px-4 py-2">{post.title}</td>
//               <td className="border px-4 py-2">{post.author.username}</td>{' '}
//               <td className="border px-4 py-2">{formatDate(post.createdAt)}</td>{' '}
//               <td className="border px-4 py-2">{post.content}</td>{' '}
//               <td className="border px-4 py-2 w-1/6 h-1/6">
//                 {post.media.images.length > 0 ? (
//                   <img
//                     src={post.media.images[0]}
//                     className="object-cover aspect-square w-full"
//                     alt={post.title}
//                   />
//                 ) : (
//                   <p>No image</p>
//                 )}
//               </td>
//               <td className="border px-4 py-2">
//                 <Link
//                   to={`/admin/blog/edit/${post._id}`}
//                   className=" badge-tertiary p-1 rounded hover:underline mr-2"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDeletePost(post._id)}
//                   className=" bg-danger p-1 rounded hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminBlogList;

// src/components/admin/blog/AdminBlogList.jsx
import React, { useEffect } from 'react';
import { useBlogStore } from '../../../store/blogStore';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../animations/loader/LoadingSpinner';
import { formatDate } from '../../../utils/date'; // Assuming you have a date formatting utility
import useAlert from '../../../hooks/useAlert'; // Import useAlert hook

const AdminBlogList = () => {
  const { fetchBlogPosts, blogPosts, isLoading, error, deleteBlogPost } =
    useBlogStore();
  const { customConfirm, AlertModalComponent } = useAlert(); // Destructure customConfirm and AlertModalComponent

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  const handleDeletePost = blogId => {
    // Use customConfirm instead of window.confirm
    customConfirm(
      'Are you sure you want to delete this blog post?',
      async () => {
        try {
          await deleteBlogPost(blogId);
        } catch (error) {
          console.error('Error deleting blog post:', error);
        }
      }
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className='text-3xl font-bold mb-4'>Manage Blog Posts</h1> */}

      <Link
        to="/admin/blog/create"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create New Post
      </Link>

      <div className="md:overflow-hidden sm:w-full 3sm:w-[90%] 2xs:w-[60%] w-[50%] md:p-0 p-2 overflow-x-scroll">
        <table className="table-auto mt-5">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Created At</th>{' '}
              {/* <th className="px-4 py-2 border">Content</th>{' '} */}
              <th className="px-4 py-2 border">Image</th>{' '}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map(post => (
              <tr key={post._id}>
                <td className="border px-4 py-2">{post.title}</td>
                <td className="border px-4 py-2">
                  {post.author.username}
                </td>{' '}
                <td className="border px-4 py-2">
                  {formatDate(post.createdAt)}
                </td>{' '}
                {/* <td className="border px-4 py-2">{post.content}</td>{' '} */}
                <td className="border px-4 py-2 w-1/6 h-1/6">
                  {post.media.images.length > 0 ? (
                    <img
                      src={post.media.images[0]}
                      className="object-cover aspect-square w-full"
                      alt={post.title}
                    />
                  ) : (
                    <p>No image</p>
                  )}
                </td>
                <td className="border px-4 space-y-2 py-2">
                  <Link
                    to={`/admin/blog/edit/${post._id}`}
                    className=" badge-tertiary text-white p-1 rounded hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className=" bg-danger text-white p-1 rounded hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the AlertModalComponent here */}
      {AlertModalComponent}
    </div>
  );
};

export default AdminBlogList;
