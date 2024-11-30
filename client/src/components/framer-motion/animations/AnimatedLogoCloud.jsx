import React from 'react';
import {
  bardSVG,
  claudeSVG,
  gemmaSVG,
  groqSVG,
  leonardoSVG,
  metaSVG,
  microsoftcopilotSVG,
  mistralSVG,
  openaiSVG,
  perplexitySVG,
  phindSVG,
  piclumenSVG,
  reminiSVG,
  togetheraiSVG,
} from '../../../assets/img/common';

const logos = [
  {
    name: 'OpenAI',

    url: openaiSVG,
  },
  {
    name: 'Groq',
    url: groqSVG,
  },
  {
    name: 'Claude',
    url: claudeSVG,
  },
  {
    name: 'Gemma',
    url: gemmaSVG,
  },
  {
    name: 'Mistral',
    url: mistralSVG,
  },
  {
    name: 'Phind',
    url: phindSVG,
  },
  //   {
  //     name: 'Microsoft Copilot',
  //     url: microsoftcopilotSVG,
  //   },
  {
    name: 'Bard',
    url: bardSVG,
  },

  {
    name: 'Remini',
    url: reminiSVG,
  },
  {
    name: 'Meta',
    url: metaSVG,
  },
];

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
            WebkitMaskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-10 w-28 px-2 brightness-0 dark:invert"
                    alt={logo.name}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
