import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import LoadingSpinner from '../animations/loader/LoadingSpinner';
import { handleError } from '../../utils/errorHandler';

const RelatedPrompts = ({ currentPrompt }) => {
  const [relatedPrompts, setRelatedPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPrompts = async () => {
      setIsLoading(true);
      try {
        const params = {
          category: currentPrompt.category,
          tags: currentPrompt.tags.join(','),
        };
        const response = await axiosInstance.get('/prompt/all', { params });
        const prompts = response.data?.data?.prompts || [];
        setRelatedPrompts(prompts.filter(p => p._id !== currentPrompt._id));
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentPrompt) fetchRelatedPrompts();
  }, [currentPrompt]);

  if (isLoading) return <LoadingSpinner />;
  if (relatedPrompts.length === 0) return <div>No related prompts found.</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Prompts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedPrompts.map(prompt => (
          <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{prompt.title}</h3>
              <p className="text-gray-600 mb-2">
                {prompt.description.substring(0, 50)}...
              </p>
              <p className="text-green-600 font-medium">
                Price: ${prompt.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPrompts;
