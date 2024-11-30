// src/components/global/NewsletterSubscription.jsx
import React, { useState } from 'react';
import { Input } from '../base/Input';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNewsletterStore } from '../../store/useNewsletterStore';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const { subscribeToNewsletter, isLoading } = useNewsletterStore();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await subscribeToNewsletter(email);
      setEmail('');
      toast.success('Subscribed successfully!');
    } catch (error) {
      toast.error(error.message || 'Subscription failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <Input
        icon={Mail}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default NewsletterSubscription;
