import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import { ArrowUpRight } from 'lucide-react';
import ReviewForm from '../review/ReviewForm';
import ReviewListz from '../review/ReviewListz';
import { formatDate, formatRelativeTime } from '../../utils/date';
import { Link } from 'react-router-dom';

const Card = ({ number, title, description }) => (
  <div className="bg-indigo-700/30 rounded-3xl p-4 md:p-6 backdrop-blur-md">
    <div className="text-white text-lg md:text-2xl font-bold uppercase mb-2 md:mb-4">
      {number}
    </div>
    <h3 className="text-white text-base md:text-lg font-semibold uppercase mb-1 md:mb-2">
      {title}
    </h3>
    <p className="text-white/80 text-xs md:text-sm">{description}</p>
  </div>
);

export default function PromptBottomCard({
  editReview,
  handleCancelEdit,
  isAuthenticated,
  currentPrompt,
  user,
  reviews,
  averageRating,
  promptId,
  existingReview,
  handleEditReview,
  reviewsLoading,
  reviewsError,
}) {
  const [activeTab, setActiveTab] = useState('reviews'); // State to track active tab
  const [showFullResponse, setShowFullResponse] = useState(false); // State to toggle full/partial text

  const toggleShowFullResponse = () => setShowFullResponse(prev => !prev);

  const renderExampleResponse = () => {
    const words = currentPrompt?.exampleResponse?.split(' ') || [];
    const previewText = words.slice(0, 100).join(' '); // Display only 100 words initially

    return (
      <>
        <AnimatePresence mode="wait">
          {showFullResponse ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-white/80">{currentPrompt.exampleResponse}</p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-white/80">{previewText}...</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleShowFullResponse}
          className="text-indigo-400 mt-2 underline"
        >
          {showFullResponse ? 'Show less' : 'Read more'}
        </button>
      </>
    );
  };

  return (
    <div className="relative bg-gradient-to-b from-[#1F1037] to-[#2d1b4e] p-4 md:p-8">
      <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column: Rating */}
        <div className="row-span-4 h-fit flex flex-col justify-between p-4 md:p-6 bg-purple-900 rounded-3xl">
          <div>
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Ratings
            </h2>
            <div className="flex items-baseline">
              <span className="text-white text-3xl md:text-5xl font-bold">
                {averageRating || 0}
              </span>
              <span className="text-yellow-400 text-xl md:text-3xl ml-2">
                ★
              </span>
            </div>
            <h2 className="text-white text-base md:text-xl font-semibold mt-2">
              {reviews[promptId]?.length} Reviews
            </h2>
          </div>
        </div>

        {/* Top Right: Prompt Type */}
        <div className="flex flex-col bg-fuchsia-800 justify-center rounded-3xl">
          <Card
            number={currentPrompt?.promptType}
            title="PROMPT TYPE:"
            description={`This Prompt is specialized for ${currentPrompt?.promptType} generation.`}
          />
        </div>

        {/* Middle Right: AI Model */}
        <div className="flex flex-col bg-fuchsia-800 shadow-2xl justify-center rounded-3xl">
          <Card
            number={currentPrompt?.model}
            title="USED AI MODEL:"
            description={`This Prompt uses ${currentPrompt?.model}.`}
          />
        </div>

        {/* Bottom Right: Dynamic Content Section */}
        <div className="col-span-1 md:col-span-2 p-4 md:p-6 bg-purple-900 rounded-3xl">
          {/* Tab Buttons */}
          <div className="flex space-x-2 md:space-x-4 mb-2 md:mb-4">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 md:px-4 px-3 rounded-lg text-[14px] md:text-base  ${activeTab === 'reviews' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-white'}`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('additionalData')}
              className={`py-2 md:px-4 px-3 rounded-lg text-[14px] md:text-base ${activeTab === 'additionalData' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-white'}`}
            >
              Additional Data
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-2 md:px-4 px-3 rounded-lg text-[14px] md:text-base ${activeTab === 'details' ? 'bg-purple-600 text-white' : 'bg-purple-800 text-white'}`}
            >
              Details
            </button>
          </div>

          {/* Conditional Content based on Active Tab */}
          {/* {activeTab === 'reviews' && (
            <>
              <h2 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-4">
                REVIEW
              </h2>
              <ReviewListz
                onEdit={handleEditReview}
                promptId={promptId}
                reviews={reviews[promptId] || []}
                key={promptId}
              />
              {isAuthenticated && (
                <ReviewForm
                  promptId={promptId}
                  existingReview={existingReview}
                  isEditingMode={!!editReview}
                  onCancel={handleCancelEdit}
                />
              )}
            </>
          )}

          {activeTab === 'additionalData' && (
            <div>
              <h2 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-4">
                ADDITIONAL DATA
              </h2>
              <p className="text-white/80">
                Here is some additional data related to this prompt that might
                interest you.
              </p>
              <div>
                <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                  Category
                </h3>
                <p className="text-white/80">
                  <Link to={`/prompts/category/${currentPrompt.category}`}>
                    {currentPrompt?.category}
                  </Link>
                </p>
              </div>
              <div>
                <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                  Updated at
                </h3>
                <p className="text-white/80">
                  {formatRelativeTime(currentPrompt?.updatedAt)}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div>
              <h2 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-4">
                DETAILS
              </h2>
              <p className="text-white/80">
                Detailed information about this prompt and its specifications.
              </p>
              <div>
                <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                  Created at
                </h3>
                <p className="text-white/80">
                  {formatDate(currentPrompt?.createdAt)}
                </p>
              </div>
              <div>
                <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                  Updated at
                </h3>
                <p className="text-white/80">
                  {formatDate(currentPrompt?.updatedAt)}
                </p>
              </div>
              <div>
                <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                  Example Response
                </h3>
                {renderExampleResponse()}
              </div>
            </div>
          )} */}

          {/* Tab Content Animation */}
          <AnimatePresence mode="wait">
            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-4">
                  REVIEW
                </h2>
                <ReviewListz
                  onEdit={handleEditReview}
                  promptId={promptId}
                  reviews={reviews[promptId] || []}
                  key={promptId}
                />
                {isAuthenticated && (
                  <ReviewForm
                    promptId={promptId}
                    existingReview={existingReview}
                    isEditingMode={!!editReview}
                    onCancel={handleCancelEdit}
                  />
                )}
              </motion.div>
            )}

            {activeTab === 'additionalData' && (
              <motion.div
                key="additionalData"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-4">
                  ADDITIONAL DATA
                </h2>
                <p className="text-white/80">
                  Here is some additional data related to this prompt that might
                  interest you.
                </p>
                <div>
                  <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                    Category
                  </h3>
                  <p className="text-white/80">
                    <Link to={`/prompts/category/${currentPrompt.category}`}>
                      {currentPrompt?.category}
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                    Updated at
                  </h3>
                  <p className="text-white/80">
                    {formatRelativeTime(currentPrompt?.updatedAt)}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-4">
                  DETAILS
                </h2>
                <p className="text-white/80">
                  Detailed information about this prompt and its specifications.
                </p>
                <div>
                  <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                    Created at
                  </h3>
                  <p className="text-white/80">
                    {formatDate(currentPrompt?.createdAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                    Updated at
                  </h3>
                  <p className="text-white/80">
                    {formatDate(currentPrompt?.updatedAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-white text-base md:text-lg font-semibold mt-2 md:mt-4">
                    Example Response
                  </h3>
                  {renderExampleResponse()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
