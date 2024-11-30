// import React, { useState, useEffect, useRef } from 'react';
// import { usePromptStore } from '../../store/promptStore';
// import { useNavigate } from 'react-router-dom';
// import FileInputButton from '../global/FileInputButton';
// import ProgressBar from '../global/ProgressBar';
// import ErrorThrower from '../base/ErrorThrower';
// import Select from 'react-select';
// import toast from 'react-hot-toast';

// const CreatePromptForm = () => {
//   const {
//     isLoading,
//     error,
//     createPrompt,
//     uploadProgress,
//     categories,
//     fetchCategories,
//   } = usePromptStore();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState(0);
//   const [promptType, setPromptType] = useState('text');
//   const [prompt, setPrompt] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [newCategory, setNewCategory] = useState('');
//   const [tags, setTags] = useState('');
//   const [model, setModel] = useState('');
//   const [exampleResponse, setExampleResponse] = useState('');

//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [pdfs, setPdfs] = useState([]);

//   // Refs for file inputs
//   const imageInputRef = useRef(null);
//   const videoInputRef = useRef(null);
//   const pdfInputRef = useRef(null);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleFileChange = (e, type) => {
//     // e.preventDefault();
//     const files = Array.from(e.target.files);
//     switch (type) {
//       case 'images':
//         setImages(files);
//         break;
//       case 'videos':
//         setVideos(files);
//         break;
//       case 'pdfs':
//         setPdfs(files);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedCategory && newCategory.trim() === '') {
//       toast.error('Please select a category or enter a new one.');
//       return;
//     }

//     const category = selectedCategory
//       ? selectedCategory.value
//       : newCategory.trim();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('promptType', promptType);
//     formData.append('prompt', prompt);
//     formData.append('category', category);
//     formData.append('tags', tags);
//     formData.append('model', model);
//     formData.append('exampleResponse', exampleResponse);

//     images.forEach((image) => formData.append('images', image));
//     videos.forEach((video) => formData.append('videos', video));
//     pdfs.forEach((pdf) => formData.append('pdfs', pdf));

//     try {
//       await createPrompt(formData);

//       setTitle('');
//       setDescription('');
//       setPrice(0);
//       setPromptType('text');
//       setPrompt('');
//       setSelectedCategory(null);
//       setNewCategory('');
//       setTags('');
//       setModel('');
//       setExampleResponse('');
//       setImages([]);
//       setVideos([]);
//       setPdfs([]);

//       imageInputRef.current.value = null;
//       videoInputRef.current.value = null;
//       pdfInputRef.current.value = null;

//       navigate('/prompts');
//     } catch (error) {
//       console.error('Error creating prompt:', error);
//     }
//   };

//   // Click handlers for file input buttons
//   const handleImageUploadClick = () => {
//     imageInputRef.current.click();
//   };

//   const handleVideoUploadClick = () => {
//     videoInputRef.current.click();
//   };

//   const handlePdfUploadClick = () => {
//     pdfInputRef.current.click();
//   };

//   return (
//     <div className='bg-white p-6 rounded-lg shadow'>
//       <h2 className='text-xl font-semibold mb-4'>Create New Prompt</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Title Input */}
//         <div className='mb-4'>
//           <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
//             Title
//           </label>
//           <input
//             type='text'
//             id='title'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         {/* Description Input */}
//         <div className='mb-4'>
//           <label
//             htmlFor='description'
//             className='block text-gray-700 font-bold mb-2'
//           >
//             Description
//           </label>
//           <textarea
//             id='description'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         {/* Price Input */}
//         <div className='mb-4'>
//           <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
//             Price (USD)
//           </label>
//           <input
//             type='number'
//             id='price'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             min='0'
//           />
//         </div>

