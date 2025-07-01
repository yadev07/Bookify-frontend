import React from 'react';

const Footer = () => (
  <footer className="bg-black text-white py-8 mt-12 w-full">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 gap-5 text-center md:text-left">
      <div className="text-lg md:text-xl font-bold tracking-wide text-white">Bookify &copy; {new Date().getFullYear()}</div>
      <div className="text-sm md:text-base text-gray-400 mt-2 md:mt-0">Made with <span className="text-red-400">&#10084;</span> by Bookify Team</div>
    </div>
  </footer>
);

export default Footer; 