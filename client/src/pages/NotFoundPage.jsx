// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="h-screen flex items-center justify-center flex-col">
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    <p className="text-lg mt-4">
      Sorry, the page you're looking for doesn't exist.
    </p>
    <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
