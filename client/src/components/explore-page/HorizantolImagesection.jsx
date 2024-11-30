import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MarqueeSlider from '../explore/MarqueeSlider';

const imagesSrc = [
  'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990331989_800x800.webp?alt=media&token=8f4e2684-f705-4f70-b7fb-c5e3e6d47c5c',
  'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990331989_800x800.webp?alt=media&token=8f4e2684-f705-4f70-b7fb-c5e3e6d47c5c',
  'https://assets.promptbase.com/DALLE_IMAGES%2FT84jz89oG2fA4pZOzO3mYL7F52x2%2Fresized%2F1672990331989_800x800.webp?alt=media&token=8f4e2684-f705-4f70-b7fb-c5e3e6d47c5c',
];

function ImageCard({ img }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden">
      <img
        src={img}
        alt="Monkey with orange goggles"
        className="w-full h-[150px] my-2 rounded-2xl object-cover"
      />
    </div>
  );
}

export default function HorizantolImagesection() {
  return (
    <div className="bg-[#1C1C1C] container mx-auto  min-h-screen w-full overflow-hidden">
      {/* Scrolling text banner */}
      {/* <div className="w-full bg-[#1C1C1C] overflow-hidden py-2">
    
      </div> */}

      {/* Main content */}
      <div className="px-4 py-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Image column */}
        <div className="w-full lg:w-1/2 space-y-2">
          <MarqueeSlider
            vertical={true}
            repeat={6}
            pauseOnHover={true}
            className={'overflow-y-hidden h-[290px] space-y-0 py-0 shadow-none'}
          >
            {imagesSrc.map(img => (
              <ImageCard key={img} img={img} />
            ))}
          </MarqueeSlider>
        </div>
        {/* <div className="w-full lg:w-1/2 space-y-2">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://placehold.co/800x400"
              alt="Monkey with orange goggles"
              className="w-full h-[150px] object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://placehold.co/800x400"
              alt="Artistic monkey with sunglasses"
              className="w-full h-[200px] object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://placehold.co/800x400"
              alt="Monkey with headphones"
              className="w-full h-[150px] object-cover"
            />
          </div>
        </div> */}

        {/* Text content */}
        <div className="w-full lg:w-1/2 text-white">
          <span className="text-sm tracking-wider">WELCOME TO</span>
          <h1 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Effortless Ways to Used AI Tools and Building Your Own AI Images.
          </h1>
          <p className="text-gray-400 mb-8">
            Explore the cutting-edge realm of AI-generated images with our
            innovative website, where artificial intelligence seamlessly
            transforms imagination into reality, where the limitless potential
            of AI brings your visions to life with unparalleled precision and
            creativity.
          </p>
          <button className="bg-[#FF8A00] text-white px-6 py-3 rounded-full font-medium hover:bg-[#FF9D2E] transition-colors">
            MORE ABOUT US
          </button>
        </div>
      </div>

      {/* Bottom text */}
      {/* <div className="w-full overflow-hidden py-8">
        <div className="text-[120px] font-bold text-white/10 whitespace-nowrap tracking-tighter">
          
        </div>
      </div> */}
    </div>
  );
}
