import React, { useState } from 'react';
import {
  Search,
  Scissors,
  Share2,
  Download,
  PartyPopper,
  Square,
  RectangleVertical,
  RectangleHorizontal,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  WandSparklesIcon,
} from 'lucide-react';
import axios from 'axios';
import { magicBrush } from '../../assets/img/homepage/index';
import { siteName } from '../../config/envConfig';

const AIImage = () => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000000)); // Random seed
  const [model, setModel] = useState('flux');
  const [enhance, setEnhance] = useState(true);
  const [imageUrl, setImageUrl] = useState(magicBrush); // Default image path
  const [loading, setLoading] = useState(false);

  const availableModels = [
    'Flux',
    'Flux-Pro',
    'Flux-Realism',
    'Flux-Anime',
    'Flux-3D',
    'Flux-CablyAI',
    'Turbo',
  ];

  // Predefined Surprise Prompts
  const surprisePrompts = [
    ' A hyper-realistic, cinematic image of an anthropomorphic gorilla named Chef Alaric, a calm and methodical personality, chopping vegetables on a wooden counter in a cozy, magical kitchen. Chef Alaric wears a clean white apron and a rolled-up shirt, his powerful hands expertly handling a glowing knife. The kitchen features rustic wooden shelves lined with ancient recipe books and enchanted jars. The vegetables glow faintly, as if imbued with magic, and the knife levitates slightly while chopping. The lighting is dramatic, with beams of light streaming through a small window, casting long shadows and highlighting the intricate details of the scene.Hyper realistic image',
    'A hyper-realistic photo of a tiny male kitten with fluffy gray fur and round sparkling green eyes. The kitten is confidently striding down an upscale city street illuminated by cool blue and pink neon lights. The kitten is dressed in a trendy pastel hoodie with a subtle brand logo, paired with loose dark gray joggers and bright neon green sneakers. A small metallic chain hangs from its waist, adding a playful edge to the look. The background is blurred, with motion, giving the impression of a fast-paced urban vibe.',
    'A cinematic image of a striking, fierce hybrid creature soaring high in a stormy sky. The creature blends features of a tiger, eagle, and python. It has the muscular, striped body and powerful limbs of a tiger, paired with the massive wings of an eagle and the coiling tail of a python. Its claws are sharp and curved, clutching a prey. Dark storm clouds swirl around it as lightning strikes nearby, illuminating its predatory gaze and glistening feathers. Its intense, piercing eyes glow with an amber hue, creating a sense of power and dominance. The scene is dynamic and dramatic, hyper-realistic, with each detail in feathers, fur, and scales vividly visible.',
    'A super stoned lemon laughing in a lemon themed laboratory, the lemon is insane, asymmetrical, liminal, 3D, funny, mind-bendingingly interesting and perplexing, purple haze, multiple dimensions, 6D+7D+8D-1D::0,7777,43217764268,1888777331111, trololololol lemon with some unfortunate asymmetrical features',
    '1girl, bright colors, dramatic light, photoreal full body fantasy art game art, beautiful face, casting pose, beautiful girl, model girl, 21 years old, attractive grin, smokey eye shadow, high detail, rim lighting, magical, shallow depth of field, photography',
    'A cat has just stolen a fish in a fishmongers shop and runs away with it. He has a panicked look on his face because he is being chased by the fishmonger. The fish appears to be silver and of medium size. In the background, the fishmonger yells at the cat. The scene is the street of an open-air market, with stalls and people strolling.',
    'A captivating photograph of a cool-looking lion in a barbershop, receiving a stylish haircut. The lions beard is being skillfully shaved by the barber, who is focused on his work. The lions hair is styled in a trendy undercut, with the ears and neck area shaved, while the top of the hair is left longer. The background features barber tools and equipment, and theres a sense of camaraderie between the lion and the barber., portrait photography, cinematic, fashion, vibrant',
    'A captivating 3D animated portrait of a trendy young male character named ["MaThan MiThun"] confidently seated atop the iconic YouTube logo. Hans Darias AI has captured the essence of online presence. The characters spiky hair contrasts with his casual attire of a denim jacket, black shirt, and blue sneakers, creating a unique and stylish look. A speech bubble above his head reveals his age, adding a playful element to the scene. The vibrant, blue-tinted backdrop showcases a digital representation of a YouTube profile, seamlessly blending into a virtual world setting. The overall atmosphere conveys a strong sense of digital connectivity and online communication, emphasizing the characters connection to the virtual realm.',
    'A captivating and dynamic 3D render of a conceptual art piece that masterfully combines Wolverine and Deadpool into a striking split image, focusing solely on their faces. On the left, Wolverine is depicted in his iconic yellow and blue suit, exuding raw power through his intense and focused expression. On the right, Deadpool dons his red and black attire, exuding humor and charisma with a smirk. The vibrant and energetic background, filled with red and yellow hues, adds to the dynamic composition, amplifying the action and excitement. This illustration expertly encapsulates the essence of these two popular Marvel characters, highlighting their distinct strengths and personalities. The bold colors and sharp lines create an atmosphere that perfectly showcases the essence of these iconic heroes, making it an ideal poster, illustration, or painting for any comic enthusiast., poster, photo, illustration, 3d render, painting, vibrant, conceptual art',
    'A visually stunning and ultra-realistic 3D render of Spider-Man holding a sign decorated with electronic circuits and glowing LEDs. The bold, eye-catching typography on the sign reads "7000 Followers Thank You MaThanMiThun!". In the background, a diverse crowd of people are celebrating and cheering. There is a striking red neon signature, "Prompt Arena", illuminating the scene. The overall atmosphere is lively, motivating, and filled with an energetic sense of accomplishment.',
    'A captivating masterpiece featuring a chimpanzee hacker dressed to impress. The chimp wears a pair of stylish sunglasses that reflect the digital chaos of the shell code, creating a mesmerizing visual effect. Dressed in a vibrant red, black, and white "Supreme" hoodie, he wears a gold chain with a golden cross pendant. The chimp exudes unparalleled confidence and skill. Professional DSLR lighting and shadows. The background is an explosion of glitch art, with colors and shapes intertwine, amplifying the overall grandeur of the scene. The coolness factor is off the charts, reaching an unprecedented level of 1000.',
  ];

  // Function to generate a random seed
  const generateRandomSeed = () => Math.floor(Math.random() * 1000000);

  const handleGenerate = async (customWidth = null, customHeight = null) => {
    setLoading(true);
    setImageUrl(null);

    try {
      const params = {
        prompt,
        width: customWidth || width,
        height: customHeight || height,
        seed,
        model,
        enhance,
      };

      // Construct the API URL with parameters
      const queryParams = new URLSearchParams(params).toString();
      console.log('queryParams: ', queryParams);
      const response = await axios.get(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${queryParams}&nologo=true&private=true`,
        {
          responseType: 'blob', // Important: Set responseType to 'blob' for binary data
        }
      );

      // Convert the Blob to a URL and set it as the image source
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob);
      console.log('Generated image URL:', imageUrl);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `${siteName}-generated-image-${seed}.jpg`; // Specify the download filename
      a.click();
    }
  };

  const setPredefinedSizeAndGenerate = (customWidth, customHeight) => {
    setWidth(customWidth);
    setHeight(customHeight);
    handleGenerate(customWidth, customHeight); // Generate image immediately
  };

  const handleSurprisePrompt = () => {
    const randomIndex = Math.floor(Math.random() * surprisePrompts.length);
    setPrompt(surprisePrompts[randomIndex]);
  };

  const handleNextSeed = () => {
    setSeed(prevSeed => prevSeed + 1); // Increment seed
    handleGenerate(); // Generate image with updated seed
  };

  const handlePreviousSeed = () => {
    setSeed(prevSeed => Math.max(prevSeed - 1, 0)); // Decrement seed (ensure it doesn't go below 0)
    handleGenerate(); // Generate image with updated seed
  };

  return (
    <>
      {/* Left Column - Preview */}
      <div className="relative">
        <div className="aspect-[4/3] rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex flex-col justify-center bg-gray-100 animate-pulse ring-1 items-center h-full">
              <span className="text-gray-600 block animate-sparkle">
                Your image is being generated...
              </span>
              <div className="animate-spin rounded-full h-12 w-12 my-2 border-b-2 border-gray-900"></div>
              <span className="text-gray-600 block animate-sparkle">
                Please wait...
              </span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Generated Image"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            title="Previous"
            onClick={handlePreviousSeed}
            className="flex flex-col items-center justify-center w-14 h-14 bg-white shadow-md hover:shadow-lg transition-shadow px-4 py-2 rounded-md"
          >
            <ArrowLeftFromLine className="w-5 h-5 text-gray-600" />
            <span className="text-xxs font-bold text-gray-600">Previous</span>
          </button>
          <button
            title="Download"
            onClick={handleDownload}
            className="flex flex-col items-center justify-center w-14 h-14 bg-white shadow-md hover:shadow-lg transition-shadow px-4 py-2 rounded-md"
          >
            <Download className="w-5 h-5 text-gray-600" />
            <span className="text-xxs font-bold text-gray-600">Download</span>
          </button>
          <button
            title="Next"
            onClick={handleNextSeed}
            className="flex flex-col items-center justify-center w-14 h-14 bg-white shadow-md hover:shadow-lg transition-shadow px-4 py-2 rounded-md"
          >
            <ArrowRightFromLine className="w-5 h-5 text-gray-600" />
            <span className="text-xxs font-bold text-gray-600">
              Next
            </span>
          </button>
        </div>

        {/* Image Size Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPredefinedSizeAndGenerate(1024, 1024)}
            title="1024x1024"
            className="w-24 h-10 flex-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <Square className="mr-1" /> Square
          </button>
          <button
            onClick={() => setPredefinedSizeAndGenerate(768, 1344)}
            title="1344x768"
            className=" w-28 h-10 flex-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <RectangleVertical className="mr-0" /> Vertical
          </button>
          <button
            onClick={() => setPredefinedSizeAndGenerate(1344, 768)}
            title="768x1344"
            className="w-[7.5rem] h-10 flex-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <RectangleHorizontal className="mr-1" /> Horizontal
          </button>
        </div>
      </div>

      {/* Right Column - Controls */}
      <div className="space-y-6">
        <div className="glassEffect p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-white font-medium">
              1
            </div>
            <h2 className="text-gray-100 text-lg font-medium">
              Write your image prompt
            </h2>
          </div>
          <div className="border-2 border-gray-200 rounded-lg p-2">
            <label className="block text-gray-200 font-medium mb-2">
              Enter Your Prompt:
            </label>

            <div className="inline-flex relative w-full flex-col items-start gap-1.5 stroke-black transition-colors duration-300 ease-in-out focus-within:stroke-blue-700">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full resize-none rounded-lg border text-black border-slate-200 p-3 pb-5 text-xs font-normal placeholder-slate-500 outline-none transition-colors duration-300 ease-in-out scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400 focus:border-blue-600"
                placeholder="Enter your prompt here"
                rows="5"
                cols="50"
              ></textarea>
              <button
                type="button"
                onClick={handleSurprisePrompt}
                className="inline-flex text-xs absolute right-0 glass-panel bottom-0 m-2 justify-center items-center px-[0.525rem] py-1 transform duration-slow text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-700 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <PartyPopper className="w-5 h-5 mr-2" /> surprise me
                <span className="sr-only">surprise prompt</span>
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex text-xs absolute left-0 glass-panel bottom-0 m-2 justify-center items-center px-[0.525rem] py-1 transform duration-slow text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-700 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <WandSparklesIcon className="w-5 h-5" />
                <span className="sr-only">generate image</span>
              </button>
            </div>
          </div>
        </div>

        <div className="glassEffect p-3 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-white font-medium">
              2
            </div>
            <h2 className="text-gray-100 text-lg font-medium">
              Set Image Options
            </h2>
          </div>

          {/* Height and Width Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-1">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Height (px):
              </label>

              <input
                className="w-full rounded-lg border border-slate-200 px-3 text-sm font-medium placeholder-slate-400 outline-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed dark:text-gray-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400 focus:border-blue-600 py-2 mb-0.5"
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder="e.g. 512"
              />
            </div>
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Width (px):
              </label>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 text-sm font-medium placeholder-slate-400 outline-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed dark:text-gray-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400 focus:border-blue-600 py-2 mb-0.5"
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value)}
                placeholder="e.g. 512"
              />
            </div>
          </div>

          {/* Seed and Model Select Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Seed:
              </label>

              <input
                className="w-full rounded-lg border border-slate-200 px-3 text-sm font-medium placeholder-slate-400 outline-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed dark:text-gray-700 disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400 focus:border-blue-600 py-2 mb-0.5"
                type="number"
                value={seed}
                onChange={e => setSeed(e.target.value)}
                placeholder="Random seed"
              />
            </div>
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Model:
              </label>

              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-10 dark:text-gray-700 font-semibold focus:outline-none transform duration-slow dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {availableModels.map((modelName, index) => (
                  <option key={index} value={modelName.toLowerCase()}>
                    {modelName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Enhance Option */}
          <div className="flex items-center -mt-2 mb-2">
            <div className="inline-flex items-center justify-start gap-2">
              <input
                className="peer cursor-pointer rounded border-2 border-slate-400 accent-purple-600 transition-colors duration-300 ease-in-out checked:bg-blue-700 checked:hover:bg-blue-700 checked:disabled:border-slate-300 checked:disabled:bg-slate-300 checked:disabled:hover:bg-slate-300 disabled:hover:none disabled:cursor-not-allowed disabled:border-slate-200 disabled:indeterminate:border-slate-300 disabled:indeterminate:bg-slate-300 disabled:hover:bg-transparent focus:ring-transparent hover:border-blue-700 hover:bg-blue-50 indeterminate:bg-blue-700 indeterminate:disabled:hover:bg-slate-300 size-[18px]"
                type="checkbox"
                checked={enhance}
                id="enhance"
                onChange={() => setEnhance(!enhance)}
                disabled={loading}
              />
              <label
                htmlFor="enhance"
                className="font-medium transition-colors duration-300 ease-in-out peer-disabled:opacity-70 text-sm whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 hover:cursor-pointer"
              >
                Enhance Image
              </label>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handleGenerate}
            className="w-full bg-[#7C3AED] text-white py-2 rounded-full font-medium hover:bg-[#6D2AED] transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Image'}{' '}
          </button>
          <p className="text-gray-300 text-sm text-center mt-2">
            ©{new Date().getFullYear()} {'-'} {siteName} | This image is free
            for commercial use.
          </p>
        </div>
      </div>
    </>
  );
};

export default AIImage;
