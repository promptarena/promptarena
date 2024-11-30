import { ArrowDownRight } from 'lucide-react';
import { purpleRobotMain } from '../../assets/img/promptpage';

const styles = {
  gradientText:
    'bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600',
  buttonHover:
    'text-sm font-medium tracking-wide transition-colors duration-300 hover:bg-purple-500/20',
  cardGlass:
    'bg-white/10 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg shadow-purple-500/50',
};

export default function AboutHeroz() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Multiple layered background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,32,240,0.1)_0%,transparent_100%)]" />

      {/* Purple glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full" />

      {/* Top navigation bar */}
      <div className="relative z-50 w-full px-8 pb-6 flex justify-between items-center">
        {/* Logo and branding */}
        <div className="flex items-center space-x-6">
          <span className="text-purple-500 text-sm tracking-[0.2em] font-bold">
            CHOOSE YOUR OWN
          </span>
        </div>

        {/* Navigation dots */}
        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
          <div className="w-3 h-3 rounded-full border border-purple-500/50 transition-colors duration-300 hover:bg-purple-500/30" />
          <div className="w-3 h-3 rounded-full border border-purple-500/50 transition-colors duration-300 hover:bg-purple-500/30" />
        </div>
      </div>

      {/* Left side navigation indicators */}
      <div className="absolute left-8 top-1/4 flex flex-col gap-3 z-50">
        <div className="text-purple-500 text-sm font-light tracking-widest">
          01
        </div>
        <div className="w-2 h-2 rounded-full border border-purple-500/50 transition-colors duration-300 hover:bg-purple-500/30" />
        <div className="w-2 h-2 rounded-full border border-purple-500/50 transition-colors duration-300 hover:bg-purple-500/30" />
      </div>

      {/* Main content container */}
      <div className="relative z-40 h-[calc(100vh-88px)]">
        {/* Main text content */}
        <div className="absolute top-0 left-8 z-50">
          <div className="space-y-6">
            <h1
              className={`md:text-[11rem] text-[8rem] leading-[0.9] font-bold tracking-wider ${styles.gradientText}`}
            >
              ABOUT US
            </h1>

            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-wide">
                <span className="text-white">DISCOVER </span>
                <span className="text-purple-500">NEW</span>
              </h2>
              <h3 className="flex gap-3 text-3xl font-light tracking-wide">
                <span className="text-purple-500">NFT</span>
                <span className="text-white">COLLECTION</span>
              </h3>
            </div>

            <p className="text-gray-400 max-w-md text-sm leading-relaxed tracking-wide">
              Zodiac spirits became NFTs, reviving their power. Each token held
              a fragment of their cosmic power.
            </p>

            <button
              className={`${styles.buttonHover} mt-8 bg-white text-black px-8 py-3.5 rounded-full flex items-center gap-3 text-sm tracking-wide font-medium`}
            >
              Watch More
              <ArrowDownRight className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </div>

        {/* Centered Hero Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-30">
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full" />
            <img
              src={purpleRobotMain}
              alt="Zodiac Warrior"
              className="relative z-[999] w-[700px] object-cover object-center rounded-lg"
            />
          </div>
        </div>

        {/* Aries Card */}
        <div
          className={`${styles.cardGlass} absolute top-[40%] -translate-y-1/2 right-12 p-6 rounded-2xl w-[280px] z-50`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-lg" />
              <img
                src="https://placehold.co/60x60"
                alt="Aries"
                className="relative z-10 w-15 h-15 rounded-lg border border-purple-500/20"
                width={60}
                height={60}
              />
            </div>
            <h3 className="text-2xl text-white font-light tracking-wide">
              ARIES
            </h3>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed tracking-wide mb-5">
            The Commander of Stars, leading the charge in the intergalactic war
            against entropy.
          </p>

          <button
            className={`${styles.buttonHover} w-full text-white border border-purple-500/50 px-5 py-2.5 rounded-full text-sm tracking-wide backdrop-blur-sm transition-colors duration-300 hover:bg-purple-500/20`}
          >
            Open Collection
          </button>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-20 right-12 grid grid-cols-3 gap-16 z-50">
          {[
            { value: '567', label: 'zodiac collections' },
            { value: '5,3K', label: 'community members' },
            { value: '8,3K', label: 'zodiac cards' },
          ].map((stat, index) => (
            <div key={index} className="text-right">
              <h4 className="text-4xl text-white font-['Segment7', sans-serif] tracking-wider mb-1">
                {stat.value}
              </h4>
              <p className="text-gray-400 text-sm tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(160,32,240,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(160,32,240,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

          {/* Purple accent lines */}
          <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />
          <div className="absolute bottom-0 left-1/4 w-32 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0" />
        </div>
      </div>
    </div>
  );
}
