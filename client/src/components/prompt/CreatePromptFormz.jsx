import React, { useState, useEffect, useRef } from 'react';
import { usePromptStore } from '../../store/promptStore';
import { useNavigate } from 'react-router-dom';
import FileInputButton from '../global/FileInputButton';
import ProgressBar from '../global/ProgressBar';
import ErrorThrower from '../base/ErrorThrower';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Input from '../base/Input';
import { ImageUp, PenBox, UploadIcon } from 'lucide-react';
import PromptCard from './PromptCard';
import FileDropzone from '../global/FileDropzone';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useAuthStore } from '../../store/authStore';
import {
  humanRobotIMG1,
  humanRobotIMG2,
  humanRobotIMG3,
  humanRobotIMG4,
} from '../../assets/img/promptpage';

const CreatePromptFormz = () => {
  const { isLoading, error, createPrompt, categories, fetchCategories } =
    usePromptStore();
  const navigate = useNavigate();

  const { user } = useAuthStore();
  console.log('user: ', user);

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

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target?.files || event);

    switch (type) {
      case 'images':
        setImages(files.slice(0, 5)); // Limit to 5 images
        break;
      case 'videos':
        setVideos(files.slice(0, 2)); // Limit to 2 videos
        break;
      case 'pdfs':
        setPdfs(files.slice(0, 2)); // Limit to 2 PDFs
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

      navigate('/explore');

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
    } catch (error) {
      console.error('Error creating prompt:', error);
    }
  };

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
    <div className="min-h-screen text-gray-100 p-0 md:p-8">
      {/* Tutorial Section */}
      {/* <div className="bg-gray-800/50 backdrop-blur-3xl text-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold mb-4">
          Welcome to Prompt Creator!
        </h2>
        <p className="text-lg mb-4">
          ✨ <strong>Why create a prompt?</strong>
          <br />
          Creating prompts is a fun and powerful way to unleash your creativity
          and get customized responses from AI. Whether you’re looking to
          generate text, images, or other media, your prompt serves as the
          gateway to amazing AI-generated content!
        </p>
        <p className="text-lg mb-4">
          📚 <strong>How it works:</strong>
          <br />
          Simply fill out the form below with a clear and descriptive prompt.
          Choose the type of content (text, images, videos, etc.), and we'll
          generate unique outputs based on your instructions!
        </p>
        <p className="text-lg mb-4">
          🎯 <strong>What you'll gain:</strong>
          <br />
          By creating a prompt, you’ll get tailored content for projects, ideas,
          or inspiration—perfect for both personal and professional use!
        </p>
        <p className="text-lg mb-4">
          🔧 <strong>Need help?</strong>
          <br />
          If you're unsure about any field, hover over the icons for more info!
          We're here to help guide you every step of the way.
        </p>
        <p className="font-bold text-lg text-center text-blue-500">
          Ready to create your first prompt? Let’s get started! 🎉
        </p>
      </div> */}

      <div className="text-center my-8">
        <h1 className="h1 font-ibm-plex-mono text-shadow">Create AI Prompt</h1>
        <h6 className="text-neutral-300 font-bold font-share-tech-mono">
          Add Prompt Details
        </h6>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Preview Card */}
        <div className="order-1 mx-auto md:order-1">
          <PromptCard
            prompt={{
              title: title || 'Untitled Prompt',
              description: description || 'No description available',
              promptType: promptType || 'text',
              model: model || 'GPT-3.5',
              createdAt: new Date(
                new Date().setDate(new Date().getDate() + 10)
              ).toISOString(),
              category: selectedCategory
                ? selectedCategory.label
                : newCategory || 'General',
              tags: tags.split(',').map(tag => tag.trim()) || [],
              media: {
                images:
                  images.length > 0
                    ? images.map(image => URL.createObjectURL(image))
                    : [
                        humanRobotIMG1,
                        humanRobotIMG2,
                        humanRobotIMG4,
                        humanRobotIMG3,
                      ],
              },
              seller: {
                username: user?.username,
                name: user?.name || 'Anonymous',
              },
            }}
          />
        </div>

        {/* Left-side Form Fields (Title, Description, Category, Tags) */}
        <div className="order-2 md:order-2">
          <form onSubmit={handleSubmit}>
            {/* Title Section */}
            <div className="mb-6">
              <label htmlFor="title" className="block font-bold mb-2 text-lg">
                ✨ Enter Your Prompt Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Enter a title for your prompt"
                className="shadow bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block font-bold mb-2 text-lg"
              >
                📝 Describe Your Prompt
              </label>
              <textarea
                rows="3"
                id="description"
                placeholder="Enter a detailed description for your prompt"
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Price Input */}
            <div className="mb-4 hidden">
              <label htmlFor="price" className="block  font-bold mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                id="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                value={price}
                placeholder="Enter a price for your prompt"
                onChange={e => setPrice(e.target.value)}
                required
                min="0"
              />
            </div>

            {/* Category & Tags Section */}
            <div className="mb-6 space-y-6">
              <div>
                <label
                  htmlFor="category"
                  className="block font-bold mb-2 text-lg"
                >
                  📂 Select Category
                </label>
                <Select
                  id="category"
                  styles={{
                    control: base => ({
                      ...base,
                      backgroundColor: '#1f2937',
                      borderColor: '#374151',
                      color: '#5A626F',
                    }),
                    menu: base => ({
                      ...base,
                      backgroundColor: '#1f2937',
                      borderColor: '#1f2937',
                      color: '#5A626F',
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? '#1f2937' : '#1f2937',
                      color: state.isSelected ? '#efefef' : '#fff',
                    }),
                  }}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categories.map(category => ({
                    value: category,
                    label: category,
                  }))}
                  isSearchable
                  placeholder="Select or add a category"
                  isClearable
                />

                {/* Input for adding a new category */}
                <input
                  type="text"
                  id="newCategory"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  placeholder="Add a new category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="tags" className="block font-bold mb-2 text-lg">
                  🏷️ Add Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  placeholder="Enter tags (comma-separated)"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
              </div>
            </div>

            {/* Prompt Type & Model Section */}
            <div className="mb-6 space-y-6">
              <div>
                <label
                  htmlFor="promptType"
                  className="block font-bold mb-2 text-lg"
                >
                  🖋️ Choose Prompt Type
                </label>
                <select
                  id="promptType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                  value={promptType}
                  onChange={e => setPromptType(e.target.value)}
                  required
                >
                  <option disabled selected>
                    Select a prompt type
                  </option>
                  <option value="text">Text</option>
                  <option value="code">Code</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              <div>
                <label htmlFor="model" className="block font-bold mb-2 text-lg">
                  💻 Model (e.g., GPT-3)
                </label>
                <input
                  type="text"
                  id="model"
                  placeholder="Enter model name (e.g., GPT-3)"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right-side File Upload and Submit Section */}
        <div className="order-3 md:order-3">
          <form onSubmit={handleSubmit}>
            {/* Prompt Section */}
            <div className="mb-6">
              <label htmlFor="prompt" className="block font-bold mb-2 text-lg">
                🎯 Enter Your Prompt
              </label>
              <textarea
                rows="6"
                id="prompt"
                placeholder="Enter the main prompt"
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                required
              />
            </div>

            {/* Example Response Section */}
            <div className="mb-6">
              <label
                htmlFor="exampleResponse"
                className="block font-bold mb-2 text-lg"
              >
                🔮 Example Response (Optional)
              </label>
              <textarea
                rows="5"
                id="exampleResponse"
                placeholder="Enter an example response"
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                value={exampleResponse}
                onChange={e => setExampleResponse(e.target.value)}
              />
            </div>

            {/* Media Upload Section */}
            <div className="mb-6 space-y-6 overflow-x-hidden">
              <div>
                <label className="block font-bold mb-2 text-lg">
                  🖼️ Upload Images (max 5)
                </label>
                <FileDropzone
                  fileUploadSVG={
                    <ImageUp className="mx-auto w-8 h-8 text-gray-100 " />
                  }
                  // fileUploadText="Click to upload or drag and drop images here. (SVG, PNG, JPG or GIF (MAX. 800x400px)"
                  // onFilesSelected={files => handleFileChange(files, 'images')}
                  fileUploadTextStyles="text-shadow border-gray-700 text-gray-100"
                  fileUploadText="Click to upload or drag and drop images here. (SVG, PNG, JPG or GIF, max 800x400px)"
                  fileUploadContainerSize="h-64 inline-block rounded-2xl cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                  onFilesSelected={files => handleFileChange(files, 'images')}
                />
              </div>
              {/* VIDEO NO NEED NOW */}

              {/* <div>
                <label className="block font-bold mb-2 text-lg">
                  📹 Upload Videos (max 2)
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
                {videos.length > 0 && (
                  <div>
                    <p className="mt-2">Selected Videos:</p>
                    <ul>
                      {videos.map((video, index) => (
                        <li key={index}>{video.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> */}

              {/* PDF NO NEED NOW */}

              {/* <div>
                <label className="block font-bold mb-2 text-lg">
                  📄 Upload PDFs (max 2)
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
                {pdfs.length > 0 && (
                  <div>
                    <p className="mt-2">Selected PDFs:</p>
                    <ul>
                      {pdfs.map((pdf, index) => (
                        <li key={index}>{pdf.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> */}
            </div>

            {/* Submit Section */}
            <div className="mb-6">
              {error && <ErrorThrower error={error} />}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Prompt'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePromptFormz;

