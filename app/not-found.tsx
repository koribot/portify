import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi"
import { AiOutlineStar } from "react-icons/ai"
import Link from "next/link"

export default function NotFoundPage() {
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
          <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <AiOutlineStar className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-100" />
            </div>
            <span className="text-lg sm:text-2xl md:text-3xl font-black text-orange-900 tracking-wider transform -skew-x-6">
              PORTIFY
            </span>
          </Link>
          <Link href="/" className="bg-orange-500 text-yellow-50 px-4 py-2 sm:px-6 sm:py-3 rounded-none font-bold text-sm sm:text-base shadow-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 border-2 border-orange-600 flex items-center space-x-1 sm:space-x-2">
            <FiHome className="w-4 h-4" />
            <span>HOME</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Error Badge */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-block px-4 sm:px-8 py-2 sm:py-3 bg-red-500 text-yellow-100 font-bold text-sm sm:text-lg tracking-wide mb-6 sm:mb-8 transform -rotate-2 shadow-lg">
              ★ OOPS! PAGE NOT FOUND ★
            </div>
          </div>

          {/* 404 Display */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black text-orange-900 leading-none tracking-wider transform -skew-x-3 mb-4">
              404
            </h1>
            <div className="w-20 sm:w-32 h-2 bg-red-500 mx-auto transform rotate-1 mb-6"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-red-600 leading-tight tracking-wide transform -skew-x-1">
              PAGE DOESN'T EXIST
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-orange-800 max-w-2xl mx-auto leading-relaxed font-bold px-4">
              The page you're looking for has vanished into the digital void!
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>But don't worry, you can navigate back to safety.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/" className="group bg-red-500 text-yellow-100 px-6 sm:px-8 py-3 sm:py-4 font-black text-lg sm:text-xl hover:bg-red-600 transition-all duration-200 flex items-center space-x-2 sm:space-x-3 shadow-xl transform hover:scale-105 border-2 sm:border-4 border-red-600 w-full sm:w-auto justify-center">
              <FiHome className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>GO HOME</span>
            </Link>
            
            {/* <Link href="/search" className="group bg-orange-500 text-yellow-100 px-6 sm:px-8 py-3 sm:py-4 font-black text-lg sm:text-xl hover:bg-orange-600 transition-all duration-200 flex items-center space-x-2 sm:space-x-3 shadow-xl transform hover:scale-105 border-2 sm:border-4 border-orange-600 w-full sm:w-auto justify-center">
              <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>SEARCH</span>
            </Link> */}
          </div>

          {/* Helpful Links */}
          {/* <div className="mt-12 sm:mt-16">
            <p className="text-orange-700 font-bold text-sm sm:text-base mb-4">
              Try these popular pages:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
              <Link href="/about" className="bg-yellow-200 text-orange-900 px-3 py-2 font-bold text-sm hover:bg-yellow-300 transition-all duration-200 border border-orange-400">
                ABOUT
              </Link>
              <Link href="/portfolio" className="bg-yellow-200 text-orange-900 px-3 py-2 font-bold text-sm hover:bg-yellow-300 transition-all duration-200 border border-orange-400">
                PORTFOLIO
              </Link>
              <Link href="/contact" className="bg-yellow-200 text-orange-900 px-3 py-2 font-bold text-sm hover:bg-yellow-300 transition-all duration-200 border border-orange-400">
                CONTACT
              </Link>
              <Link href="/blog" className="bg-yellow-200 text-orange-900 px-3 py-2 font-bold text-sm hover:bg-yellow-300 transition-all duration-200 border border-orange-400">
                BLOG
              </Link>
            </div>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 border-t-4 border-orange-400 bg-gradient-to-br from-yellow-100 to-orange-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <AiOutlineStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-100" />
            </div>
            <span className="text-lg sm:text-xl font-black text-orange-900 tracking-wider transform -skew-x-6">
              PORTIFY
            </span>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-red-500 mx-auto mb-4 sm:mb-6 transform rotate-1"></div>
          <p className="text-orange-700 font-bold tracking-wide text-sm sm:text-base">© 2025 • MADE FOR CREATORS</p>
        </div>
      </footer>
    </div>
  )
}