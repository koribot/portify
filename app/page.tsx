import { FiMousePointer, FiCode, FiLayers, FiArrowRight, FiPlay, FiHeart } from "react-icons/fi"
import { AiOutlineStar } from "react-icons/ai"
import type { Feature } from "./types"
import InteractiveFeatures from "./components/home/InteractiveFeatures"

export default function Home() {
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
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Multiple Templates",
      description: "Portfolio, resume, and business templates",
    },
  ]

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
      <header className="relative z-10 px-4 sm:px-6 py-4 sm:py-6 border-b-4 border-orange-400 bg-yellow-100/80 backdrop-blur-sm">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
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
            <a href="/login" className="bg-orange-500 text-yellow-50 px-4 py-2 sm:px-8 sm:py-3 rounded-none font-bold text-sm sm:text-lg shadow-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 border-2 sm:border-4 border-orange-600 cursor-default">
              Login
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <div className="inline-block px-4 sm:px-8 py-2 sm:py-3 bg-red-500 text-yellow-100 font-bold text-sm sm:text-lg tracking-wide mb-6 sm:mb-8 transform -rotate-2 shadow-lg">
              ★ Build Your online Presence, Portfolio, resume, or Landing Page - free and open source ★
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
            <span className="sm:hidden"> </span>It's free forever.
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
      <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16 border-t-4 border-orange-400 bg-gradient-to-br from-yellow-100 to-orange-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6 md:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <AiOutlineStar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-100" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-orange-900 tracking-wider transform -skew-x-6">
              PORTFOLIO * RESUME * LANDINGPAGE MAKER
            </span>
          </div>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-red-500 mx-auto mb-4 sm:mb-6 transform rotate-1"></div>
          <p className="text-orange-700 font-bold tracking-wide text-sm sm:text-base">© 2025 • MADE FOR CREATORS</p>
        </div>
      </footer>
    </div>
  )
}
