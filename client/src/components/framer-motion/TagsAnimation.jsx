import React from 'react';
import { Bitcoin, EclipseIcon as Ethereum, DollarSign } from 'lucide-react';
import MarqueeSlider from '../explore/MarqueeSlider';

const CryptoCard = ({
  icon,
  name,
  symbol,
  price,
  change,
  volume,
  changeColor,
}) => (
  <div className="bg-gray-900 shadow rounded-xl p-4 ring-1 ring-neutral-400/60 flex items-center space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-grow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white font-semibold">{name}</p>
          <p className="text-gray-400 text-sm">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold">${price}</p>
          <p className={`text-sm ${changeColor}`}>
            {change > 0 ? '+' : ''}
            {change}%
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-gray-400 text-xs">
        <span>CHG</span>
        <span>VOL ${volume}M</span>
      </div>
    </div>
  </div>
);

export default function Component() {
  return (
    <>
      <div className="py-16 flex items-center justify-center font-sans">
        <div className="w-full flex items-center justify-between md:space-x-10 space-x-2">
          <div className="w-[35%]  gap-4 py-4 bg-purple-800 overflow-hidden rounded-r-2xl">
            <MarqueeSlider reverse={false}>
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
                name="Cardano"
                symbol="ADA"
                price="0.29"
                change={0.27}
                volume={2.1}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
                name="Dogecoin"
                symbol="DOGE"
                price="0.07"
                change={-1.69}
                volume={5.3}
                changeColor="text-red-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
            </MarqueeSlider>
            <MarqueeSlider reverse={true}>
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
                name="Cardano"
                symbol="ADA"
                price="0.29"
                change={0.27}
                volume={2.1}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
                name="Dogecoin"
                symbol="DOGE"
                price="0.07"
                change={-1.69}
                volume={5.3}
                changeColor="text-red-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
            </MarqueeSlider>
            <MarqueeSlider reverse={false}>
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
                name="Cardano"
                symbol="ADA"
                price="0.29"
                change={0.27}
                volume={2.1}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
                name="Dogecoin"
                symbol="DOGE"
                price="0.07"
                change={-1.69}
                volume={5.3}
                changeColor="text-red-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
            </MarqueeSlider>
          </div>

          <div className="text-center">
            <p className="text-[#6c5dd3] text-lg font-bold mb-4 uppercase">
              Harness AI power
            </p>
            <h1 className="text-white h2 font-bold mb-4">
              Inspiring AI Creations
            </h1>
            <p className="text-gray-400 text-xl md:max-w-md max-w-sm mx-auto">
              Explore a gallery of amazing artwork, stories, and other content
              generated by our community using AI prompts.
            </p>
          </div>

          <div className="w-[35%] gap-4 py-4 bg-purple-800 overflow-hidden rounded-l-2xl">
            <MarqueeSlider reverse={false}>
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
                name="Cardano"
                symbol="ADA"
                price="0.29"
                change={0.27}
                volume={2.1}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
                name="Dogecoin"
                symbol="DOGE"
                price="0.07"
                change={-1.69}
                volume={5.3}
                changeColor="text-red-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
            </MarqueeSlider>
            <MarqueeSlider reverse={true}>
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
                name="Cardano"
                symbol="ADA"
                price="0.29"
                change={0.27}
                volume={2.1}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
                name="Dogecoin"
                symbol="DOGE"
                price="0.07"
                change={-1.69}
                volume={5.3}
                changeColor="text-red-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
            </MarqueeSlider>
            <MarqueeSlider reverse={false}>
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
                name="Ethereum"
                symbol="ETH"
                price="1,849.18"
                change={0.01}
                volume={100.9}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
                name="Bitcoin"
                symbol="BTC"
                price="29,425.00"
                change={0}
                volume={116}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
                name="Cardano"
                symbol="ADA"
                price="0.29"
                change={0.27}
                volume={2.1}
                changeColor="text-green-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
                name="Dogecoin"
                symbol="DOGE"
                price="0.07"
                change={-1.69}
                volume={5.3}
                changeColor="text-red-500"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
              <CryptoCard
                icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
                name="Polkadot"
                symbol="DOT"
                price="5.00"
                change={0}
                volume={6.1}
                changeColor="text-gray-400"
              />
            </MarqueeSlider>
          </div>
        </div>
      </div>
    </>
  );
}

// import React from 'react';
// import { Bitcoin, EclipseIcon as Ethereum, DollarSign } from 'lucide-react';
// import MarqueeSlider from '../explore/MarqueeSlider';

