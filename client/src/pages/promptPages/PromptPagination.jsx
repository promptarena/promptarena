// src/components/prompts/PromptPagination.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import PromptCard from '../../components/prompt/PromptCard';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Footer from '../../components/global/Footer';

const PromptPagination = () => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of prompts per page

  // Fetch prompts
  const fetchPrompts = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get('/prompt/all');
      setPrompts(response.data.data.prompts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast.error(error.response?.data?.message || 'Error fetching prompts');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // Calculate the prompts to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPrompts = prompts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(prompts.length / pageSize);

  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-2">
        <h1 className="h1 font-bold text-white mb-4">Prompt List</h1>

        {/* Prompt Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-700 h-[300px] rounded-md p-4 flex flex-col items-center"
            >
              <div className="h-24 w-full bg-gray-600 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-600 rounded mt-4"></div>
              <div className="h-4 w-1/2 bg-gray-600 rounded mt-2"></div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="py-4 flex justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-10 bg-gray-600 rounded-full mx-1 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-2">
        <h1 className="h1 font-bold text-white mb-4">Prompt List</h1>

        {/* Prompt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentPrompts.length === 0 ? (
            <p>No prompts found.</p>
          ) : (
            currentPrompts.map(prompt => (
              <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
                <PromptCard prompt={prompt} />
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="py-4 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-2 rounded-md ${
                page === currentPage
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Next
          </button>
        </div>
      </div>
      <div>
        <div className="relative w-full z-0">
          <div className="absolute rotate-180 inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

          {/* <div className="relative w-full bg-[#2d1b4e] z-0"> */}
          {/* Overlay Background */}

          <div className="w-full bottom-0 h-4 lg:h-10">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                className="fill-current dark:text-dark-primary-dark text-dark-primary shadow-2xl"
              ></path>
            </svg>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PromptPagination;
