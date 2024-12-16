// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./config/logger'); // Custom Winston logger
const connectDB = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const morgan = require('./middlewares/loggingMiddleware'); // Morgan for HTTP logging
const cookieParser = require('cookie-parser');
const {
  VERSION,
  PORT,
  NODE_ENV,
  CLIENT_URL,
  MONGODB_URI,
  JWT_SECRET,
  MAILER_EMAILID,
  MAILER_PASSWORD,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SUPPORT_MAIL,
  APP_NAME,
} = require('./config/envConfig'); // Include NODE_ENV for environment logging
const authRoutes = require('./routes/auth.routes');
const settingsRoutes = require('./routes/settings.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const blogRoutes = require('./routes/blog.routes');
const promptRoutes = require('./routes/prompt.routes');
const reviewRoutes = require('./routes/review.routes');
const notificationRoutes = require('./routes/notification.routes');
const purchaseRoutes = require('./routes/purchase.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const contactRoutes = require('./routes/contact.routes');
const Prompt = require('./models/prompt.model');
const Blog = require('./models/blog.model');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const aiRoutes = require('./controllers/common/ai.controller');
const adminBOT = require('./controllers/admin/adminBOT');
const compression = require('compression');


// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => {
    logger.info('Database connected successfully'.green.bold);
  })
  .catch((error) => {
    logger.error('Database connection failed'.red.bold, error.message);
    process.exit(1); // Exit process on DB connection failure
  });

// Middlewares
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser());
// app.use(cors()); // Allow cross-origin requests, customize for production
// app.use(rateLimiter); // Enable rate limiting to prevent abuse
app.use(morgan); // HTTP request logger using Morgan
app.use(compression());
// app.use(cors({ origin: CLIENT_URL, credentials: true }));
// console.log('CLIENT_URL: ', CLIENT_URL);

const corsOptions = {
  origin: NODE_ENV === 'production' ? CLIENT_URL : 'http://localhost:8000',
  credentials: true,
};
app.use(cors(corsOptions));

// Log that the middlewares have been successfully loaded
logger.info('Middlewares loaded successfully'.green.bold);

// Routes
app.get('/', (req, res) => {
  res.send({
    success: true,
    message: `Welcome to ${APP_NAME} API`,
  });
});

app.get('/sitemap.xml', async (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  try {
    const smStream = new SitemapStream({
      hostname: CLIENT_URL,
    });
    const pipeline = smStream.pipe(createGzip());

    // List your static routes here with updated priorities
    const staticRoutes = [
      { url: '/', changefreq: 'daily', priority: 1.0 }, // Homepage - most important
      { url: '/explore', changefreq: 'weekly', priority: 0.9 },
      { url: '/about', changefreq: 'weekly', priority: 0.8 },
      { url: '/contact', changefreq: 'weekly', priority: 0.8 },
      { url: '/blog', changefreq: 'weekly', priority: 0.8 },
      { url: '/prompt', changefreq: 'weekly', priority: 0.8 },
      { url: '/login', changefreq: 'monthly', priority: 0.6 },
      { url: '/signup', changefreq: 'monthly', priority: 0.6 },
      { url: '/forget-password', changefreq: 'monthly', priority: 0.6 },
      { url: '/verify-email', changefreq: 'monthly', priority: 0.6 },
      { url: '/*', changefreq: 'monthly', priority: 0.5 }, // Wildcard for other pages
    ];

    staticRoutes.forEach((route) => {
      smStream.write(route);
    });

    // Fetch prompts and add to sitemap
    const prompts = await Prompt.find({}).select('_id updatedAt');
    prompts.forEach((prompt) => {
      smStream.write({
        url: `/prompt/${prompt._id}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: prompt.updatedAt,
      });
    });

    // Fetch blog posts and add to sitemap
    const blogs = await Blog.find({});
    blogs.forEach((blog) => {
      smStream.write({
        url: `/blog/${blog._id}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: blog.updatedAt,
      });
    });

    // Add your dynamic routes here, for example:
    const categories = await Prompt.distinct('category');
    categories.forEach((category) => {
      smStream.write({
        url: `/prompts/category/${category}`,
        changefreq: 'monthly',
        priority: 0.5,
      });
    });

    const tags = await Prompt.distinct('tags');
    tags.forEach((tag) => {
      smStream.write({
        url: `/prompts/tag/${tag}`,
        changefreq: 'monthly',
        priority: 0.5,
      });
    });
    smStream.end();
    pipeline.pipe(res).on('error', (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

//API Routes
app.use(`/api/${VERSION}/auth`, authRoutes);
app.use(`/api/${VERSION}/settings`, settingsRoutes);
app.use(`/api/${VERSION}/user`, userRoutes);
app.use(`/api/${VERSION}/admin`, adminRoutes);
app.use(`/api/${VERSION}/blog`, blogRoutes);
app.use(`/api/${VERSION}/prompt`, promptRoutes);
app.use(`/api/${VERSION}/review`, reviewRoutes);
app.use(`/api/${VERSION}/notification`, notificationRoutes);
app.use(`/api/${VERSION}/purchase`, purchaseRoutes);  
// Newsletter Routes
app.use(`/api/${VERSION}/newsletter`, newsletterRoutes);
// Contact Form Routes
app.use(`/api/${VERSION}/contact`, contactRoutes);
// AI Routes
app.use(`/api/${VERSION}/ai`, aiRoutes);
app.use(`/api/${VERSION}/admin_bot`, adminBOT);

// Log that the routes have been registered
logger.info('Routes registered successfully'.green.bold);

// Error handling middleware (should be after all routes)
app.use(errorHandler);

app.use((req, res, next) => {
  console.log('Incoming request:', req.headers);
  next();
});

// Catch any unhandled routes and return a 404
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Start the server
const server = app.listen(PORT, () => {
  logger.info(
    `Server running in ${NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold
  );
});

// Graceful shutdown for SIGINT and SIGTERM
const shutdown = () => {
  logger.info('Gracefully shutting down...'.red.bold);
  server.close(() => {
    logger.info('Closed out remaining connections.'.red.bold);
    process.exit(0); // Exit when all connections are closed
  });

  // Force exit if it takes too long
  setTimeout(() => {
    logger.error('Forcefully shutting down due to timeout.'.red.bold);
    process.exit(1);
  }, 60000); // 60 seconds timeout
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
