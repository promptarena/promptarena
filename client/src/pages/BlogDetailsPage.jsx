import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogStore } from '../store/blogStore';
import LoadingSpinner from '../components/animations/loader/LoadingSpinner';
import toast from 'react-hot-toast';
import BackButton from '../components/base/BackButton';
import SEO from '../components/seo/SEO';
import { getCurrentSiteUrl } from '../utils/getCurrentSiteUrl';

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const { singleBlogPost, fetchSingleBlogPost, isLoading, error } =
    useBlogStore();

  useEffect(() => {
    fetchSingleBlogPost(blogId);
  }, [blogId, fetchSingleBlogPost]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    toast.error(error);
    return <div className="text-red-500">Error loading blog post details.</div>;
  }

  if (!singleBlogPost) {
    return <div className="text-gray-500">No blog post found.</div>;
  }

  const { title, content, media } = singleBlogPost;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="mb-6">
          <p>{content}</p>
        </div>
        {media.images.length > 0 && (
          <div className="flex flex-wrap">
            {media.images.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Blog ${title}`}
                className="max-w-xs h-auto rounded-md m-2"
              />
            ))}
          </div>
        )}
        {media.videos.length > 0 && (
          <div className="flex flex-wrap">
            {media.videos.map((videoUrl, index) => (
              <video
                key={index}
                src={videoUrl}
                controls
                className="max-w-xs h-auto rounded-md m-2"
              />
            ))}
          </div>
        )}

        <div className="mt-6">
          <p>
            <strong>Author:</strong> {singleBlogPost.author?.username}
          </p>
          <p>
            <strong>Created At:</strong> {singleBlogPost.createdAt}
          </p>
        </div>

        <div className="mt-6">
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default BlogDetailsPage;