//***************************************New Not Updated Form**************************************** */

// import React, { useState, useEffect, useRef } from 'react';
// import { usePromptStore } from '../../store/promptStore';
// import { useNavigate } from 'react-router-dom';
// import FileInputButton from '../global/FileInputButton';
// import ProgressBar from '../global/ProgressBar';
// import ErrorThrower from '../base/ErrorThrower';
// import Select from 'react-select';
// import toast from 'react-hot-toast';
// import Input from '../base/Input';
// import { ImageUp, PenBox, UploadIcon } from 'lucide-react';
// import PromptCard from './PromptCard';
// import FileDropzone from '../global/FileDropzone';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { useAuthStore } from '../../store/authStore';
// import {
//   humanRobotIMG1,
//   humanRobotIMG2,
//   humanRobotIMG3,
//   humanRobotIMG4,
// } from '../../assets/img/promptpage';

// const CreatePromptFormz = () => {
//   const { isLoading, error, createPrompt, categories, fetchCategories } =
//     usePromptStore();
//   const navigate = useNavigate();

//   const { user } = useAuthStore();
//   console.log('user: ', user);

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

//   const handleFileChange = (event, type) => {
//     const files = Array.from(event.target?.files || event);

//     switch (type) {
//       case 'images':
//         setImages(files.slice(0, 5)); // Limit to 5 images
//         break;
//       case 'videos':
//         setVideos(files.slice(0, 2)); // Limit to 2 videos
//         break;
//       case 'pdfs':
//         setPdfs(files.slice(0, 2)); // Limit to 2 PDFs
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async e => {
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

//     images.forEach(image => formData.append('images', image));
//     videos.forEach(video => formData.append('videos', video));
//     pdfs.forEach(pdf => formData.append('pdfs', pdf));

//     try {
//       await createPrompt(formData);

//       navigate('/explore');

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
//     } catch (error) {
//       console.error('Error creating prompt:', error);
//     }
//   };

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
//     <div className="min-h-screen text-gray-100 p-4 md:p-8">
//       {/* Tutorial Section */}
//       <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-8">
//         <h2 className="text-3xl font-semibold mb-4">
//           Welcome to Prompt Creator!
//         </h2>
//         <p className="text-lg mb-4">
//           ✨ <strong>Why create a prompt?</strong>
//           <br />
//           Creating prompts is a fun and powerful way to unleash your creativity
//           and get customized responses from AI. Whether you’re looking to
//           generate text, images, or other media, your prompt serves as the
//           gateway to amazing AI-generated content!
//         </p>
//         <p className="text-lg mb-4">
//           📚 <strong>How it works:</strong>
//           <br />
//           Simply fill out the form below with a clear and descriptive prompt.
//           Choose the type of content (text, images, videos, etc.), and we'll
//           generate unique outputs based on your instructions!
//         </p>
//         <p className="text-lg mb-4">
//           🎯 <strong>What you'll gain:</strong>
//           <br />
//           By creating a prompt, you’ll get tailored content for projects, ideas,
//           or inspiration—perfect for both personal and professional use!
//         </p>
//         <p className="text-lg mb-4">
//           🔧 <strong>Need help?</strong>
//           <br />
//           If you're unsure about any field, hover over the icons for more info!
//           We're here to help guide you every step of the way.
//         </p>
//         <p className="font-bold text-lg text-center text-blue-500">
//           Ready to create your first prompt? Let’s get started! 🎉
//         </p>
//       </div>
//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
//         {/* Preview Card */}
//         <div className="order-1 md:order-1">
//           <PromptCard
//             prompt={{
//               title: title || 'Untitled Prompt',
//               description: description || 'No description available',
//               promptType: promptType || 'text',
//               model: model || 'GPT-3.5',
//               createdAt: new Date(
//                 new Date().setDate(new Date().getDate() + 10)
//               ).toISOString(),
//               category: selectedCategory
//                 ? selectedCategory.label
//                 : newCategory || 'General',
//               tags: tags.split(',').map(tag => tag.trim()) || [],
//               media: {
//                 images:
//                   images.length > 0
//                     ? images
//                     : [
//                         humanRobotIMG1,
//                         humanRobotIMG2,
//                         humanRobotIMG4,
//                         humanRobotIMG3,
//                       ],
//               },
//               seller: {
//                 username: user?.username,
//                 name: user?.name || 'Anonymous',
//               },
//             }}
//           />
//         </div>

//         {/* Left-side Form Fields (Title, Description, Category, Tags) */}
//         <div className="order-2 md:order-2">
//           <form onSubmit={handleSubmit}>
//             {/* Title Section */}
//             <div className="mb-6">
//               <label htmlFor="title" className="block font-bold mb-2 text-lg">
//                 ✨ Create Your Prompt
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 placeholder="Enter a catchy title for your prompt"
//                 className="shadow bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//                 onChange={e => setTitle(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Description Section */}
//             <div className="mb-6">
//               <label
//                 htmlFor="description"
//                 className="block font-bold mb-2 text-lg"
//               >
//                 📝 Describe Your Prompt
//               </label>
//               <textarea
//                 id="description"
//                 placeholder="Enter a detailed description for your prompt"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={description}
//                 onChange={e => setDescription(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Category & Tags Section */}
//             <div className="mb-6 space-y-6">
//               <div>
//                 <label
//                   htmlFor="category"
//                   className="block font-bold mb-2 text-lg"
//                 >
//                   📂 Select Category
//                 </label>
//                 <Select
//                   id="category"
//                   styles={{
//                     control: base => ({
//                       ...base,
//                       backgroundColor: '#1f2937',
//                       borderColor: '#374151',
//                       color: '#5A626F',
//                     }),
//                     menu: base => ({
//                       ...base,
//                       backgroundColor: '#1f2937',
//                       borderColor: '#1f2937',
//                       color: '#5A626F',
//                     }),
//                     option: (provided, state) => ({
//                       ...provided,
//                       backgroundColor: state.isSelected ? '#1f2937' : '#1f2937',
//                       color: state.isSelected ? '#efefef' : '#fff',
//                     }),
//                   }}
//                   value={selectedCategory}
//                   onChange={setSelectedCategory}
//                   options={categories.map(category => ({
//                     value: category,
//                     label: category,
//                   }))}
//                   placeholder="Select or add a category"
//                   isClearable
//                 />
//               </div>

//               <div>
//                 <label htmlFor="tags" className="block font-bold mb-2 text-lg">
//                   🏷️ Add Tags
//                 </label>
//                 <input
//                   type="text"
//                   id="tags"
//                   placeholder="Enter tags (comma-separated)"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                   value={tags}
//                   onChange={e => setTags(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Prompt Type & Model Section */}
//             <div className="mb-6 space-y-6">
//               <div>
//                 <label
//                   htmlFor="promptType"
//                   className="block font-bold mb-2 text-lg"
//                 >
//                   🖋️ Choose Prompt Type
//                 </label>
//                 <select
//                   id="promptType"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                   value={promptType}
//                   onChange={e => setPromptType(e.target.value)}
//                   required
//                 >
//                   <option disabled selected>
//                     Select a prompt type
//                   </option>
//                   <option value="text">Text</option>
//                   <option value="code">Code</option>
//                   <option value="image">Image</option>
//                   <option value="video">Video</option>
//                   <option value="pdf">PDF</option>
//                   <option value="audio">Audio</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="model" className="block font-bold mb-2 text-lg">
//                   💻 Model (e.g., GPT-3)
//                 </label>
//                 <input
//                   type="text"
//                   id="model"
//                   placeholder="Enter model name (e.g., GPT-3)"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                   value={model}
//                   onChange={e => setModel(e.target.value)}
//                 />
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Right-side File Upload and Submit Section */}
//         <div className="order-3 md:order-3">
//           <form onSubmit={handleSubmit}>
//             {/* Prompt Section */}
//             <div className="mb-6">
//               <label htmlFor="prompt" className="block font-bold mb-2 text-lg">
//                 🎯 Enter Your Prompt
//               </label>
//               <textarea
//                 id="prompt"
//                 placeholder="Enter the main prompt content"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={prompt}
//                 onChange={e => setPrompt(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Example Response Section */}
//             <div className="mb-6">
//               <label
//                 htmlFor="exampleResponse"
//                 className="block font-bold mb-2 text-lg"
//               >
//                 🔮 Example Response (Optional)
//               </label>
//               <textarea
//                 id="exampleResponse"
//                 placeholder="Enter an example response"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={exampleResponse}
//                 onChange={e => setExampleResponse(e.target.value)}
//               />
//             </div>

