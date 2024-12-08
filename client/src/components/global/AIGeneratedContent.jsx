// import React, { useState } from 'react';
// import axios from 'axios';

// const AIGeneratedContent = () => {
//   const [prompt, setPrompt] = useState('');
//   const [width, setWidth] = useState(1104);
//   const [height, setHeight] = useState(1734);
//   const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000000)); // Random seed
//   const [model, setModel] = useState('flux');
//   const [enhance, setEnhance] = useState(true);
//   const [imageUrl, setImageUrl] = useState('/path-to-your-default-image.jpg'); // Default image path
//   const [loading, setLoading] = useState(false);

//   const availableModels = [
//     'Flux',
//     'Flux-Pro',
//     'Flux-Realism',
//     'Flux-Anime',
//     'Flux-3D',
//     'Flux-CablyAI',
//     'Turbo',
//   ];

//   // Predefined Surprise Prompts
//   const surprisePrompts = [
//     ' A cinematic image of an anthropomorphic gorilla',
//     ' A surreal image of a cat',
//     ];

//   // Function to generate a random seed
//   const generateRandomSeed = () => Math.floor(Math.random() * 1000000);

//   const handleGenerate = async (customWidth = null, customHeight = null) => {
//     setLoading(true);
//     setImageUrl(null);

//     try {
//       const params = {
//         prompt,
//         width: customWidth || width,
//         height: customHeight || height,
//         seed,
//         model,
//         enhance,
//       };

//       // Construct the API URL with parameters
//       const queryParams = new URLSearchParams(params).toString();
//       console.log('queryParams: ', queryParams);
//       const response = await axios.get(
//         `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${queryParams}&nologo=true&private=true`,
//         {
//           responseType: 'blob', // Important: Set responseType to 'blob' for binary data
//         }
//       );