// const CryptoCard = ({
//   icon,
//   name,
//   symbol,
//   price,
//   change,
//   volume,
//   changeColor,
// }) => (
//   <div className="bg-gray-900 shadow rounded-xl p-4 ring-1 ring-neutral-400/60 flex items-center space-x-4">
//     <div className="flex-shrink-0">{icon}</div>
//     <div className="flex-grow">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-white font-semibold">{name}</p>
//           <p className="text-gray-400 text-sm">{symbol}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-white font-bold">${price}</p>
//           <p className={`text-sm ${changeColor}`}>
//             {change > 0 ? '+' : ''}
//             {change}%
//           </p>
//         </div>
//       </div>
//       <div className="mt-2 flex justify-between text-gray-400 text-xs">
//         <span>CHG</span>
//         <span>VOL ${volume}M</span>
//       </div>
//     </div>
//   </div>
// );

// export default function Component() {
//   return (
//     <>
//       <div className="py-16 flex items-center justify-center font-sans">
//         <div className="w-full flex items-center justify-between md:space-x-10 space-x-0">
//           <div className="w-[35%] gap-4 py-4 bg-purple-800 overflow-hidden rounded-r-2xl">
//             <MarqueeSlider reverse={false}>
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
//                 name="Cardano"
//                 symbol="ADA"
//                 price="0.29"
//                 change={0.27}
//                 volume={2.1}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
//                 name="Dogecoin"
//                 symbol="DOGE"
//                 price="0.07"
//                 change={-1.69}
//                 volume={5.3}
//                 changeColor="text-red-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//             </MarqueeSlider>
//             <MarqueeSlider reverse={true}>
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
//                 name="Cardano"
//                 symbol="ADA"
//                 price="0.29"
//                 change={0.27}
//                 volume={2.1}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
//                 name="Dogecoin"
//                 symbol="DOGE"
//                 price="0.07"
//                 change={-1.69}
//                 volume={5.3}
//                 changeColor="text-red-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//             </MarqueeSlider>
//             <MarqueeSlider reverse={false}>
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
//                 name="Cardano"
//                 symbol="ADA"
//                 price="0.29"
//                 change={0.27}
//                 volume={2.1}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
//                 name="Dogecoin"
//                 symbol="DOGE"
//                 price="0.07"
//                 change={-1.69}
//                 volume={5.3}
//                 changeColor="text-red-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//             </MarqueeSlider>
//           </div>

//           <div className="text-center">
//             <p className="text-[#6c5dd3] text-lg mb-4">NOW LIVE</p>
//             <h1 className="text-white  font-bold mb-4">Start Trading</h1>
//             <p className="text-gray-400 text-xl max-w-md mx-auto">
//               We are continuously launching new Perpetual Contract markets.
//             </p>
//           </div>

//           <div className="w-[35%] gap-4 py-4 bg-purple-800 overflow-hidden rounded-l-2xl">
//             <MarqueeSlider reverse={false}>
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
//                 name="Cardano"
//                 symbol="ADA"
//                 price="0.29"
//                 change={0.27}
//                 volume={2.1}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
//                 name="Dogecoin"
//                 symbol="DOGE"
//                 price="0.07"
//                 change={-1.69}
//                 volume={5.3}
//                 changeColor="text-red-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//             </MarqueeSlider>
//             <MarqueeSlider reverse={true}>
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
//                 name="Cardano"
//                 symbol="ADA"
//                 price="0.29"
//                 change={0.27}
//                 volume={2.1}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
//                 name="Dogecoin"
//                 symbol="DOGE"
//                 price="0.07"
//                 change={-1.69}
//                 volume={5.3}
//                 changeColor="text-red-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//             </MarqueeSlider>
//             <MarqueeSlider reverse={false}>
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<Ethereum className="w-8 h-8 text-[#627eea]" />}
//                 name="Ethereum"
//                 symbol="ETH"
//                 price="1,849.18"
//                 change={0.01}
//                 volume={100.9}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<Bitcoin className="w-8 h-8 text-[#f7931a]" />}
//                 name="Bitcoin"
//                 symbol="BTC"
//                 price="29,425.00"
//                 change={0}
//                 volume={116}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#3cc8c8]" />}
//                 name="Cardano"
//                 symbol="ADA"
//                 price="0.29"
//                 change={0.27}
//                 volume={2.1}
//                 changeColor="text-green-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#ba9f33]" />}
//                 name="Dogecoin"
//                 symbol="DOGE"
//                 price="0.07"
//                 change={-1.69}
//                 volume={5.3}
//                 changeColor="text-red-500"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//               <CryptoCard
//                 icon={<DollarSign className="w-8 h-8 text-[#e6007a]" />}
//                 name="Polkadot"
//                 symbol="DOT"
//                 price="5.00"
//                 change={0}
//                 volume={6.1}
//                 changeColor="text-gray-400"
//               />
//             </MarqueeSlider>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
