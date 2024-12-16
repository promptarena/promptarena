import React, { useEffect } from 'react';
import {
  Share2,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useBlogStore } from '../../store/blogStore';
import LoadingSpinner from '../animations/loader/LoadingSpinner';
import toast from 'react-hot-toast';
import FramerCarousel from '../framer-motion/animations/FramerCarousel';
import { purpleRobotMain } from '../../assets/img/promptpage';
import { formatCustomDate } from '../../utils/date';
import VideoPlayer from '../global/VideoPlayer';
import { BackgroundGradientCard } from '../framer-motion/animations/BackgroundGradientCard';
import OptimizedImage from '../base/OptimizedImage';
import SEO from '../seo/SEO';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';
import Footer from '../global/Footer';
import { FaWhatsapp } from 'react-icons/fa';
import DOMPurify from 'dompurify';

export default function ModernBlogPost() {
  const { blogId } = useParams();
  const {
    singleBlogPost,
    blogPosts,
    fetchBlogPosts,
    fetchSingleBlogPost,
    isLoading,
    error,
  } = useBlogStore();

  useEffect(() => {
    fetchSingleBlogPost(blogId);
  }, [blogId, fetchSingleBlogPost]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    toast.error(error);
    return <div className="text-red-500">Error loading blog post details.</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white p-8">
        <article className="max-w-4xl mx-auto animate-pulse">
          {/* Header Skeleton */}
          <header className="mb-12 text-center">
            <div className="h-4 bg-purple-300/50 rounded w-32 mx-auto mb-4"></div>
            <div className="h-8 bg-purple-400/50 rounded w-3/4 mx-auto"></div>
          </header>

          {/* Bento Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Image Skeleton */}
            <div className="col-span-full">
              <div className="relative w-full mb-8 rounded-2xl bg-purple-400 h-64"></div>
            </div>

            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-300/50 rounded w-full"
                ></div>
              ))}
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-8">
              <div className="bg-white/10 p-6 rounded-2xl space-y-4">
                <div className="w-24 h-24 bg-gray-300/50 rounded-full mx-auto"></div>
                <div className="h-4 bg-gray-400/50 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-300/50 rounded w-3/4 mx-auto"></div>
              </div>

              <div className="bg-white/10 p-6 rounded-2xl space-y-4">
                <div className="h-4 bg-gray-400/50 rounded w-1/3"></div>
                <div className="flex justify-around">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 bg-gray-300/50 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Content Skeleton */}
            <div className="col-span-full">
              <div className="h-8 bg-purple-400/50 rounded w-32 mb-4"></div>
              <div className="aspect-video bg-gray-300/50 rounded"></div>
            </div>

            {/* Additional Content Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-purple-400/50 rounded w-1/3"></div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300/50 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-400/50 rounded w-24"></div>
                  <div className="h-3 bg-gray-300/50 rounded w-32"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-300/50 rounded w-full"></div>
            </div>

            {/* Related Image Skeleton */}
            <div className="w-full h-64 bg-gray-300/50 rounded-2xl shadow-lg"></div>
          </div>

          {/* Recent Posts Skeleton */}
          <div className="mt-16">
            <div className="h-8 bg-purple-400/50 rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-48 bg-gray-300/50 rounded-lg col-span-1"
                ></div>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  if (!singleBlogPost) {
    return <div className="text-gray-500">No blog post found.</div>;
  }

  const { title, media, content } = singleBlogPost;

  const shareUrl = window.location.href;
  console.log('shareUrl: ', shareUrl);

  // Share button click handlers
  const handleShare = platform => {
    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }

    window.open(shareLink, '_blank', 'width=600,height=400');
    toast.success('Post shared!');
  };

  const videoCount = media.videos.length;

  console.log('singleBlogPost: ', singleBlogPost);

  const blogPost = {
    title,
    content,
    media,
    featuredImage: singleBlogPost.media.images[0] || '',
    publishedAt: singleBlogPost.createdAt,
    updatedAt: singleBlogPost.updatedAt,
  };

  const sanitizedContent = DOMPurify.sanitize(blogPost.content);

  return (
    <>
      <SEO
        title={`${blogPost.title} - PromptArena Blog`}
        description={blogPost.excerpt} // Use the blog post excerpt as the meta description
        keywords={`AI prompt engineering, prompt crafting, AI writing, AI art, machine learning, natural language processing, generative AI, creative AI, text generation, image generation, AI tools, automation, data science, deep learning, AI applications, content creation, digital art, interactive storytelling, AI ethics, AI research,`}
        url={getCurrentSiteUrl() + `/blog/${blogId}`}
        image={blogPost.featuredImage} // Full URL of the featured image
        article={{
          // Structured data for the blog post
          publishedTime: blogPost.publishedAt,
          modifiedTime: blogPost.updatedAt,
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white p-8">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <time className="text-sm text-purple-300">
              {formatCustomDate(singleBlogPost.createdAt, 'MMMM d, yyyy')}
            </time>
            <h1 className="h2 font-bold mt-4 mb-6 text-shadow tracking-wider text-white">
              {title}
            </h1>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Image */}
            <div className="col-span-full">
              <div className="relative w-full mb-8 rounded-2xl">
                <FramerCarousel
                  key={media.images}
                  activeClass="absolute top-0 left-0 h-full w-full bg-black rounded"
                  sliderClass="md:w-[600px] mt-4 mx-auto overflow-hidden glass-panel p-0 border rounded-md"
                  containerClass="h-auto rounded-md w-full pb-4 gap-2 items-center mx-auto cursor-auto"
                  mainImageClass=" object-cover aspect-square w-full h-full md:w-96 md:h-96 mx-auto rounded-2xl"
                  imageBGClass="rounded-2xl p-4 border w-full border-gray-100 glassEffect shadow-2xl"
                  items={media.images}
                />
              </div>
            </div>

            {/* Main Content */}
            {/* <div className="lg:col-span-2 space-y-6">
              {allButLastParagraph.map((para, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div> */}
            <div
              className="blog-content lg:col-span-2 -mt-10"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            ></div>

            {/* Sidebar Content */}
            <div className="space-y-8">
              {/* Author Info */}
              {singleBlogPost.author && (
                <div className="bg-white/10 p-6 rounded-2xl">
                  <OptimizedImage
                    transformations={{
                      q: 'auto',
                      w: 100,
                      h: 100,
                    }}
                    src={singleBlogPost.author.profileImage}
                    alt="Joan Wallace"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-center mb-2">
                    {singleBlogPost.author.name}
                  </h3>
                  <p className="text-sm text-center text-gray-400">
                    {singleBlogPost.author.bio}
                  </p>
                  <p className="text-sm text-center text-gray-400">
                    {formatCustomDate(
                      singleBlogPost.author.createdAt,
                      'DD - MMMM - YYYY'
                    )}
                  </p>
                </div>
              )}

              {/* Share Buttons */}
              <div className="bg-white/10 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold mb-4">Share this post</h4>
                <div className="flex justify-around">
                  <Facebook
                    onClick={() => handleShare('facebook')}
                    className="w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-300"
                  />
                  <Twitter
                    onClick={() => handleShare('twitter')}
                    className="w-6 h-6 text-sky-400 cursor-pointer hover:text-sky-300"
                  />
                  <Linkedin
                    onClick={() => handleShare('linkedin')}
                    className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-500"
                  />
                  <FaWhatsapp
                    onClick={() => handleShare('whatsapp')}
                    className="w-6 h-6 text-green-400 cursor-pointer hover:text-green-300"
                  />
                </div>
              </div>
            </div>

            {/* Video Content */}
            <div className="col-span-full">
              <h2 className="text-2xl font-bold mb-4">Video</h2>
              <div className="aspect-video w-full">
                {/* conditional rendering for video, if one video is present means show is <VideoPlayer video={media.videos[0]}, if more than one video is present then show <VideoPlayer playlist={media.videos} />, if no video is present then show default video */}
                {videoCount === 0 ? (
                  // Render default video if no videos are present
                  <VideoPlayer videoSrc="https://aikeu.netlify.app/images/video.mp4" />
                ) : videoCount === 1 ? (
                  // Render single video player if one video is present
                  <VideoPlayer videoSrc={media.videos[0]} />
                ) : (
                  // Render playlist if more than one video is present
                  <VideoPlayer playlist={media.videos} />
                )}
              </div>
            </div>

            {/* Additional Content */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold mt-8">{title}</h2>

              <div className="flex items-center space-x-4">
                <img
                  src={singleBlogPost.author.profileImage}
                  alt={singleBlogPost.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">
                    {singleBlogPost.author.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatCustomDate(
                      singleBlogPost.author.createdAt,
                      'DD - MMMM - YYYY'
                    )}
                  </p>
                </div>
              </div>

              <blockquote className="border-l-4 border-purple-500 pl-4 my-6 italic text-xl">
                The future of creativity is collaborative, with humans and AI
                working together to achieve new heights of imagination.
              </blockquote>
            </div>

            {/* Related Image */}
            <div>
              {media.images[media.images.length - 1] ? (
                <OptimizedImage
                  transformations={{
                    q: 100,
                  }}
                  src={media.images[media.images.length - 1]}
                  alt={media.images[media.images.length - 1]}
                  className="w-full h-[300px] object-cover rounded-2xl shadow-lg"
                />
              ) : (
                <img
                  src={purpleRobotMain}
                  alt={purpleRobotMain}
                  className="w-full h-[300px] object-cover rounded-2xl shadow-lg"
                />
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <h1>Loading...</h1>
                </div>
              ) : blogPosts.length > 0 ? (
                blogPosts
                  .slice(0, 3)
                  .map(post => (
                    <BackgroundGradientCard key={post._id} post={post} />
                  ))
              ) : (
                <p>No blog posts available.</p>
              )}
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
