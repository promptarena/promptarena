import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Business',
    length: '140+',
    color: '#6A1B9A',
  },
  {
    name: 'Productivity',
    length: '230+',
    color: '#E91E63',
  },
  {
    name: 'Coding',
    length: '310+',
    color: '#00BCD4',
  },
  {
    name: 'Image',
    length: '210+',
    color: '#9C27B0',
  },
  {
    name: 'Writing',
    length: '170+',
    color: '#03A9F4',
  },
  {
    name: 'Social Media',
    length: '210+',
    color: '#00BCD4',
  },
  {
    name: 'SEO',
    length: '90+',
    color: '#673AB7',
  },
  {
    name: 'Art',
    length: '120+',
    color: '#FF4081',
  },
  {
    name: 'Recipes',
    length: '105+',
    color: '#009688',
  },
];

export default function PromptCategory() {
  return (
    <div className=" bg-[#1A202C] container mx-auto bg-opacity-95 p-8">
      <div className="text-center mt-1 mb-5 overflow-x-hidden">
        <h2 className="h1 font-bold font-syncopate">
          <span className="text-[#9857D3] uppercase">Popular</span>
          <span className="text-white uppercase"> Categories</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Explore our curated collection of prompts for various categories. From
          business to productivity, code generation, and more. Choose a prompt
          that fits your needs and unleash your creativity.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category, index) => (
          <Link to={`/prompts/category/${category.name}`} key={index}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative shadow-[inset_1px_0px_22px_0px_#1A202C] glassEffect rounded-xl sm:rounded-2xl p-2 sm:p-4 overflow-hidden"
            >
              <div className="2xs:flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-md opacity-50" />
                  <div
                    style={{ backgroundColor: category.color }}
                    className={`w-8 h-8 sm:w-16 sm:h-16 rounded-full flex-center text-white text-sm sm:text-xl font-extrabold relative z-10 border border-gray-200`}
                  >
                    <h6>
                      {category.name
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase())
                        .join('')}
                    </h6>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm sm:text-xl font-bold truncate">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-black font-mono truncate">
                    <span className="mr-1">◆</span>
                    {category.length} Prompts
                  </p>
                </div>
                <div className="flex items-center space-x-2 hidden sm:block rounded-full bg-plain-white-background/80 p-1 sm:p-2">
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-400/10 pointer-events-none" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
