// // src/components/admin/blog/AdminBlogForm.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useBlogStore } from '../../../store/blogStore';
// import { useNavigate, useParams } from 'react-router-dom';
// import LoadingSpinner from '../../animations/loader/LoadingSpinner';
// import toast from 'react-hot-toast';
// import axiosInstance from '../../../services/axiosInstance';
// import { useAuthStore } from '../../../store/authStore';

// const AdminBlogForm = () => {
//   const { blogId } = useParams();
//   const navigate = useNavigate();
//   const { isLoading, error, createBlogPost, updateBlogPost, fetchBlogPosts } = useBlogStore();
//   const { user } = useAuthStore();

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [previewVideos, setPreviewVideos] = useState([]);
//   const imageInputRef = useRef(null);
//   const videoInputRef = useRef(null);

//   useEffect(() => {
//     const fetchPostForEdit = async () => {
//       if (blogId) {
//         try {
//           await fetchBlogPosts();
//           const post = useBlogStore.getState().blogPosts.find((p) => p._id === blogId);
//           if (post) {
//             setTitle(post.title);
//             setContent(post.content);
//             setImages(post.media?.images || []);
//             setVideos(post.media?.videos || []);
//             setPreviewImages(post.media?.images || []);
//             setPreviewVideos(post.media?.videos || []);
//             console.log('Fetched Post for Editing:', post);
//           }
//         } catch (error) {
//           console.error('Error fetching post for edit:', error);
//           toast.error('Error fetching blog post.');
//         }
//       }
//     };
//     fetchPostForEdit();
//   }, [blogId, fetchBlogPosts]);

//   const handleImageChange = (e) => {
//     const selectedImages = Array.from(e.target.files);
//     setImages(selectedImages);
//     const imagePreviews = selectedImages.map((file) => URL.createObjectURL(file));
//     setPreviewImages(imagePreviews);
//     console.log('Selected Images:', selectedImages);
//   };

//   const handleVideoChange = (e) => {
//     const selectedVideos = Array.from(e.target.files);
//     setVideos(selectedVideos);
//     const videoPreviews = selectedVideos.map((file) => URL.createObjectURL(file));
//     setPreviewVideos(videoPreviews);
//     console.log('Selected Videos:', selectedVideos);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log('Title:', title);
//     console.log('Content:', content);
//     console.log('Images:', images);
//     console.log('Videos:', videos);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     if (user?._id) {
//       formData.append('author', user._id);
//     }

//     images.forEach((image, index) => {
//       formData.append('images', image);
//     });
//     videos.forEach((video, index) => {
//       formData.append('videos', video);
//     });

