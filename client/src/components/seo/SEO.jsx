import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types'; // For type checking (recommended)
import { siteName } from '../../config/envConfig';
import { useEffect, useState } from 'react';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';

const defaultTitle = `${siteName} - The Best Free AI Prompt Marketplace`;
const defaultDescription = `Discover and use free AI prompts for text generation, image creation, and more. Unleash your creativity with ${siteName}'s free prompt library.`;
const defaultImage =
  'https://promptarena.vercel.app/promptarena/images/promptarena-og-card.jpg';
const defaultAuthorName = 'Mathanraj Murugesan';

const SEO = ({
  title,
  description,
  image,
  url,
  keywords,
  article, // For blog posts
  locale, // For internationalization
  noindex,
  twitterUsername, // For Twitter card
}) => {
  const [currentURL, setCurrentURL] = useState('');
  const defaultUrl = currentURL;

  // Safely set the current URL in the browser
  useEffect(() => {
    setCurrentURL(getCurrentSiteUrl());
  }, []);

  // Schema.org structured data (JSON-LD)
  const schemaOrgJSONLD = {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'Website', // "Website" is more appropriate for non-article pages
    name: title || defaultTitle,
    headline: title || defaultTitle, // Add headline for articles
    description: description || defaultDescription,
    image: image || defaultImage,
    url: url || defaultUrl,
    ...(article && {
      // Conditionally add Article properties
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime,
      author: {
        '@type': 'Person',
        name: siteName || defaultAuthorName, // Or the actual author's name if available
      },
    }),

    // Add Organization schema
    ...(article
      ? {}
      : {
          // Only add for Website type
          publisher: {
            '@type': 'Organization',
            name: siteName || defaultAuthorName,
            logo: {
              '@type': 'ImageObject',
              url: defaultImage, // URL of your site's logo
            },
          },
        }),
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" /> {/* Important for character encoding */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta
        name="keywords"
        content={
          keywords ||
          'free AI prompts, AI prompts, prompt library, free prompts, AI art, AI writing, AI tools, creative prompts'
        }
      />
      <meta name="author" content={defaultAuthorName} />
      <meta name="publisher" content={defaultAuthorName} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />{' '}
      {/* For IE compatibility */}
      <meta name="robots" content={noindex ? 'noindex' : 'index, follow'} />
      {/* Language and Locale */}
      <meta name="language" content={locale || 'en-US'} />
      {locale && <html lang={locale} />}
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:site_name" content={siteName || defaultTitle} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      {article && (
        <meta
          property="og:article:published_time"
          content={article.publishedTime}
        />
      )}
      {article && (
        <meta
          property="og:article:modified_time"
          content={article.modifiedTime}
        />
      )}
      {article &&
        article.tags &&
        article.tags.map(tag => (
          <meta property="og:article:tag" content={tag} key={tag} />
        ))}
      {/* Twitter Card Tags */}
      <meta
        name="twitter:card"
        content="https://promptarena.vercel.app/promptarena/images/promptarena-og-card.jpg"
      />
      {twitterUsername && (
        <meta
          name="twitter:creator"
          content={twitterUsername || '@defaultTwitterHandle'}
        />
      )}{' '}
      {/* Your Twitter handle */}
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:site" content={url || defaultUrl} />
      {/* Canonical URL (Important to prevent duplicate content issues) */}
      <link rel="canonical" href={url || defaultUrl} />
      {/* Additional Meta Tags from index.html */}
      <meta name="apple-mobile-web-app-title" content="PromptArena" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      {/* Other Meta Tags */}
      <link rel="manifest" href="/manifest.json" />
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  keywords: PropTypes.string,
  article: PropTypes.shape({
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  noindex: PropTypes.bool,
  locale: PropTypes.string,
  twitterUsername: PropTypes.string,
};

export default SEO;
