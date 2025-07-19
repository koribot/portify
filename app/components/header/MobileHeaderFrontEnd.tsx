"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import SignoutButton from "../auth/SignoutButton";
import { portifyGithubLink } from "@/app/config/constants";
import { githubIcon } from "@/app/icons/icons";
import Image from "next/image";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

export default function MobileHeaderFrontEnd() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden w-full flex items-center justify-between">
      {!isOpen && (
        <a href="/" className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
            <AiOutlineStar className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-100" />
          </div>
          <span className="text-lg sm:text-2xl md:text-3xl font-black text-orange-900 tracking-wider transform -skew-x-6">
            PORTIFY
          </span>
        </a>
      )}
      <div className="w-full">
        {/* Burger button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-2 bg-orange-500 text-yellow-50 rounded shadow-lg hover:bg-orange-600 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Expanded menu */}
        {isOpen && (
          <div className="mt-4 flex flex-col space-y-4 w-full border-l-2 pl-2">
            {/* Support button */}
            <button className="flex items-center justify-center space-x-2 bg-red-500 text-yellow-100 px-4 py-2 font-bold rounded shadow hover:bg-red-600 transition transform hover:scale-105 border-2 border-red-600">
              <FiHeart className="w-4 h-4" />
              <span>SUPPORT</span>
            </button>

            {/* Auth Links */}
            {!session?.user && pathname !== "/login" ? (
              <a
                href="/login"
                className="block text-center bg-orange-500 text-yellow-50 px-4 py-2 font-bold rounded shadow hover:bg-orange-600 transition transform hover:scale-105 border-2 border-orange-600"
              >
                Login
              </a>
            ) : pathname === "/login" ? (
              <a
                href="/"
                className="block text-center bg-orange-500 text-yellow-50 px-4 py-2 font-bold rounded shadow hover:bg-orange-600 transition transform hover:scale-105 border-2 border-orange-600"
              >
                HOME
              </a>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center justify-center space-x-2 bg-red-500 text-yellow-100 px-4 py-2 font-bold rounded shadow hover:bg-red-600 transition transform hover:scale-105 border-2 border-red-600"
                >
                  Dashboard
                </a>
                <SignoutButton />
              </>
            )}

            {/* GitHub Repo Link */}
            <a
              href={portifyGithubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 text-yellow-50 font-mono rounded shadow hover:bg-orange-600 transition transform hover:scale-105 border-2 border-orange-600"
            >
              <Image src={githubIcon} alt="GitHub" width={20} height={20} />
              <span>Repo</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