//       // Convert the Blob to a URL and set it as the image source
//       const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
//       const imageUrl = URL.createObjectURL(imageBlob);
//       console.log('Generated image URL:', imageUrl);
//       setImageUrl(imageUrl);
//     } catch (error) {
//       console.error('Error generating image:', error);
//     } finally {
//       setSeed(generateRandomSeed()); // Generate a new seed for next generation
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (imageUrl) {
//       const a = document.createElement('a');
//       a.href = imageUrl;
//       a.download = 'generated-image.jpg'; // Specify the download filename
//       a.click();
//     }
//   };

//   const setPredefinedSizeAndGenerate = (customWidth, customHeight) => {
//     setWidth(customWidth);
//     setHeight(customHeight);
//     handleGenerate(customWidth, customHeight); // Generate image immediately
//   };

//   const handleSurprisePrompt = () => {
//     const randomIndex = Math.floor(Math.random() * surprisePrompts.length);
//     setPrompt(surprisePrompts[randomIndex]);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>AI Image Generator</h2>
//       <div style={{ marginBottom: '10px' }}>
//         <label>
//           Prompt:
//           <textarea
//             title="Prompt"
//             value={prompt}
//             onChange={e => setPrompt(e.target.value)}
//             style={{ width: '100%', marginBottom: '10px' }}
//           />
//         </label>
//         <label>
//           Width:
//           <input
//             type="number"
//             value={width}
//             onChange={e => setWidth(Number(e.target.value))}
//             style={{ width: '100%', marginBottom: '10px' }}
//           />
//         </label>
//         <label>
//           Height:
//           <input
//             type="number"
//             value={height}
//             onChange={e => setHeight(Number(e.target.value))}
//             style={{ width: '100%', marginBottom: '10px' }}
//           />
//         </label>
//         <label>
//           Seed:
//           <input
//             type="number"
//             value={seed}
//             onChange={e => setSeed(Number(e.target.value))}
//             style={{ width: '100%', marginBottom: '10px' }}
//           />
//         </label>
//         <label>
//           Model:
//           <select
//             value={model}
//             onChange={e => setModel(e.target.value)}
//             style={{ width: '100%', marginBottom: '10px' }}
//           >
//             {availableModels.map((modelName, index) => (
//               <option key={index} value={modelName.toLowerCase()}>
//                 {modelName}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Enhance:
//           <input
//             type="checkbox"
//             checked={enhance}
//             onChange={e => setEnhance(e.target.checked)}
//             style={{ marginBottom: '10px' }}
//           />
//         </label>
//         <div>
//           <button onClick={() => setPredefinedSizeAndGenerate(1024, 1024)}>
//             1024x1024
//           </button>
//           <button onClick={() => setPredefinedSizeAndGenerate(1344, 768)}>
//             1344x768
//           </button>
//           <button onClick={() => setPredefinedSizeAndGenerate(768, 1344)}>
//             768x1344
//           </button>
//         </div>
//         <button onClick={handleSurprisePrompt} style={{ marginTop: '10px' }}>
//           Surprise Me!
//         </button>
//       </div>
//       <button onClick={() => handleGenerate()} style={{ marginBottom: '20px' }}>
//         Generate
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <img
//             src={imageUrl}
//             alt="Generated AI Image"
//             style={{ maxWidth: '100%', maxHeight: '500px' }}
//           />
//           <br />
//           {imageUrl !== '/path-to-your-default-image.jpg' && (
//             <button onClick={handleDownload} style={{ marginTop: '10px' }}>
//               Download Image
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIGeneratedContent;


import React, { useState } from 'react';
import axios from 'axios';

const AIGeneratedContent = () => {
  const [prompt, setPrompt] = useState('');
  const [width, setWidth] = useState(1104);
  const [height, setHeight] = useState(1734);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000000)); // Random seed
  const [model, setModel] = useState('flux');
  const [enhance, setEnhance] = useState(true);
  const [imageUrl, setImageUrl] = useState('/path-to-your-default-image.jpg'); // Default image path
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
    'A cinematic image of an anthropomorphic gorilla',
    'A surreal image of a cat',
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
      a.download = 'generated-image.jpg'; // Specify the download filename
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
    <div style={{ padding: '20px' }}>
      <h2>AI Image Generator</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Prompt:
          <textarea
            title="Prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </label>
        <label>
          Seed:
          <input
            type="number"
            value={seed}
            onChange={e => setSeed(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </label>
        <label>
          Model:
          <select
            value={model}
            onChange={e => setModel(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            {availableModels.map((modelName, index) => (
              <option key={index} value={modelName.toLowerCase()}>
                {modelName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Enhance:
          <input
            type="checkbox"
            checked={enhance}
            onChange={e => setEnhance(e.target.checked)}
            style={{ marginBottom: '10px' }}
          />
        </label>
        <div>
          <button onClick={() => setPredefinedSizeAndGenerate(1024, 1024)}>
            1024x1024
          </button>
          <button onClick={() => setPredefinedSizeAndGenerate(1344, 768)}>
            1344x768
          </button>
          <button onClick={() => setPredefinedSizeAndGenerate(768, 1344)}>
            768x1344
          </button>
        </div>
        <button onClick={handleSurprisePrompt} style={{ marginTop: '10px' }}>
          Surprise Me!
        </button>
      </div>
      <div>
        <button onClick={handlePreviousSeed} style={{ marginRight: '10px' }}>
          Previous
        </button>
        <button onClick={handleNextSeed}>Next</button>
      </div>
      <button
        onClick={() => handleGenerate()}
        style={{ marginBottom: '20px', marginTop: '20px' }}
      >
        Generate
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img
            src={imageUrl}
            alt="Generated AI Image"
            style={{ maxWidth: '100%', maxHeight: '500px' }}
          />
          <br />
          {imageUrl !== '/path-to-your-default-image.jpg' && (
            <button onClick={handleDownload} style={{ marginTop: '10px' }}>
              Download Image
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AIGeneratedContent;