//         {/* Prompt Type Select */}
//         <div className='mb-4'>
//           <label
//             htmlFor='promptType'
//             className='block text-gray-700 font-bold mb-2'
//           >
//             Prompt Type
//           </label>
//           <select
//             id='promptType'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={promptType}
//             onChange={(e) => setPromptType(e.target.value)}
//             required
//           >
//             <option value='text'>Text</option>
//             <option value='code'>Code</option>
//             <option value='image'>Image</option>
//             <option value='video'>Video</option>
//             <option value='pdf'>PDF</option>
//             <option value='audio'>Audio</option>
//           </select>
//         </div>

//         {/* Prompt Input */}
//         <div className='mb-4'>
//           <label
//             htmlFor='prompt'
//             className='block text-gray-700 font-bold mb-2'
//           >
//             Prompt
//           </label>
//           <textarea
//             id='prompt'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             required
//           />
//         </div>

//         {/* Category Selection and New Category Input */}
//         <div className='mb-4'>
//           <label
//             htmlFor='category'
//             className='block text-gray-700 font-bold mb-2'
//           >
//             Category
//           </label>
//           <Select
//             id='category'
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             options={categories.map((category) => ({
//               value: category,
//               label: category,
//             }))}
//             placeholder='Select a category'
//             isClearable
//           />

//           {/* Input for adding a new category */}
//           <input
//             type='text'
//             id='newCategory'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2'
//             placeholder='Add a new category'
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//           />
//         </div>

//         {/* Tags Input */}
//         <div className='mb-4'>
//           <label htmlFor='tags' className='block text-gray-700 font-bold mb-2'>
//             Tags (comma-separated)
//           </label>
//           <input
//             type='text'
//             id='tags'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//           />
//         </div>

//         {/* Model Input */}
//         <div className='mb-4'>
//           <label htmlFor='model' className='block text-gray-700 font-bold mb-2'>
//             Model (e.g., GPT-3)
//           </label>
//           <input
//             type='text'
//             id='model'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//           />
//         </div>

//         {/* Example Response Input */}
//         <div className='mb-4'>
//           <label
//             htmlFor='exampleResponse'
//             className='block text-gray-700 font-bold mb-2'
//           >
//             Example Response (Optional)
//           </label>
//           <textarea
//             id='exampleResponse'
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//             value={exampleResponse}
//             onChange={(e) => setExampleResponse(e.target.value)}
//           />
//         </div>

//         {/* File Input Sections */}
//         <div className='mb-4'>
//           <label className='block text-gray-700 font-bold mb-2'>
//             Images (max 5)
//           </label>
//           <input
//             type='file'
//             ref={imageInputRef}
//             accept='image/*'
//             multiple
//             className='hidden'
//             onChange={(e) => handleFileChange(e, 'images')}
//           />
//           <button
//             onClick={handleImageUploadClick}
//             className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
//             disabled={isLoading}
//             type='button' // Set type to "button"
//           >
//             <span>Choose Images</span>
//           </button>
//           {uploadProgress.images && (
//             <ProgressBar progress={uploadProgress.images} />
//           )}
//         </div>

// {images.length > 0 && ( // Display selected image names
//   <div>
//     <p className='mt-2'>Selected Images:</p>
//     <ul>
//       {images.map((image, index) => (
//         <li key={index}>{image.name}</li>
//       ))}
//     </ul>
//   </div>
// )}

//         {/* Video Input Section */}
//         <div className='mb-4'>
//           <label className='block text-gray-700 font-bold mb-2'>
//             Videos (max 2)
//           </label>
//           <input
//             type='file'
//             ref={videoInputRef}
//             accept='video/*'
//             multiple
//             className='hidden'
//             onChange={(e) => handleFileChange(e, 'videos')}
//           />
//           <button
//             onClick={handleVideoUploadClick}
//             className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
//             disabled={isLoading}
//             type='button' // Set type to "button"
//           >
//             <span>Choose Videos</span>
//           </button>
//           {uploadProgress.videos && (
//             <ProgressBar progress={uploadProgress.videos} />
//           )}
//         </div>

//         {/* PDF Input Section */}
//         <div className='mb-4'>
//           <label className='block text-gray-700 font-bold mb-2'>
//             PDFs (max 2)
//           </label>
//           <input
//             type='file'
//             ref={pdfInputRef}
//             accept='.pdf'
//             multiple
//             className='hidden'
//             onChange={(e) => handleFileChange(e, 'pdfs')}
//           />
//           <button
//             onClick={handlePdfUploadClick}
//             className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
//             disabled={isLoading}
//             type='button' // Set type to "button"
//           >
//             <span>Choose PDFs</span>
//           </button>
//           {uploadProgress.pdfs && (
//             <ProgressBar progress={uploadProgress.pdfs} />
//           )}
//         </div>

//         {/* Error Message */}
//         {error && <ErrorThrower error={error} />}

//         {/* Submit Button */}
//         <button
//           type='submit'
//           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//           disabled={isLoading}
//         >
//           {isLoading ? 'Creating...' : 'Create Prompt'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePromptForm;

import React, { useState, useEffect, useRef } from 'react';
import { usePromptStore } from '../../store/promptStore';
import { useNavigate } from 'react-router-dom';
import FileInputButton from '../global/FileInputButton';
import ProgressBar from '../global/ProgressBar';
import ErrorThrower from '../base/ErrorThrower';
import Select from 'react-select';
import toast from 'react-hot-toast';

const CreatePromptForm = () => {
  const { isLoading, error, createPrompt, categories, fetchCategories } =
    usePromptStore();
  const navigate = useNavigate();

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

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  // Refs for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFileChange = (e, type) => {
    e.preventDefault(); // Prevent form submission
    const files = Array.from(e.target.files);
    switch (type) {
      case 'images':
        setImages(files);
        break;
      case 'videos':
        setVideos(files);
        break;
      case 'pdfs':
        setPdfs(files);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

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

    images.forEach(image => formData.append('images', image));
    videos.forEach(video => formData.append('videos', video));
    pdfs.forEach(pdf => formData.append('pdfs', pdf));

    try {
      await createPrompt(formData);

      // Reset form fields and file inputs
      setTitle('');
      setDescription('');
      setPrice(0);
      setPromptType('text');
      setPrompt('');
      setSelectedCategory(null);
      setNewCategory('');
      setTags('');
      setModel('');
      setExampleResponse('');
      setImages([]);
      setVideos([]);
      setPdfs([]);

      imageInputRef.current.value = null;
      videoInputRef.current.value = null;
      pdfInputRef.current.value = null;

      navigate('/prompts');
    } catch (error) {
      console.error('Error creating prompt:', error);
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
      <h2 className="text-xl font-semibold mb-4">Create New Prompt</h2>
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
            isClearable
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

        {/* File Input Sections */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Images (max 5)
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
            onClick={handleImageUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            disabled={isLoading}
            type="button"
          >
            <span>Choose Images</span>
          </button>

          {images.length > 0 && ( // Display selected image names
            <div>
              <p className="mt-2">Selected Images:</p>
              <ul>
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Video Input Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Videos (max 2)
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
            onClick={handleVideoUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            disabled={isLoading}
            type="button"
          >
            <span>Choose Videos</span>
          </button>

          {videos.length > 0 && ( // Display selected video names
            <div>
              <p className="mt-2">Selected Videos:</p>
              <ul>
                {videos.map((video, index) => (
                  <li key={index}>{video.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* PDF Input Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            PDFs (max 2)
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
            onClick={handlePdfUploadClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            disabled={isLoading}
            type="button"
          >
            <span>Choose PDFs</span>
          </button>

          {pdfs.length > 0 && ( // Display selected PDF names
            <div>
              <p className="mt-2">Selected PDFs:</p>
              <ul>
                {pdfs.map((pdf, index) => (
                  <li key={index}>{pdf.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <ErrorThrower error={error} />}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Prompt'}
        </button>
      </form>
    </div>
  );
};

export default CreatePromptForm;
