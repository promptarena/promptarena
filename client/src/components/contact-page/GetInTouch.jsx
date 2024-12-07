import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion'; // Add framer-motion for scroll effects and animations
import RandomImage from '../../utils/RandomImage';
import { useContactStore } from '../../store/contactStore';
import toast from 'react-hot-toast';
import ErrorThrower from '../base/ErrorThrower';
import EventLoggingButton from '../global/EventLoggingButton';

export default function GetInTouch() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { submitContactForm, isLoading, error } = useContactStore();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(firstName, lastName, phone, email, message);
      await submitContactForm(firstName, lastName, phone, email, message);
      // Clear the input fields only if the submission is successful
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setMessage('');
      // toast.success('Message sent successfully!');
    } catch (error) {
      // Show error message but do not clear the input fields
      toast.error(error.message || 'Failed to send message');
    }
  };

  return (
    <div className=" bg-gradient-to-br from-purple-900/30 via-purple-700/50 to-[#030303] text-white font-sans md:px-8 px-0 py-10">
      <div id="get-in-touch" className="md:max-w-5xl container mx-auto">
        {/* Title and Subtitle */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="h1 font-bold mb-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-shadow">Get in </span>
            <span className="bg-gradient-to-r from-[#9D5CFF] to-[#E17CFF] text-transparent bg-clip-text">
              Touch
            </span>
          </motion.h1>
          <motion.p
            className="text-center text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Reach out, and let's create a universe of possibilities together!
          </motion.p>
        </motion.div>

        {/* Form Section with Staggered Animation */}
        <motion.div
          className="bg-[#12121A]/40 backdrop-blur-3xl ring-1 ring-neutral-300/70 rounded-3xl md:p-8 p-6 shadow-[5px_5px_0px_0px_rgba(109,40,217)] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex-1 md:pr-8 pr-0">
            <motion.h2
              className="h4 font-bold mb-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Let's connect
            </motion.h2>

            <motion.p
              className="text-gray-400 md:mb-8 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Reach out today! Together, we can explore new horizons and achieve
              incredible results!
            </motion.p>

            {/* Form Inputs with Staggered Entrance */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="bg-[#FFFFFF1A] placeholder:text-neutral-300 placeholder:text-shadow placeholder:tracking-widest rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#9D5CFF]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                />
                <motion.input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="bg-[#FFFFFF1A] placeholder:text-neutral-300 placeholder:text-shadow placeholder:tracking-widest rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#9D5CFF]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                />
              </div>
              <motion.input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-[#FFFFFF1A] placeholder:text-neutral-300 placeholder:text-shadow placeholder:tracking-widest rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#9D5CFF]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              />
              <motion.input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="bg-[#FFFFFF1A] placeholder:text-neutral-300 placeholder:text-shadow placeholder:tracking-widest rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#9D5CFF]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              />
              <motion.textarea
                placeholder="Message"
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="bg-[#FFFFFF1A] placeholder:text-neutral-300 placeholder:text-shadow placeholder:tracking-widest rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#9D5CFF] resize-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
              />
              {/* {error && <ErrorThrower error={error} />} */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#9D5CFF] to-[#E17CFF] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                <EventLoggingButton
                  category="contact"
                  action="submit"
                  label={`${firstName} ${lastName} - ${email} - ${phone} - ${message}`}
                >
                  {isLoading ? (
                    <span className="text-white gap-5 flex-center">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Taking it to the new heights...!
                    </span>
                  ) : (
                    <span className="text-white gap-5 flex-center">
                      Take it to new heights <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </EventLoggingButton>
              </motion.button>
            </motion.form>
          </div>

          {/* Parallax Image Section */}
          <div className="flex-1 md:block hidden relative rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.5)] overflow-hidden w-full">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#12121A] to-transparent z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 0.4 }}
            ></motion.div>

            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <RandomImage classNames="w-full h-full object-cover aspect-square shadow-2xl" />
            </motion.div>

            {/* Quote Animation */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 z-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <blockquote className="text-gray-300 italic mb-2 text-sm">
                "Two lunar months revealed Earth's fragile beauty against vast
                silence, transforming my view of our place in the universe."
              </blockquote>
              <cite className="text-white font-medium text-sm">
                Irinel Traista
              </cite>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
