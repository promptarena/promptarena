import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: 'Main',
      links: [
        { label: 'Dashboard', path: '/admin/' },
        { label: 'Users', path: '/admin/users' },
        { label: 'Reports', path: '/admin/reports' },
      ],
    },
    {
      title: 'Settings',
      links: [
        { label: 'Profile', path: '/admin/profile' },
        { label: 'System Settings', path: '/admin/settings' },
        { label: 'Log Out', path: '/logout' },
      ],
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md shadow-lg focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-x-0 w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform ${
          isOpen
            ? 'translate-x-0 shadow-lg p-4'
            : '-translate-x-full shadow-none p-0 mt-4'
        } lg:translate-x-0 transition-transform duration-300 z-40 overflow-y-auto`}
      >
        {menuItems.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {section.title}
            </h3>
            {section.links.map((link, linkIndex) => (
              <NavLink
                key={linkIndex}
                to={link.path}
                className="flex items-center text-gray-600 hover:text-indigo-800 py-2 transition-all duration-300 hover:translate-x-1"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
        <button
          className="lg:hidden float-right text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={toggleSidebar}
        >
          <X size={24} />
        </button>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 lg:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
