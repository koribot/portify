"use client";

import { FiZap } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface UserAnimatedCharacterProps {
  name?: string | null;
  email?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function UserAnimatedCharacter({
  size = "md",
}: UserAnimatedCharacterProps) {
  const { data: session, status } = useSession();
  const userName: string | null | undefined = session?.user?.name;
  const userEmail: string | null | undefined = session?.user?.email;
  const avatar: string | null | undefined = session?.user?.image;

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get initials from name or email
  const getInitials = () => {
    if (userName) {
      return userName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (userEmail) {
      return userEmail[0].toUpperCase();
    }
    return "?";
  };

  const displayName = userName || userEmail?.split("@")[0] || "Robot User";

  // Size configurations with improved face sizing
  const sizeConfig = {
    sm: {
      container: "w-16 h-20",
      head: "w-12 h-12", // Made more square for better face area
      body: "w-14 h-12",
      text: "text-lg",
      nameText: "text-sm",
      padding: "p-4",
      avatarSize: 32, // Proper avatar size
      faceArea: "inset-1", // Larger face area
    },
    md: {
      container: "w-20 h-24",
      head: "w-16 h-16", // Made more square
      body: "w-18 h-16",
      text: "text-xl",
      nameText: "text-base",
      padding: "p-6",
      avatarSize: 48,
      faceArea: "inset-1",
    },
    lg: {
      container: "w-24 h-28",
      head: "w-20 h-20", // Made more square
      body: "w-22 h-20",
      text: "text-2xl",
      nameText: "text-lg",
      padding: "p-8",
      avatarSize: 64,
      faceArea: "inset-1",
    },
    xl: {
      container: "w-32 h-36",
      head: "w-24 h-24", // Made more square
      body: "w-28 h-24",
      text: "text-3xl",
      nameText: "text-xl",
      padding: "p-10",
      avatarSize: 80,
      faceArea: "inset-1",
    },
  };

  const config = sizeConfig[size];

  if (!session) return null;
  return (
    <div
      className={`relative transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Floating retro elements */}
      <div className="absolute -top-6 -left-6 animate-bounce delay-100">
        <div className="w-4 h-4 bg-cyan-400 transform rotate-45 animate-pulse"></div>
      </div>
      <div className="absolute -top-4 -right-8 animate-bounce delay-300">
        <FiZap
          className="w-5 h-5 text-yellow-400 animate-spin"
          style={{ animationDuration: "3s" }}
        />
      </div>
      <div className="absolute -bottom-6 -right-4 animate-bounce delay-500">
        <div className="w-3 h-6 bg-pink-400 animate-pulse"></div>
      </div>

      {/* Main robot character container */}
      <div
        className={`relative transform transition-all duration-300 ${
          isHovered ? "scale-110 rotate-2" : "scale-100 rotate-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Robot body background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 to-purple-600/30 blur-xl rounded-lg"></div>

        {/* Robot container */}
        <div className={`relative ${config.container} mx-auto`}>
          {/* Robot antenna */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-4 bg-gradient-to-t from-gray-600 to-yellow-400 rounded-full"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Robot helmet/face area */}
          <div
            className={`${config.head} mx-auto bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-xl border-2 border-gray-600 shadow-lg relative overflow-hidden`}
          >
            {/* Helmet visor frame */}
            <div className="absolute inset-1 rounded-lg border-2 border-cyan-400/50 bg-gradient-to-b from-cyan-100/20 to-purple-100/20"></div>

            {/* Helmet panel lines */}
            <div className="absolute top-0 left-2 right-2 h-px bg-gray-200"></div>
            <div className="absolute bottom-0 left-2 right-2 h-px bg-gray-600"></div>

            {/* Side helmet details */}
            <div className="absolute top-1 left-1 w-1 h-3 bg-gray-600 rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-3 bg-gray-600 rounded-full"></div>

            {/* Main face area - IMPROVED */}
            <div
              className={`absolute ${config.faceArea} rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-inner border-2 border-cyan-400/50 overflow-hidden`}
            >
              {/* Face content */}
              {avatar ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg"></div>
                  <Image
                    className="rounded-lg object-cover shadow-lg border border-cyan-400/30 relative z-10"
                    src={avatar || "/placeholder.svg"}
                    alt={displayName}
                    width={config.avatarSize}
                    height={config.avatarSize}
                    style={{
                      width: "90%",
                      height: "90%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
                </div>
              ) : userName || userEmail ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Background for initials */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg"></div>
                  <span
                    className={`${config.text} font-black text-white drop-shadow-lg relative z-10`}
                  >
                    {getInitials()}
                  </span>
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse"></div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Default robot face */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-1">
                    {/* Robot eyes */}
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                    {/* Robot mouth */}
                    <div className="w-4 h-1 bg-cyan-400 rounded-full opacity-80"></div>
                  </div>
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Helmet HUD elements */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <div
                className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="w-1 h-1 bg-red-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>

            {/* Bottom helmet status bar */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black rounded-full border border-cyan-400/50">
              <div className="w-full h-full bg-gradient-to-r from-green-400/50 to-cyan-400/50 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Robot body */}
          <div
            className={`${config.body} mx-auto mt-1 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 rounded-lg border-2 border-gray-700 shadow-lg relative overflow-hidden`}
          >
            {/* Body panels */}
            <div className="absolute top-2 left-2 right-2 h-px bg-gray-300"></div>
            <div className="absolute top-4 left-2 right-2 h-px bg-gray-600"></div>

            {/* Control buttons */}
            <div className="absolute top-1 right-1 flex flex-col space-y-1">
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="w-1 h-1 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>

            {/* Chest panel */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black rounded border border-cyan-400">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Robot arms */}
          <div className="absolute top-6 -left-2 w-3 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full border border-gray-700 transform -rotate-12"></div>
          <div className="absolute top-6 -right-2 w-3 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full border border-gray-700 transform rotate-12"></div>
        </div>

        {/* Holographic base */}
        <div className="mt-2 relative">
          <div className="w-16 h-2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full mx-auto animate-pulse"></div>
          <div
            className="absolute inset-0 w-20 h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent rounded-full mx-auto animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Name display with retro styling */}
      <div className="mt-4 text-center">
        <div
          className={`inline-block px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-mono ${
            config.nameText
          } font-bold tracking-wider transform transition-all duration-300 shadow-lg border border-cyan-400 ${
            isHovered ? "-rotate-1 scale-105" : "rotate-0"
          }`}
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="animate-pulse text-yellow-400">▶</span>
            <span className="truncate max-w-32">
              {displayName.length > 12
                ? `${displayName.slice(0, 12)}...`
                : displayName}
            </span>
            <span className="animate-pulse text-yellow-400">◀</span>
          </div>
        </div>
        {/* Subtitle with retro effect */}
        <p className="mt-2 text-cyan-600 font-mono text-xs font-bold animate-pulse tracking-widest">
          {userName ? "SYSTEM ONLINE" : "READY TO EXECUTE"}
        </p>
      </div>

      {/* Floating retro geometric shapes */}
      <div
        className="absolute top-1/3 -left-8 w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-600 transform rotate-45 animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "2s" }}
      ></div>
      <div
        className="absolute top-1/4 -right-8 w-4 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "2.5s" }}
      ></div>
      <div
        className="absolute bottom-1/3 -left-6 w-2 h-4 bg-gradient-to-t from-purple-400 to-cyan-400 transform rotate-12 animate-bounce"
        style={{ animationDelay: "1.5s", animationDuration: "3s" }}
      ></div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-30"
          style={{
            top: "50%",
            animation: "scan 3s linear infinite",
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
