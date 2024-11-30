import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import PromptCard from '../../components/prompt/PromptCard';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaDollarSign,
  FaTags,
  FaCalendarAlt,
  FaTimes,
} from 'react-icons/fa';
import LoadingSpinner from '../animations/loader/LoadingSpinner';
import { BorderTrail } from '../framer-motion/animations/BorderTrail';
import { Input } from '../base/Input';

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);
  console.log('prompts: ', prompts);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);

  // Filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [model, setModel] = useState('');
  const [hasExampleResponse, setHasExampleResponse] = useState(false);
  const [updatedAfter, setUpdatedAfter] = useState('');
  const [updatedBefore, setUpdatedBefore] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced fetching of prompts based on filters
  const fetchPrompts = useCallback(
    debounce(async () => {
      const queryParams = {};
      if (minPrice) queryParams.minPrice = minPrice;
      if (maxPrice) queryParams.maxPrice = maxPrice;
      if (category) queryParams.category = category;
      if (selectedTags.length > 0)
        queryParams.tags = selectedTags.map(tag => tag.value);
      if (model) queryParams.model = model;
      if (hasExampleResponse) queryParams.features = 'exampleResponse';
      if (updatedAfter) queryParams.updatedAfter = updatedAfter;
      if (updatedBefore) queryParams.updatedBefore = updatedBefore;
      if (searchQuery) queryParams.search = searchQuery;

      try {
        const response = await axiosInstance.get(
          `/prompt/all?${new URLSearchParams(queryParams).toString()}`
        );
        setPrompts(response.data.data.prompts);
        setFilteredCount(response.data.data.prompts.length);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching prompts:', error);
        toast.error(error.response.data.message || 'Error fetching prompts.');
        setIsLoading(false);
      }
    }, 300),
    [
      minPrice,
      maxPrice,
      category,
      selectedTags,
      model,
      hasExampleResponse,
      updatedAfter,
      updatedBefore,
      searchQuery,
    ]
  );

  useEffect(() => {
    fetchPrompts();
    return fetchPrompts.cancel;
  }, [fetchPrompts]);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoryResponse = await axiosInstance.get('/prompt/categories');
        setCategories(categoryResponse.data.data);

        const allPromptsResponse = await axiosInstance.get('/prompt/all');
        const allTags = [
          ...new Set(
            allPromptsResponse.data.data.prompts.flatMap(prompt => prompt.tags)
          ),
        ];
        setAllTags(allTags);
      } catch (error) {
        console.error('Error fetching categories/tags:', error);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setCategory('');
    setSelectedTags([]);
    setModel('');
    setHasExampleResponse(false);
    setUpdatedAfter('');
    setUpdatedBefore('');
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      // create a loading skeleton
      <section className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 w-full">
          <div className="bg-gradient-to-b from-slate-700 to-slate-500 overflow-hidden shadow-lg rounded-lg w-full ring-0 animate-pulse ring-cyber-blue max-w-xs">
            <div className="relative overflow-hidden rounded-xl p-[2px] backdrop-blur-3xl transition-all">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

              <div className="relative bg-[#1E293B] rounded-xl overflow-hidden font-space-grotesk">
                <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-tl-xl">
                  {/* Placeholder for CollageImages */}
                  <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-tl-xl" />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4B5563]/80 backdrop-blur-sm text-xs text-gray-400 font-medium animate-pulse">
                      Loading...
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <span className="animate-pulse text-xs text-gray-500">
                      Loading...
                    </span>
                  </div>
                </div>

                <div className="p-4 shadow-inner space-y-2">
                  <div className="flex items-center mb-2">
                    {/* Skeleton for title */}
                    <div className="h-6 bg-gray-600 rounded w-3/4 animate-pulse" />
                  </div>

                  {/* Skeleton for description */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse"></div>
                  </div>

                  <div className="text-sm text-[#9CA3AF] font-jetbrains-mono mb-4 space-y-1">
                    <div>
                      {/* Skeleton for category */}
                      <div className="h-4 bg-gray-600 rounded w-1/3 animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                      {/* Skeleton for rating */}
                      <div className="h-4 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {/* Skeleton for tags */}
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-slate-700 to-slate-500 overflow-hidden shadow-lg rounded-lg w-full ring-0 animate-pulse ring-cyber-blue max-w-xs">
            <div className="relative overflow-hidden rounded-xl p-[2px] backdrop-blur-3xl transition-all">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

              <div className="relative bg-[#1E293B] rounded-xl overflow-hidden font-space-grotesk">
                <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-tl-xl">
                  {/* Placeholder for CollageImages */}
                  <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-tl-xl" />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4B5563]/80 backdrop-blur-sm text-xs text-gray-400 font-medium animate-pulse">
                      Loading...
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <span className="animate-pulse text-xs text-gray-500">
                      Loading...
                    </span>
                  </div>
                </div>

                <div className="p-4 shadow-inner space-y-2">
                  <div className="flex items-center mb-2">
                    {/* Skeleton for title */}
                    <div className="h-6 bg-gray-600 rounded w-3/4 animate-pulse" />
                  </div>

                  {/* Skeleton for description */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse"></div>
                  </div>

                  <div className="text-sm text-[#9CA3AF] font-jetbrains-mono mb-4 space-y-1">
                    <div>
                      {/* Skeleton for category */}
                      <div className="h-4 bg-gray-600 rounded w-1/3 animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                      {/* Skeleton for rating */}
                      <div className="h-4 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {/* Skeleton for tags */}
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-slate-700 to-slate-500 overflow-hidden shadow-lg rounded-lg w-full ring-0 animate-pulse ring-cyber-blue max-w-xs">
            <div className="relative overflow-hidden rounded-xl p-[2px] backdrop-blur-3xl transition-all">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

              <div className="relative bg-[#1E293B] rounded-xl overflow-hidden font-space-grotesk">
                <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-tl-xl">
                  {/* Placeholder for CollageImages */}
                  <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-tl-xl" />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4B5563]/80 backdrop-blur-sm text-xs text-gray-400 font-medium animate-pulse">
                      Loading...
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2">
                    <span className="animate-pulse text-xs text-gray-500">
                      Loading...
                    </span>
                  </div>
                </div>

                <div className="p-4 shadow-inner space-y-2">
                  <div className="flex items-center mb-2">
                    {/* Skeleton for title */}
                    <div className="h-6 bg-gray-600 rounded w-3/4 animate-pulse" />
                  </div>

                  {/* Skeleton for description */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse"></div>
                  </div>

                  <div className="text-sm text-[#9CA3AF] font-jetbrains-mono mb-4 space-y-1">
                    <div>
                      {/* Skeleton for category */}
                      <div className="h-4 bg-gray-600 rounded w-1/3 animate-pulse"></div>
                    </div>
                    <div className="flex items-center">
                      {/* Skeleton for rating */}
                      <div className="h-4 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {/* Skeleton for tags */}
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.div className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-200 text-shadow mb-6">
        AI Prompts ({filteredCount} results)
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Section */}

        <motion.div
          className="bg-gradient-to-b from-slate-900 to-slate-700 overflow-hidden shadow-lg rounded-lg p-6 lg:p-8 w-full lg:max-w-xs ring-0 ring-cyber-blue max-w-lg mx-auto static lg:sticky top-24 max-h-min"
          // className="bg-gradient-to-b from-slate-900 to-slate-700 shadow-lg rounded-lg p-6 lg:p-8 w-full lg:max-w-xs sticky top-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BorderTrail
            size={10000}
            color="rgba(255, 255, 255, 0.5)"
            delay={0}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
            <FaFilter className="mr-2" /> Filter Prompts
          </h2>
          <button
            onClick={clearFilters}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 mb-6 shadow transition duration-300 flex items-center justify-center"
          >
            <FaTimes className="mr-2" /> Clear All Filters
          </button>

          {/* Search Bar */}
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-white font-semibold mb-2 flex items-center"
            >
              Search
            </label>
            <Input
              icon={FaSearch}
              type="text"
              classNamesForInputTag="pl-10 ring-1 ring-gray-600 w-full"
              id="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search prompts..."
            />
          </div>

          {/* Tags Filter */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Tags</label>
            <Select
              isMulti
              options={allTags.map(tag => ({ value: tag, label: tag }))}
              styles={{
                control: base => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '0.25rem',
                  boxShadow: 'none',
                }),
              }}
              value={selectedTags}
              onChange={setSelectedTags}
              placeholder="Select tags"
              className="text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Category
            </label>
            <select
              className="block w-full ring-1 ring-gray-600 text-dark-text rounded-md border bg-dark-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyber-blue"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Model Filter */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Model</label>
            <Input
              icon={FaSearch}
              type="text"
              placeholder="Enter model"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </div>

          {/* Date Range Filters */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Updated After
            </label>
            <input
              type="date"
              className="block w-full ring-1 ring-gray-600 text-dark-text rounded-md bg-dark-background px-3 py-2 focus:outline-none focus:ring-cyber-blue"
              value={updatedAfter}
              onChange={e => setUpdatedAfter(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">
              Updated Before
            </label>
            <input
              type="date"
              className="block w-full ring-1 ring-gray-600 text-dark-text rounded-md bg-dark-background px-3 py-2 focus:outline-none focus:ring-cyber-blue"
              value={updatedBefore}
              onChange={e => setUpdatedBefore(e.target.value)}
            />
          </div>

          {/* Additional Features */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={hasExampleResponse}
              onChange={() => setHasExampleResponse(!hasExampleResponse)}
            />
            <label className="text-white font-semibold">
              Has Example Response
            </label>
          </div>
        </motion.div>

        {/* Prompt Cards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {prompts.length > 0 ? (
            prompts.map(prompt => (
              <div key={prompt._id} className="w-full">
                <Link to={`/prompt/${prompt._id}`}>
                  <PromptCard prompt={prompt} />
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No prompts found. Adjust your filters.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PromptList;

// import React, { useEffect, useState, useCallback } from 'react';
// import axiosInstance from '../../services/axiosInstance';
// import { Link } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
// import PromptCard from '../../components/prompt/PromptCard';
// import toast from 'react-hot-toast';
// import Select from 'react-select';
// import { debounce } from 'lodash';
// import { motion } from 'framer-motion';
// import {
//   FaSearch,
//   FaFilter,
//   FaDollarSign,
//   FaTags,
//   FaCalendarAlt,
//   FaTimes,
// } from 'react-icons/fa';
// import LoadingSpinner from '../animations/loader/LoadingSpinner';
// import { BorderTrail } from '../framer-motion/animations/BorderTrail';
// import { Input } from '../base/Input';

// const PromptList = () => {
//   const [prompts, setPrompts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [categories, setCategories] = useState([]);
//   const [allTags, setAllTags] = useState([]);
//   const [filteredCount, setFilteredCount] = useState(0);

//   // Filter states
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [model, setModel] = useState('');
//   const [hasExampleResponse, setHasExampleResponse] = useState(false);
//   const [updatedAfter, setUpdatedAfter] = useState('');
//   const [updatedBefore, setUpdatedBefore] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Debounced fetching of prompts based on filters
//   const fetchPrompts = useCallback(
//     debounce(async () => {
//       const queryParams = {};
//       if (minPrice) queryParams.minPrice = minPrice;
//       if (maxPrice) queryParams.maxPrice = maxPrice;
//       if (category) queryParams.category = category;
//       if (selectedTags.length > 0)
//         queryParams.tags = selectedTags.map(tag => tag.value);
//       if (model) queryParams.model = model;
//       if (hasExampleResponse) queryParams.features = 'exampleResponse';
//       if (updatedAfter) queryParams.updatedAfter = updatedAfter;
//       if (updatedBefore) queryParams.updatedBefore = updatedBefore;
//       if (searchQuery) queryParams.search = searchQuery;

//       try {
//         const response = await axiosInstance.get(
//           `/prompt/all?${new URLSearchParams(queryParams).toString()}`
//         );
//         setPrompts(response.data.data.prompts);
//         setFilteredCount(response.data.data.prompts.length);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching prompts:', error);
//         toast.error(error.response.data.message || 'Error fetching prompts.');
//         setIsLoading(false);
//       }
//     }, 300),
//     [
//       minPrice,
//       maxPrice,
//       category,
//       selectedTags,
//       model,
//       hasExampleResponse,
//       updatedAfter,
//       updatedBefore,
//       searchQuery,
//     ]
//   );

//   useEffect(() => {
//     fetchPrompts();
//     return fetchPrompts.cancel;
//   }, [fetchPrompts]);

//   useEffect(() => {
//     const fetchCategoriesAndTags = async () => {
//       try {
//         const categoryResponse = await axiosInstance.get('/prompt/categories');
//         setCategories(categoryResponse.data.data);

//         const allPromptsResponse = await axiosInstance.get('/prompt/all');
//         const allTags = [
//           ...new Set(
//             allPromptsResponse.data.data.prompts.flatMap(prompt => prompt.tags)
//           ),
//         ];
//         setAllTags(allTags);
//       } catch (error) {
//         console.error('Error fetching categories/tags:', error);
//       }
//     };
//     fetchCategoriesAndTags();
//   }, []);

//   const clearFilters = () => {
//     setMinPrice('');
//     setMaxPrice('');
//     setCategory('');
//     setSelectedTags([]);
//     setModel('');
//     setHasExampleResponse(false);
//     setUpdatedAfter('');
//     setUpdatedBefore('');
//     setSearchQuery('');
//   };

//   if (isLoading) {
//     return (
//       // create a loading skeleton
//       <section className="container mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
//           <div className="bg-gradient-to-b h-screen from-slate-900 to-slate-700 overflow-hidden shadow-lg rounded-lg p-8 w-full ring-0 animate-pulse ring-cyber-blue max-w-xs"></div>
//           <div className="bg-gradient-to-b h-screen from-slate-900 to-slate-700 overflow-hidden shadow-lg rounded-lg p-8 w-full ring-0 animate-pulse ring-cyber-blue max-w-xs "></div>
//           <div className="bg-gradient-to-b h-screen from-slate-900 to-slate-700 overflow-hidden shadow-lg rounded-lg p-8 w-full ring-0 animate-pulse ring-cyber-blue max-w-xs"></div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <motion.div className="container mx-auto px-4 md:px-8 py-8">
//       <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-200 text-shadow mb-6">
//         AI Prompts ({filteredCount} results)
//       </h1>
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Filter Section */}

//         <motion.div
//           className="bg-gradient-to-b from-slate-900 to-slate-700 overflow-hidden shadow-lg rounded-lg p-6 lg:p-8 w-full lg:max-w-xs ring-0 ring-cyber-blue max-w-lg mx-auto static lg:sticky top-24 max-h-min"
//           // className="bg-gradient-to-b from-slate-900 to-slate-700 shadow-lg rounded-lg p-6 lg:p-8 w-full lg:max-w-xs sticky top-24"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <BorderTrail
//             size={10000}
//             color="rgba(255, 255, 255, 0.5)"
//             delay={0}
//             style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
//           />
//           <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
//             <FaFilter className="mr-2" /> Filter Prompts
//           </h2>
//           <button
//             onClick={clearFilters}
//             className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 mb-6 shadow transition duration-300 flex items-center justify-center"
//           >
//             <FaTimes className="mr-2" /> Clear All Filters
//           </button>

//           {/* Search Bar */}
//           <div className="mb-4">
//             <label
//               htmlFor="search"
//               className="block text-white font-semibold mb-2 flex items-center"
//             >
//               Search
//             </label>
//             <Input
//               icon={FaSearch}
//               type="text"
//               classNamesForInputTag="pl-10 ring-1 ring-gray-600 w-full"
//               id="search"
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               placeholder="Search prompts..."
//             />
//           </div>

//           {/* Tags Filter */}
//           <div className="mb-4">
//             <label className="block text-white font-semibold mb-2">Tags</label>
//             <Select
//               isMulti
//               options={allTags.map(tag => ({ value: tag, label: tag }))}
//               styles={{
//                 control: base => ({
//                   ...base,
//                   backgroundColor: 'transparent',
//                   borderColor: 'rgba(255, 255, 255, 0.5)',
//                   borderRadius: '0.25rem',
//                   boxShadow: 'none',
//                 }),
//               }}
//               value={selectedTags}
//               onChange={setSelectedTags}
//               placeholder="Select tags"
//               className="text-sm"
//             />
//           </div>

//           {/* Category Filter */}
//           <div className="mb-4">
//             <label className="block text-white font-semibold mb-2">
//               Category
//             </label>
//             <select
//               className="block w-full ring-1 ring-gray-600 text-dark-text rounded-md border bg-dark-background px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyber-blue"
//               value={category}
//               onChange={e => setCategory(e.target.value)}
//             >
//               <option value="">All Categories</option>
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Model Filter */}
//           <div className="mb-4">
//             <label className="block text-white font-semibold mb-2">Model</label>
//             <Input
//               icon={FaSearch}
//               type="text"
//               placeholder="Enter model"
//               value={model}
//               onChange={e => setModel(e.target.value)}
//             />
//           </div>

//           {/* Date Range Filters */}
//           <div className="mb-4">
//             <label className="block text-white font-semibold mb-2">
//               Updated After
//             </label>
//             <input
//               type="date"
//               className="block w-full ring-1 ring-gray-600 text-dark-text rounded-md bg-dark-background px-3 py-2 focus:outline-none focus:ring-cyber-blue"
//               value={updatedAfter}
//               onChange={e => setUpdatedAfter(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white font-semibold mb-2">
//               Updated Before
//             </label>
//             <input
//               type="date"
//               className="block w-full ring-1 ring-gray-600 text-dark-text rounded-md bg-dark-background px-3 py-2 focus:outline-none focus:ring-cyber-blue"
//               value={updatedBefore}
//               onChange={e => setUpdatedBefore(e.target.value)}
//             />
//           </div>

//           {/* Additional Features */}
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               className="mr-2"
//               checked={hasExampleResponse}
//               onChange={() => setHasExampleResponse(!hasExampleResponse)}
//             />
//             <label className="text-white font-semibold">
//               Has Example Response
//             </label>
//           </div>
//         </motion.div>

//         {/* Prompt Cards Section */}
//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {prompts.length > 0 ? (
//             prompts.map(prompt => (
//               <div key={prompt._id} className="w-full">
//                 <Link to={`/prompt/${prompt._id}`}>
//                   <PromptCard prompt={prompt} />
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-500">
//               No prompts found. Adjust your filters.
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default PromptList;