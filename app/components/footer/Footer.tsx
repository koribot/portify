import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import Logo from "../svgs/Logo";

const Footer = () => {
  return (
    <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16 border-t-4 border-orange-400 bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6 md:mb-8">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
            {/* <AiOutlineStar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-100" /> */}
            <Logo />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-black text-orange-900 tracking-wider transform -skew-x-6">
            PORTFOLIO * RESUME * LANDINGPAGE MAKER
          </span>
        </div>
        <div className="w-20 sm:w-24 md:w-32 h-1 bg-red-500 mx-auto mb-4 sm:mb-6 transform rotate-1"></div>
        <p className="text-orange-700 font-bold tracking-wide text-sm sm:text-base">
          © 2025 • MADE FOR CREATORS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
