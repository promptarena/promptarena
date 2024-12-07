// import React, { useState } from 'react';
// import axios from 'axios';

// const AIGeneratedContent = () => {
//   const [prompt, setPrompt] = useState('');
//   const [width, setWidth] = useState(1104);
//   const [height, setHeight] = useState(1734);
//   const [seed, setSeed] = useState(1088606);
//   const [model, setModel] = useState('flux');
//   const [enhance, setEnhance] = useState(true);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     setImageUrl(null);

//     try {
//       const params = {
//         prompt,
//         width,
//         height,
//         seed,
//         model,
//         enhance,
//       };

//       // Construct the API URL with parameters
//       const queryParams = new URLSearchParams(params).toString();
//       const response = await axios.get(
//         `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${queryParams}`,
//         {
//           responseType: 'blob', // Important: Set responseType to 'blob' for binary data
//         }
//       );

//       // Convert the Blob to a URL and set it as the image source
//       const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
//       const imageUrl = URL.createObjectURL(imageBlob);
//       setImageUrl(imageUrl);
//     } catch (error) {
//       console.error('Error generating image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>AI Image Generator</h2>
//       <div style={{ marginBottom: '10px' }}>
//         <label>
//           Prompt:
//           <input
//             type="text"
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
//             <option value="flux">Flux</option>
//             <option value="stable-diffusion">Stable Diffusion</option>
//             <option value="vqgan">VQGAN</option>
//             {/* Add other models as needed */}
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
//       </div>
//       <button onClick={handleGenerate} style={{ marginBottom: '20px' }}>
//         Generate
//       </button>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         imageUrl && (
//           <div>
//             <img
//               src={imageUrl}
//               alt="Generated AI Image"
//               style={{ maxWidth: '100%', maxHeight: '500px' }}
//             />
//           </div>
//         )
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
  const [seed, setSeed] = useState(1088606);
  const [model, setModel] = useState('flux');
  const [enhance, setEnhance] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
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

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(null);

    try {
      const params = {
        prompt,
        width,
        height,
        seed,
        model,
        enhance,
      };

      // Construct the API URL with parameters
      const queryParams = new URLSearchParams(params).toString();
      console.log('queryParams: ', queryParams);
      const response = await axios.get(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${queryParams}&nologo=True`,
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Image Generator</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Prompt:
          <input
            type="text"
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
      </div>
      <button onClick={handleGenerate} style={{ marginBottom: '20px' }}>
        Generate
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Generated AI Image"
              style={{ maxWidth: '100%', maxHeight: '500px' }}
            />
            <br />
            <button onClick={handleDownload} style={{ marginTop: '10px' }}>
              Download Image
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default AIGeneratedContent;
