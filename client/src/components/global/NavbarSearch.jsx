import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import axiosInstance from '../../services/axiosInstance';
import PromptCard from '../prompt/PromptCard';
import { searchSquare } from '../../assets/img/common';
import { humanRobotIMG1 } from '../../assets/img/promptpage';
import { Link } from 'react-router-dom';

const NavbarSearch = () => {
  const [inputWidth, setInputWidth] = useState('w-12');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = () => {
    setInputWidth('w-64');
  };

  const handleBlur = e => {
    if (e.target.value === '') {
      setInputWidth('w-12');
    }
  };

  // Debounced search function
  const fetchSearchResults = debounce(async searchQuery => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const queryParams = { search: searchQuery }; // Customize query params as needed
      const response = await axiosInstance.get(
        `/prompt/all?${new URLSearchParams(queryParams).toString()}`
      );
      console.log('Search results:', response.data);
      setResults(response.data.data.prompts || []); // Assuming response contains an array of results
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300); // 300ms debounce time

  const handleSearch = event => {
    const searchValue = event.target.value;
    setQuery(searchValue);
    fetchSearchResults(searchValue);
  };

  console.log('results: ', results);

  return (
    <div className="relative z-[-1]">
      <input
        type="text"
        className={`glassEffect placeholder:text-white text-white h-8 ring-1 ring-gray-300 focus:ring-gray-400 py-1 px-5  rounded-full text-sm focus:outline-none transition-all duration-slow ease-in-out xl:w-[500px] ${inputWidth}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <button
        aria-label="Search"
        title="Search"
        onClick={() => setInputWidth('w-64')}
        type="button"
        className="absolute right-0 top-0 mt-2 mr-4"
      >
        {/* <svg
          fill="#ffffff"
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg> */}
        <img
          src={searchSquare}
          alt="Search Icon"
          className="size-4 opacity-85 scale-125"
        />
      </button>
      {isLoading && (
        <>
          <div className="flex md:flex-row w-full flex-col m-1 glass-panel py-2 md:p-0 gap-1 sm:gap-3 border border-gray-100 border-dashed rounded overflow-hidden items-center justify-center md:justify-start animate-pulse">
            {/* Image Skeleton */}
            <div className="relative w-32 h-32 flex-shrink-0 bg-gray-300 rounded-md"></div>

            {/* Text Skeleton */}
            <div className="flex flex-col md:text-start text-center gap-2 py-1 w-full">
              <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
            </div>
          </div>
        </>
      )}
      {query.trim() &&
        results.length > 0 && ( // Only show results when query is not empty
          <div
            onWheel={e => {
              e.stopPropagation();
            }}
            className="absolute w-full left-0 right-0 mt-2 bg-slate-800 mockupScroll shadow-md rounded-md overflow-hidden z-10 max-h-60 overflow-y-auto"
          >
            {results.map(prompt => (
              <div key={prompt._id} className="flex md:flex-row my-2 flex-col m-1 glass-panel py-2 md:p-0 gap-1 sm:gap-3 border border-gray-100 border-dashed rounded overflow-hidden items-center justify-center md:justify-start">
                <div className="relative w-32 h-32 flex-shrink-0">
                  {prompt.media.images.length ? (
                    <img
                      className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                      loading="lazy"
                      src={prompt.media.images[0]}
                      alt="Post Thumbnail"
                    />
                  ) : (
                    <img
                      className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                      loading="lazy"
                      src={humanRobotIMG1}
                      alt="Post Thumbnail"
                    />
                  )}
                </div>
                <div className="flex flex-col md:text-start text-center gap-1 py-1">
                  <p className="text-xl text-gray-200 font-bold">
                    {prompt.title.length > 20
                      ? `${prompt.title.slice(0, 20)}...`
                      : prompt.title}
                  </p>
                  <p className="text-gray-400">
                    {prompt.description.length > 50
                      ? `${prompt.description.slice(0, 50)}...`
                      : prompt.description}
                  </p>
                  <span className="text-gray-500">
                    {
                      <Link
                        to={`/prompt/${prompt._id}`}
                        className="badge inline-block  bg-purple-500 text-white"
                      >
                        view prompt
                      </Link>
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default NavbarSearch;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { debounce } from 'lodash';
// import axiosInstance from '../../services/axiosInstance';
// import PromptCard from '../prompt/PromptCard';

// const NavbarSearch = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Debounced search function
//   const fetchSearchResults = debounce(async searchQuery => {
//     if (!searchQuery.trim()) {
//       setResults([]);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const queryParams = { search: searchQuery }; // Customize query params as needed
//       const response = await axiosInstance.get(
//         `/prompt/all?${new URLSearchParams(queryParams).toString()}`
//       );
//       console.log('Search results:', response.data);
//       setResults(response.data.data.prompts || []); // Assuming response contains an array of results
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, 300); // 300ms debounce time

//   const handleSearch = event => {
//     const searchValue = event.target.value;
//     setQuery(searchValue);
//     fetchSearchResults(searchValue);
//   };

//   console.log('results: ', results);

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={handleSearch}
//         className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       {isLoading && (
//         <div className="absolute mt-2 text-sm text-gray-500">Loading...</div>
//       )}
//       {results.length > 0 && (
//         <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-md overflow-hidden z-10 max-h-60 overflow-y-auto">
//           {results.map((prompt) => (
//             <PromptCard key={prompt._id} prompt={prompt} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavbarSearch;
