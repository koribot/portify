import {
  FiMousePointer,
  FiCode,
  FiLayers,
  FiArrowRight,
  FiPlay,
  FiHeart,
} from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import type { Feature } from "./types";
import InteractiveFeatures from "./components/home/InteractiveFeatures";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import UserAnimatedCharacter from "./components/animation/UserAnimatedCharacter";
import { portifyGithubLink } from "./config/constants";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const features: Feature[] = [
    {
      icon: <FiMousePointer className="w-8 h-8" />,
      title: "Drag & Drop Builder",
      description: "Intuitive visual editor with real-time preview",
    },
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Custom Scripts",
      description: "Add advanced functionality with JavaScript",
    },
    // {
    //   icon: <FiLayers className="w-8 h-8" />,
    //   title: "Multiple Templates",
    //   description: "Portfolio, resume, and business templates",
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50 text-orange-900">
      {/* Retro geometric background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-yellow-400 transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-500 rounded-full"></div>
        <div className="absolute top-64 left-1/2 w-20 h-20 bg-red-500 transform -rotate-45"></div>
      </div>
      {/* Retro grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
          linear-gradient(orange 1px, transparent 1px),
          linear-gradient(90deg, orange 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="hidden absolute inset-0 2xl:grid grid-cols-3 items-center pointer-events-none">
          <div className="flex justify-center">
            <UserAnimatedCharacter />
          </div>
          <div></div> {/* Empty middle column */}
          <div className="flex justify-center">
            <UserAnimatedCharacter />
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <div className="inline-block px-4 sm:px-8 py-2 sm:py-3 bg-red-500 text-yellow-100 font-bold text-sm sm:text-lg tracking-wide mb-6 sm:mb-8 transform -rotate-2 shadow-lg">
              ★ Build Your online Presence, Portfolio, resume, or Landing Page -
              FREE ★
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black mb-8 sm:mb-12 text-orange-900 leading-none tracking-wider transform -skew-x-3">
            BUILD
            <br />
            <span className="text-red-600">YOUR PRESENCE</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 sm:mb-16 text-orange-800 max-w-4xl mx-auto leading-relaxed font-bold px-4">
            Create awesome portfolios, resume, landing page with drag & drop.
            <br className="hidden sm:block" />
            {/* <span className="sm:hidden"> </span>It's free  */}
            {/* <a href={portifyGithubLink} target="_blank" className="underline text-red-500">
              open source
            </a> */}
            
          </p>
          <div className="flex flex-col gap-4 sm:gap-8 justify-center items-center">
            <button className="group bg-red-500 text-yellow-100 px-8 sm:px-12 py-4 sm:py-6 font-black text-lg sm:text-xl hover:bg-red-600 transition-all duration-200 flex items-center space-x-2 sm:space-x-4 shadow-xl transform hover:scale-105 border-2 sm:border-4 border-red-600 w-full sm:w-auto justify-center">
              <FiPlay className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>GET STARTED</span>
              <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 sm:px-12 py-4 sm:py-6 font-black text-lg sm:text-xl border-2 sm:border-4 border-orange-500 text-orange-900 hover:bg-orange-100 transition-all duration-200 shadow-lg transform hover:scale-105 w-full sm:w-auto">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Interactive */}
      <InteractiveFeatures features={features} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
