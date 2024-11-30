import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../store/blogStore';
import LoadingSpinner from '../components/animations/loader/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import BlogHero from '../components/blog-page/BlogHero';
import { DragCards } from '../components/blog-page/DragCards';
import { BackgroundGradientCard } from '../components/framer-motion/animations/BackgroundGradientCard';
import Footer from '../components/global/Footer';
import BlogEndingCard from '../components/blog-page/BlogEndingCard';
import { Zap } from 'lucide-react';
import BlogMainHero from '../components/blog-page/BlogMainHero';
import SEO from '../components/seo/SEO';
import { getCurrentSiteUrl } from '../utils/getCurrentSiteUrl';

const BlogPage = () => {
  const { blogPosts, fetchBlogPosts, isLoading, error } = useBlogStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  if (isLoading) {
    return <BlogMainHero />;
  }
  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-screen bg-gradient-to-br from-purple-600/30 via-[#59078867] to-[#4b006e] animate-pulse">
  //       <div className="flex justify-center items-center">
  //         <div className="max-w-7xl w-full px-8 text-white flex flex-col md:flex-row items-center gap-10">
  //           {/* Left Section - Skeleton Text */}
  //           <div className="flex-1 space-y-4">
  //             <div className="h-6 w-48 bg-gray-500/50 rounded-full"></div>
  //             <div className="h-12 w-3/4 bg-gray-500/50 rounded-md"></div>
  //             <div className="h-4 w-1/2 bg-gray-500/50 rounded-full"></div>
  //             <div className="h-4 w-1/3 bg-gray-500/50 rounded-full"></div>
  //             <div className="flex gap-4 mt-4">
  //               <div className="h-12 w-32 bg-purple-500/50 rounded-full"></div>
  //               <div className="h-12 w-32 bg-purple-400/50 border border-purple-500 rounded-full"></div>
  //             </div>
  //           </div>

  //           {/* Right Section - Skeleton Image and Tags */}
  //           <div className="flex-1 relative">
  //             <div className="w-full h-64 bg-gray-500/50 rounded-md"></div>
  //             {/* Skeleton Tags */}
  //             <div className="absolute top-10 left-5 h-6 w-24 bg-gray-700/50 rounded-full"></div>
  //             <div className="absolute bottom-32 left-5 h-6 w-32 bg-gray-700/50 rounded-full"></div>
  //             <div className="absolute bottom-10 right-5 h-6 w-36 bg-gray-700/50 rounded-full"></div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Skeleton for VelocityText */}
  //       <div className="mt-10 space-y-4">
  //         <div className="h-8 w-3/4 mx-auto bg-gray-500/50 rounded-md"></div>
  //         <div className="h-8 w-3/4 mx-auto bg-gray-500/50 rounded-md"></div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   toast.error(error);
  //   return (
  //     <div className="text-red-500 text-center">
  //       <p>Error loading blog posts.</p>
  //       <button
  //         onClick={fetchBlogPosts}
  //         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <>
      <SEO
        title="AI Prompting Blog - Tips, Tutorials & Inspiration - PromptArena"
        description="Stay up-to-date on the latest AI prompting techniques, tutorials, and inspiration for Midjourney, Stable Diffusion, ChatGPT, and more. Learn how to craft effective prompts and unlock your creative potential with PromptArena's blog."
        keywords="AI prompting blog, AI prompt engineering, Midjourney tutorial, Stable Diffusion tutorial, ChatGPT tutorial, AI art prompts, AI writing prompts, prompt inspiration, creative prompts"
        url={getCurrentSiteUrl() + '/blog'}
      />
      <BlogMainHero />

      <div className="relative w-full bg-gradient-to-b from-[#1a0b2e] to-[#2d1b4e]  z-0">
        {/* Overlay Background */}
        <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[0] opacity-80"></div>

        {/* <BlogHero /> */}
        <DragCards />
        {/* <h1 className="text-4xl font-bold mb-4">Blog Posts</h1> */}
        {/* {user.role === 'admin'  && (
        <div className='mb-4'>
          <Link
            to='/admin/blog/create'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2'
          >
            Create New Post
          </Link>
          <Link
            to='/admin/blog'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
          >
            Manage Blog
          </Link>
        </div>
      )} */}
        {/* {blogPosts.length === 0 ? (
        <div className="text-gray-500 text-center">
          No blog posts available.
        </div>
      ) : (
        <ul className="space-y-4">
          {blogPosts.map(post => (
            <li key={post._id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold">
                <Link
                  to={`/blog/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
              <p className="text-gray-500">
                By:{' '}
                <Link
                  to={`/profile/username/${post.author.username}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.author.username}
                </Link>
              </p>
              <p className="text-gray-500">
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500">
                Updated: {new Date(post.updatedAt).toLocaleDateString()}
              </p>
              {user.role === 'admin' && (
                <Link
                  to={`/admin/blog/edit/${post._id}`}
                  className='text-white badge badge-tertiary rounded-md hover:bg-blue-600'
                >
                  Edit
                </Link>
              )}
            </li>
          ))}
        </ul>
      )} */}
        <div id="view-blogs" className="container mx-auto">
          <div className="text-center relative my-12 z-1">
            <h1 className="text-6xl font-bold font-syncopate">
              <span className="text-[#9857D3] uppercase">Recent</span>
              <span className="text-white uppercase"> posts</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Tap into insights, tutorials, and inspiration from the world of
              AI-generated content.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {blogPosts.map(post => (
              <BackgroundGradientCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full bg-gradient-to-b from-[#2e1550] to-[#2d1b4e]  z-0">
        {/* Overlay Background */}
        <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

        {/* AI Video Featured */}
        <div className="flex items-center bg-transparent justify-center gap-2 pt-8 mb-4">
          <Zap className="w-5 h-5 text-[#ababf1]" />
          <span className="text-[#ababf1] text-sm font-medium capitalize">
            A striking example of AI-generated art.
          </span>
        </div>

        {/* Main Heading */}
        <div className="container mx-auto">
          <div className="text-center my-1 ">
            <h1 className="h1 font-bold font-syncopate">
              <span className="text-[#9857D3] uppercase">The Power of</span>
              <span className="text-white uppercase"> Prompts</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Stay up-to-date with the latest trends and community news on our
              blog
            </p>
          </div>
        </div>
        <BlogEndingCard />
      </div>
      <div>
        <div className="relative w-full bg-gradient-to-b from-[#2e1550] to-[#2d1b4e] z-0">
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

export default BlogPage;
