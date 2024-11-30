import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfileStore } from '../../store/userProfileStore';
import { uploadFileToCloudinary } from '../../services/apiService';
import axiosInstance from '../../services/axiosInstance';
import toast from 'react-hot-toast';

const PromptForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserProfileStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing prompt data for editing
  useEffect(() => {
    const fetchPrompt = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/prompt/${id}`);
          const promptData = response.data.data;
          setTitle(promptData.title);
          setDescription(promptData.description);
          setPrice(promptData.price);
          setImages(promptData.media.images || []);
          setPdfs(promptData.media.pdfs || []);
        } catch (error) {
          console.error('Error fetching prompt:', error);
          toast.error('Error fetching prompt data.');
        }
      }
    };
    fetchPrompt();
  }, [id]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handlePdfChange = e => {
    const files = Array.from(e.target.files);
    setPdfs(files);
  };

  const handleUpload = async (file, folder, resourceType) => {
    try {
      return await uploadFileToCloudinary(
        file,
        progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
        folder,
        resourceType,
        setError
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload images to Cloudinary
      const uploadedImageUrls = await Promise.all(
        images.map(image =>
          handleUpload(image, `prompt_images/${user.username}`, 'image')
        )
      );

      // Upload PDFs to Cloudinary
      const uploadedPdfUrls = await Promise.all(
        pdfs.map(pdf =>
          handleUpload(pdf, `prompt_pdfs/${user.username}`, 'raw')
        )
      );

      const promptData = {
        title,
        description,
        price,
        media: {
          images: uploadedImageUrls,
          pdfs: uploadedPdfUrls,
        },
      };

      // Create or update prompt
      if (id) {
        await axiosInstance.put(`/api/v1/prompt/update/${id}`, promptData);
        toast.success('Prompt updated successfully!');
      } else {
        await axiosInstance.post('/api/v1/prompt/create', promptData);
        toast.success('Prompt created successfully!');
      }

      navigate('/dashboard'); // Redirect to dashboard after submit
    } catch (error) {
      console.error('Error creating/updating prompt:', error);
      toast.error('Error creating/updating prompt.');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {id ? 'Edit Prompt' : 'Create New Prompt'}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={e => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-bold mb-2"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            multiple
            onChange={handleImageChange}
          />
          {/* Display selected images */}
          {images.length > 0 && (
            <ul className="mt-2">
              {images.map((image, index) => (
                <li key={index}>{image.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="pdfs" className="block text-gray-700 font-bold mb-2">
            PDFs
          </label>
          <input
            type="file"
            id="pdfs"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            multiple
            accept=".pdf"
            onChange={handlePdfChange}
          />
          {/* Display selected PDFs */}
          {pdfs.length > 0 && (
            <ul className="mt-2">
              {pdfs.map((pdf, index) => (
                <li key={index}>{pdf.name}</li>
              ))}
            </ul>
          )}
        </div>
        {/* Display upload progress */}
        {uploadProgress > 0 && (
          <div className="mb-4">
            <progress value={uploadProgress} max="100" className="w-full" />
            <p className="text-center">{uploadProgress}%</p>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : id ? 'Update Prompt' : 'Create Prompt'}
        </button>
      </form>
    </div>
  );
};

export default PromptForm;
