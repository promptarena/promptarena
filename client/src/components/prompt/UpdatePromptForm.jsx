import React, { useState, useEffect, useRef } from 'react';
import { usePromptStore } from '../../store/promptStore';
import { useParams, useNavigate } from 'react-router-dom';
import FileInputButton from '../global/FileInputButton';
import ProgressBar from '../global/ProgressBar';
import ErrorThrower from '../base/ErrorThrower';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { handleError } from '../../utils/errorHandler';

const UpdatePromptForm = () => {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const {
    fetchPromptById,
    updatePrompt,
    isLoading,
    error,
    uploadProgress,
    categories,
    fetchCategories,
  } = usePromptStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [promptType, setPromptType] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [tags, setTags] = useState('');
  const [model, setModel] = useState('');
  const [exampleResponse, setExampleResponse] = useState('');
  const [initialImages, setInitialImages] = useState([]);
  const [initialVideos, setInitialVideos] = useState([]);
  const [initialPdfs, setInitialPdfs] = useState([]);

  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [newPdfs, setNewPdfs] = useState([]);

  // Refs for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  useEffect(() => {
    const getPrompt = async () => {
      try {
        await fetchPromptById(promptId);
        const promptToUpdate = usePromptStore
          .getState()
          .prompts.find(p => p._id === promptId);

        if (promptToUpdate) {
          setTitle(promptToUpdate.title);
          setDescription(promptToUpdate.description);
          setPrice(promptToUpdate.price);
          setPromptType(promptToUpdate.promptType);
          setPrompt(promptToUpdate.prompt);
          setSelectedCategory({
            value: promptToUpdate.category,
            label: promptToUpdate.category,
          });
          setTags(promptToUpdate.tags.join(', '));
          setModel(promptToUpdate.model);
          setExampleResponse(promptToUpdate.exampleResponse);

          setInitialImages(promptToUpdate.media.images);
          setInitialVideos(promptToUpdate.media.videos);
          setInitialPdfs(promptToUpdate.media.pdfs);
        }
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    };

    getPrompt();
  }, [promptId, fetchPromptById]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        await fetchCategories();
      } catch (err) {
        console.error('Error fetching categories:', err);
        handleError(err, message => console.error(message));
      }
    };
    getCategories();
  }, [fetchCategories]);

  const handleFileChange = (e, type) => {
    e.preventDefault(); // Prevent form submission on file selection
    const files = Array.from(e.target.files);
    switch (type) {
      case 'images':
        setNewImages(files);
        break;
      case 'videos':
        setNewVideos(files);
        break;
      case 'pdfs':
        setNewPdfs(files);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate category selection/input
    if (!selectedCategory && newCategory.trim() === '') {
      toast.error('Please select a category or enter a new one.');
      return;
    }

    const category = selectedCategory
      ? selectedCategory.value
      : newCategory.trim();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('promptType', promptType);
    formData.append('prompt', prompt);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('model', model);
    formData.append('exampleResponse', exampleResponse);

    newImages.forEach(image => formData.append('images', image));
    newVideos.forEach(video => formData.append('videos', video));
    newPdfs.forEach(pdf => formData.append('pdfs', pdf));

    try {
      await updatePrompt(promptId, formData);
      navigate('/prompts'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating prompt:', error);
    }
  };

  // Click handlers for file input buttons
  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
  };

  const handlePdfUploadClick = () => {
    pdfInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Update Prompt</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
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

        {/* Description Input */}
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

        {/* Price Input */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        {/* Prompt Type Select */}
        <div className="mb-4">
          <label
            htmlFor="promptType"
            className="block text-gray-700 font-bold mb-2"
          >
            Prompt Type
          </label>
          <select
            id="promptType"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={promptType}
            onChange={e => setPromptType(e.target.value)}
            required
          >
            <option value="text">Text</option>
            <option value="code">Code</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-gray-700 font-bold mb-2"
          >
            Prompt
          </label>
          <textarea
            id="prompt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            required
          />
        </div>

        {/* Category Selection and New Category Input */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Category
          </label>
          <Select
            id="category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories.map(category => ({
              value: category,
              label: category,
            }))}
            placeholder="Select a category"
            isSearchable
            required
          />

          {/* Input for adding a new category */}
          <input
            type="text"
            id="newCategory"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            placeholder="Add a new category"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>

        {/* Model Input */}
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
            Model (e.g., GPT-3)
          </label>
          <input
            type="text"
            id="model"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
        </div>

        {/* Example Response Input */}
        <div className="mb-4">
          <label
            htmlFor="exampleResponse"
            className="block text-gray-700 font-bold mb-2"
          >
            Example Response (Optional)
          </label>
          <textarea
            id="exampleResponse"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={exampleResponse}
            onChange={e => setExampleResponse(e.target.value)}
          />
        </div>

        {/* Existing Media */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Existing Media</h3>
          {/* Display initial images */}
          {initialImages.length > 0 && (
            <div>
              <h4>Images:</h4>
              <ul>
                {initialImages.map((image, index) => (
                  <li key={index}>
                    <a href={image} target="_blank" rel="noopener noreferrer">
                      {image}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display initial videos */}
          {initialVideos.length > 0 && (
            <div>
              <h4>Videos:</h4>
              <ul>
                {initialVideos.map((video, index) => (
                  <li key={index}>
                    <a href={video} target="_blank" rel="noopener noreferrer">
                      {video}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display initial PDFs */}
          {initialPdfs.length > 0 && (
            <div>
              <h4>PDFs:</h4>
              <ul>
                {initialPdfs.map((pdf, index) => (
                  <li key={index}>
                    <a href={pdf} target="_blank" rel="noopener noreferrer">
                      {pdf}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* File Input Sections */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Images (max 5)
          </label>
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => handleFileChange(e, 'images')}
          />
          <button
            type="button" // Important: Set type to "button"
            onClick={handleImageUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            disabled={isLoading}
          >
            <span>Choose Images</span>
          </button>
          {uploadProgress.images && (
            <ProgressBar progress={uploadProgress.images} />
          )}
        </div>

        {/* Similar structure for video and PDF inputs */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New Videos (max 2)
          </label>
          <input
            type="file"
            ref={videoInputRef}
            accept="video/*"
            multiple
            className="hidden"
            onChange={e => handleFileChange(e, 'videos')}
          />
          <button
            type="button"
            onClick={handleVideoUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            disabled={isLoading}
          >
            <span>Choose Videos</span>
          </button>
          {uploadProgress.videos && (
            <ProgressBar progress={uploadProgress.videos} />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            New PDFs (max 2)
          </label>
          <input
            type="file"
            ref={pdfInputRef}
            accept=".pdf"
            multiple
            className="hidden"
            onChange={e => handleFileChange(e, 'pdfs')}
          />
          <button
            type="button"
            onClick={handlePdfUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            disabled={isLoading}
          >
            <span>Choose PDFs</span>
          </button>
          {uploadProgress.pdfs && (
            <ProgressBar progress={uploadProgress.pdfs} />
          )}
        </div>

        {/* ... Error Message, Submit Button ... */}
        {/* Error Message */}
        {error && <ErrorThrower error={error} />}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Prompt'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePromptForm;