//     console.log('FormData before submission:');
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       if (blogId) {
//         console.log('Updating existing blog post...');
//         await updateBlogPost(blogId, formData);
//         toast.success('Blog post updated!');
//       } else {
//         console.log('Creating new blog post...');
//         const response = await axiosInstance.post('/blog/create', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log('Response from server:', response.data);
//         toast.success('Blog post created!');
//       }
//       navigate('/admin/blog');
//     } catch (error) {
//       console.error('Error creating/updating blog post:', error);
//       toast.error('Error saving blog post.');
//     }
//   };

//   const handleImageUploadClick = () => {
//     imageInputRef.current.click();
//   };

//   const handleVideoUploadClick = () => {
//     videoInputRef.current.click();
//   };

//   if (isLoading && blogId) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div className='text-red-500'>{error}</div>;
//   }

//   return (
//     <div className='container mx-auto p-4'>
//       <h1 className='text-3xl font-bold mb-4'>
//         {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
//       </h1>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-4'>
//           <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
//             Title:
//           </label>
//           <input
//             type='text'
//             id='title'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//           />
//         </div>

//         <div className='mb-4'>
//           <label htmlFor='content' className='block text-gray-700 font-bold mb-2'>
//             Content:
//           </label>
//           <textarea
//             id='content'
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64'
//           ></textarea>
//         </div>

//         <div className='mb-4'>
//           <label className='block text-gray-700 font-bold mb-2'>Images:</label>
//           <input
//             type='file'
//             multiple
//             accept='image/*'
//             ref={imageInputRef}
//             onChange={handleImageChange}
//             className='hidden'
//           />
//           <button
//             type='button'
//             onClick={handleImageUploadClick}
//             className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
//           >
//             <span>Choose Images</span>
//           </button>
//           <div className='mt-2 flex flex-wrap'>
//             {previewImages.map((src, idx) => (
//               <img key={idx} src={src} alt='Preview' className='max-w-xs h-auto rounded-md m-2' />
//             ))}
//           </div>
//         </div>

//         <div className='mb-4'>
//           <label className='block text-gray-700 font-bold mb-2'>Videos:</label>
//           <input
//             type='file'
//             multiple
//             accept='video/*'
//             ref={videoInputRef}
//             onChange={handleVideoChange}
//             className='hidden'
//           />
//           <button
//             type='button'
//             onClick={handleVideoUploadClick}
//             className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
//           >
//             <span>Choose Videos</span>
//           </button>
//           <div className='mt-2 flex flex-wrap'>
//             {previewVideos.map((src, idx) => (
//               <video key={idx} src={src} controls className='max-w-xs h-auto rounded-md m-2' />
//             ))}
//           </div>
//         </div>

//         <button
//           type='submit'
//           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//         >
//           {blogId ? 'Update Post' : 'Create Post'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminBlogForm;

import React, { useState, useEffect, useRef } from 'react';
import { useBlogStore } from '../../../store/blogStore';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../animations/loader/LoadingSpinner';
import toast from 'react-hot-toast';
import axiosInstance from '../../../services/axiosInstance';
import { useAuthStore } from '../../../store/authStore';

const AdminBlogForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, createBlogPost, updateBlogPost, fetchBlogPosts } =
    useBlogStore();
  const { user } = useAuthStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const fetchPostForEdit = async () => {
      if (blogId) {
        try {
          await fetchBlogPosts();
          const post = useBlogStore
            .getState()
            .blogPosts.find(p => p._id === blogId);
          if (post) {
            setTitle(post.title);
            setContent(post.content);
            setImages(post.media?.images || []);
            setVideos(post.media?.videos || []);
            setPreviewImages(post.media?.images || []);
            setPreviewVideos(post.media?.videos || []);
            console.log('Fetched Post for Editing:', post);
          }
        } catch (error) {
          console.error('Error fetching post for edit:', error);
          toast.error('Error fetching blog post.');
        }
      }
    };
    fetchPostForEdit();
  }, [blogId, fetchBlogPosts]);

  const handleImageChange = e => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    const imagePreviews = selectedImages.map(file => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
    console.log('Selected Images:', selectedImages);
  };

  const handleVideoChange = e => {
    const selectedVideos = Array.from(e.target.files);
    setVideos(selectedVideos);
    const videoPreviews = selectedVideos.map(file => URL.createObjectURL(file));
    setPreviewVideos(videoPreviews);
    console.log('Selected Videos:', selectedVideos);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Images:', images);
    console.log('Videos:', videos);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (user?._id) {
      formData.append('author', user._id);
    }

    images.forEach(image => {
      formData.append('images', image);
    });
    videos.forEach(video => {
      formData.append('videos', video);
    });

    console.log('FormData before submission:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      if (blogId) {
        console.log('Updating existing blog post...');
        await updateBlogPost(blogId, formData);
        toast.success('Blog post updated!');
      } else {
        console.log('Creating new blog post...');
        await axiosInstance.post('/blog/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Blog post created!');
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error creating/updating blog post:', error);
      toast.error('Error saving blog post.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
  };

  if (isLoading && blogId) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>
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
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleImageUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Choose Images</span>
          </button>
          <div className="mt-2 flex flex-wrap">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Preview"
                className="max-w-xs h-auto rounded-md m-2"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Videos:</label>
          <input
            type="file"
            multiple
            accept="video/*"
            ref={videoInputRef}
            onChange={handleVideoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleVideoUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Choose Videos</span>
          </button>
          <div className="mt-2 flex flex-wrap">
            {previewVideos.map((src, idx) => (
              <video
                key={idx}
                src={src}
                controls
                className="max-w-xs h-auto rounded-md m-2"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting
            ? 'Submitting...'
            : blogId
              ? 'Update Post'
              : 'Create Post'}
        </button>
        {isSubmitting && <LoadingSpinner />}{' '}
        {/* Show loading spinner during submission */}
      </form>
    </div>
  );
};

export default AdminBlogForm;
