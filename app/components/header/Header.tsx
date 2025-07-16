import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FiGithub, FiHeart } from "react-icons/fi";
import SignoutButton from "../auth/SignoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import Image from "next/image";
import { githubIcon } from "@/app/config/icons";
import { portifyGithubLink } from "@/app/config/constants";
import MobileHeaderFrontEnd from "./MobileHeaderFrontEnd";
const Header = async () => {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const pathname = headersList.get("x-public-pathname") || "";
  return (
    <header className="z-10 px-4 sm:px-6 py-4 sm:py-6 border-b-4 border-orange-400 bg-yellow-100/80 backdrop-blur-sm">
      <nav className="relative">
        <div className="hidden lg:flex items-center justify-between max-w-7xl mx-auto">
          <a href="/" className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <AiOutlineStar className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-100" />
            </div>
            <span className="text-lg sm:text-2xl md:text-3xl font-black text-orange-900 tracking-wider transform -skew-x-6">
              PORTIFY
            </span>
          </a>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="bg-red-500 text-yellow-100 px-3 py-2 sm:px-6 sm:py-3 rounded-none font-bold text-sm sm:text-base shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105 border-2 border-red-600 flex items-center space-x-1 sm:space-x-2">
              <FiHeart className="w-4 h-4" />
              <span>SUPPORT</span>
            </button>
            {!session?.user && pathname !== "/login" ? (
              <a
                href="/login"
                className="bg-orange-500 text-yellow-50 px-4 py-2 sm:px-8 sm:py-3 rounded-none font-bold text-sm sm:text-lg shadow-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 border-2 sm:border-4 border-orange-600 cursor-default"
              >
                Login
              </a>
            ) : pathname === "/login" ? (
              <a
                href="/"
                className="bg-orange-500 text-yellow-50 px-4 py-2 sm:px-8 sm:py-3 rounded-none font-bold text-sm sm:text-lg shadow-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 border-2 sm:border-4 border-orange-600"
              >
                HOME
              </a>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className="bg-red-500 text-yellow-100 px-3 py-2 sm:px-6 sm:py-3 rounded-none font-bold text-sm sm:text-base shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105 border-2 border-red-600 flex items-center space-x-1 sm:space-x-2"
                >
                  Dashboard
                </a>
                <SignoutButton />
              </>
            )}
            {/* Retro GitHub */}
            <a
              href={portifyGithubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 bg-orange-500 text-yellow-50 font-mono text-base border-2 sm:border-4 border-orange-600 shadow-lg hover:bg-orange-600 hover:rotate-2 hover:scale-110 transition-all duration-200 rounded-none"
            >
              <Image src={githubIcon} alt="GitHub" width={20} height={20} />
              <span className="sr-only">repo</span>
            </a>
          </div>
        </div>
        <MobileHeaderFrontEnd />
      </nav>
    </header>
  );
};

export default Header;