//             {/* Media Upload Section */}
//             <div className="mb-6 space-y-6">
//               <div>
//                 <label className="block font-bold mb-2 text-lg">
//                   🖼️ Upload Images (max 5)
//                 </label>
//                 <FileDropzone
//                   fileUploadSVG={
//                     <ImageUp className="mx-auto w-8 h-8 text-gray-100 " />
//                   }
//                   fileUploadText="Click to upload or drag and drop images here. (SVG, PNG, JPG or GIF, max 800x400px)"
//                   onFilesSelected={files => handleFileChange(files, 'images')}
//                 />
//               </div>

//               <div>
//                 <label className="block font-bold mb-2 text-lg">
//                   📹 Upload Videos (max 2)
//                 </label>
//                 <input
//                   type="file"
//                   ref={videoInputRef}
//                   accept="video/*"
//                   multiple
//                   className="hidden"
//                   onChange={e => handleFileChange(e, 'videos')}
//                 />
//                 <button
//                   onClick={handleVideoUploadClick}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
//                   disabled={isLoading}
//                   type="button"
//                 >
//                   <span>Choose Videos</span>
//                 </button>
//                 {videos.length > 0 && (
//                   <div>
//                     <p className="mt-2">Selected Videos:</p>
//                     <ul>
//                       {videos.map((video, index) => (
//                         <li key={index}>{video.name}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block font-bold mb-2 text-lg">
//                   📄 Upload PDFs (max 2)
//                 </label>
//                 <input
//                   type="file"
//                   ref={pdfInputRef}
//                   accept=".pdf"
//                   multiple
//                   className="hidden"
//                   onChange={e => handleFileChange(e, 'pdfs')}
//                 />
//                 <button
//                   onClick={handlePdfUploadClick}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
//                   disabled={isLoading}
//                   type="button"
//                 >
//                   <span>Choose PDFs</span>
//                 </button>
//                 {pdfs.length > 0 && (
//                   <div>
//                     <p className="mt-2">Selected PDFs:</p>
//                     <ul>
//                       {pdfs.map((pdf, index) => (
//                         <li key={index}>{pdf.name}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Section */}
//             <div className="mb-6">
//               {error && <ErrorThrower error={error} />}
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Creating...' : 'Create Prompt'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePromptFormz;

//***********************************************Old Form **************************************** */

// import React, { useState, useEffect, useRef } from 'react';
// import { usePromptStore } from '../../store/promptStore';
// import { useNavigate } from 'react-router-dom';
// import FileInputButton from '../global/FileInputButton';
// import ProgressBar from '../global/ProgressBar';
// import ErrorThrower from '../base/ErrorThrower';
// import Select from 'react-select';
// import toast from 'react-hot-toast';
// import Input from '../base/Input';
// import { ImageUp, PenBox, UploadIcon } from 'lucide-react';
// import PromptCard from './PromptCard';
// import FileDropzone from '../global/FileDropzone';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { useAuthStore } from '../../store/authStore';
// import {
//   humanRobotIMG1,
//   humanRobotIMG2,
//   humanRobotIMG3,
//   humanRobotIMG4,
// } from '../../assets/img/promptpage';

// const CreatePromptFormz = () => {
//   const { isLoading, error, createPrompt, categories, fetchCategories } =
//     usePromptStore();
//   const navigate = useNavigate();

//   const { user } = useAuthStore();
//   console.log('user: ', user);

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

//   const handleFileChange = (event, type) => {
//     const files = Array.from(event.target?.files || event);

//     switch (type) {
//       case 'images':
//         setImages(files.slice(0, 5)); // Limit to 5 images
//         break;
//       case 'videos':
//         setVideos(files.slice(0, 2)); // Limit to 2 videos
//         break;
//       case 'pdfs':
//         setPdfs(files.slice(0, 2)); // Limit to 2 PDFs
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = async e => {
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

//     images.forEach(image => formData.append('images', image));
//     videos.forEach(video => formData.append('videos', video));
//     pdfs.forEach(pdf => formData.append('pdfs', pdf));

//     try {
//       await createPrompt(formData);

//       navigate('/explore');

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
//     } catch (error) {
//       console.error('Error creating prompt:', error);
//     }
//   };

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
//     <div className="min-h-screen text-gray-100 p-4 md:p-8">
//       <div className="max-w-5xl  mx-auto grid md:grid-cols-[1fr,2fr] gap-8">
//         {/* Preview Card */}
//         <div className="order-1 md:order-1">
//           <PromptCard
//             prompt={{
//               title: title || 'Untitled Prompt',
//               description: description || 'No description available',
//               promptType: promptType || 'text',
//               model: model || 'GPT-3.5',
//               createdAt: new Date(
//                 new Date().setDate(new Date().getDate() + 10)
//               ).toISOString(),
//               category: selectedCategory
//                 ? selectedCategory.label
//                 : newCategory || 'General',
//               tags: tags.split(',').map(tag => tag.trim()) || [], // Splits tags by commas
//               media: {
//                 images:
//                   images.length > 0
//                     ? images
//                     : [
//                         humanRobotIMG1,
//                         humanRobotIMG2,
//                         humanRobotIMG4,
//                         humanRobotIMG3,
//                       ],
//               }, // Hardcoded URLs as fallback
//               seller: {
//                 username: user?.username,
//                 name: user?.name || 'Anonymous',
//               },
//             }}
//           />
//         </div>

//         {/* Upload Form */}
//         <div className="order-1 md:order-2">
//           <form onSubmit={handleSubmit}>
//             {/* Title Input */}
//             <div className="mb-4">
//               <label htmlFor="title" className="block font-bold mb-2">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 placeholder="Enter a title for your prompt"
//                 className="shadow bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//                 onChange={e => setTitle(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Description Input */}
//             <div className="mb-4">
//               <label htmlFor="description" className="block  font-bold mb-2">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 placeholder="Enter a description for your prompt"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={description}
//                 onChange={e => setDescription(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Price Input */}
//             <div className="mb-4 hidden">
//               <label htmlFor="price" className="block  font-bold mb-2">
//                 Price (USD)
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={price}
//                 placeholder="Enter a price for your prompt"
//                 onChange={e => setPrice(e.target.value)}
//                 required
//                 min="0"
//               />
//             </div>

//             {/* Prompt Type Select */}
//             <div className="mb-4">
//               <label htmlFor="promptType" className="block font-bold mb-2">
//                 Prompt Type
//               </label>
//               <select
//                 id="promptType"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={promptType}
//                 onChange={e => setPromptType(e.target.value)}
//                 required
//               >
//                 <option disabled selected defaultChecked>
//                   Select a prompt type
//                 </option>
//                 <option value="text">Text</option>
//                 <option value="code">Code</option>
//                 <option value="image">Image</option>
//                 <option value="video">Video</option>
//                 <option value="pdf">PDF</option>
//                 <option value="audio">Audio</option>
//               </select>
//             </div>

//             {/* Prompt Input */}
//             <div className="mb-4">
//               <label htmlFor="prompt" className="block font-bold mb-2">
//                 Prompt
//               </label>
//               <textarea
//                 id="prompt"
//                 placeholder="Enter your prompt"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={prompt}
//                 onChange={e => setPrompt(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Category Selection and New Category Input */}
//             <div className="mb-4">
//               <label htmlFor="category" className="block font-bold mb-2">
//                 Category
//               </label>
//               <Select
//                 id="category"
//                 styles={{
//                   control: base => ({
//                     ...base,
//                     backgroundColor: '#1f2937', // Tailwind color gray-800
//                     borderColor: '#374151',
//                     color: '#5A626F',
//                   }),
//                   menu: base => ({
//                     ...base,
//                     backgroundColor: '#1f2937',
//                     borderColor: '#1f2937',
//                     color: '#5A626F',
//                   }),
//                   option: (provided, state) => ({
//                     ...provided,
//                     backgroundColor: state.isSelected ? '#1f2937' : '#1f2937',
//                     color: state.isSelected ? '#efefef' : '#fff',
//                     borderColor: state.isSelected ? '#1f2937' : '#1f2937',
//                   }),
//                   input: base => ({
//                     ...base,
//                     color: '#5A626F',
//                   }),
//                   placeholder: base => ({
//                     ...base,
//                     color: '#fff',
//                   }),
//                   singleValue: base => ({
//                     ...base,
//                     color: '#fff', // Ensures the selected value is white
//                   }),
//                 }}
//                 value={selectedCategory}
//                 onChange={setSelectedCategory}
//                 options={categories.map(category => ({
//                   value: category,
//                   label: category,
//                 }))}
//                 placeholder="Select a category"
//                 isClearable
//               />

//               {/* Input for adding a new category */}
//               <input
//                 type="text"
//                 id="newCategory"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline mt-2"
//                 placeholder="Add a new category"
//                 value={newCategory}
//                 onChange={e => setNewCategory(e.target.value)}
//               />
//             </div>

//             {/* Tags Input */}
//             <div className="mb-4">
//               <label htmlFor="tags" className="block  font-bold mb-2">
//                 Tags (comma-separated)
//               </label>
//               <input
//                 type="text"
//                 id="tags"
//                 placeholder="Enter tags (comma-separated)"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={tags}
//                 onChange={e => setTags(e.target.value)}
//               />
//             </div>

//             {/* Model Input */}
//             <div className="mb-4">
//               <label htmlFor="model" className="block font-bold mb-2">
//                 Model (e.g., GPT-3)
//               </label>
//               <input
//                 type="text"
//                 id="model"
//                 placeholder="Enter a model (e.g., GPT-3)"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={model}
//                 onChange={e => setModel(e.target.value)}
//               />
//             </div>

//             {/* Example Response Input */}
//             <div className="mb-4">
//               <label
//                 htmlFor="exampleResponse"
//                 className="block  font-bold mb-2"
//               >
//                 Example Response (Optional)
//               </label>
//               <textarea
//                 id="exampleResponse"
//                 placeholder="Enter an example response"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
//                 value={exampleResponse}
//                 onChange={e => setExampleResponse(e.target.value)}
//               />
//             </div>

//             {/* File Input Sections */}
//             <div className="mb-4">
//               <label className="block  font-bold mb-2">Images (max 5)</label>
//               <FileDropzone
//                 fileUploadSVG={
//                   <ImageUp className="mx-auto w-8 h-8 text-gray-100 " />
//                 }
//                 fileUploadTextStyles="text-shadow border-gray-700 text-gray-100"
//                 fileUploadContainerSize="h-64 md:w-96 inline-block rounded-2xl cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
//                 fileUploadText="Click to upload or drag and drop images here. (SVG, PNG, JPG or GIF (MAX. 800x400px)"
//                 onFilesSelected={files => handleFileChange(files, 'images')}
//               />
//             </div>

//             {/* Video Input Section */}
//             <div className="mb-4">
//               <label className="block  font-bold mb-2">Videos (max 2)</label>
//               <input
//                 type="file"
//                 ref={videoInputRef}
//                 accept="video/*"
//                 multiple
//                 className="hidden"
//                 onChange={e => handleFileChange(e, 'videos')}
//               />
//               <button
//                 onClick={handleVideoUploadClick}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
//                 disabled={isLoading}
//                 type="button"
//               >
//                 <span>Choose Videos</span>
//               </button>

//               {videos.length > 0 && ( // Display selected video names
//                 <div>
//                   <p className="mt-2">Selected Videos:</p>
//                   <ul>
//                     {videos.map((video, index) => (
//                       <li key={index}>{video.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* PDF Input Section */}
//             <div className="mb-4">
//               <label className="block  font-bold mb-2">PDFs (max 2)</label>
//               <input
//                 type="file"
//                 ref={pdfInputRef}
//                 accept=".pdf"
//                 multiple
//                 className="hidden"
//                 onChange={e => handleFileChange(e, 'pdfs')}
//               />
//               <button
//                 onClick={handlePdfUploadClick}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
//                 disabled={isLoading}
//                 type="button"
//               >
//                 <span>Choose PDFs</span>
//               </button>

//               {pdfs.length > 0 && ( // Display selected PDF names
//                 <div>
//                   <p className="mt-2">Selected PDFs:</p>
//                   <ul>
//                     {pdfs.map((pdf, index) => (
//                       <li key={index}>{pdf.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Error Message */}
//             {error && <ErrorThrower error={error} />}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Creating...' : 'Create Prompt'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePromptFormz;
