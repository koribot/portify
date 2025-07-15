import { FiHeart } from "react-icons/fi"
import { AiOutlineStar } from "react-icons/ai"
import GoogleSignInButton from "../components/login/GoogleSignInButton"

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50 text-orange-900">
      {/* Retro geometric background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-yellow-400 transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-500 rounded-full"></div>
        <div className="absolute top-64 left-1/2 w-20 h-20 bg-red-500 transform -rotate-45"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-orange-300 transform rotate-12"></div>
        <div className="absolute bottom-1/3 right-10 w-12 h-12 bg-red-300 rounded-full"></div>
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
            <a
              href="/"
              className="bg-orange-500 text-yellow-50 px-4 py-2 sm:px-8 sm:py-3 rounded-none font-bold text-sm sm:text-lg shadow-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 border-2 sm:border-4 border-orange-600"
            >
              HOME
            </a>
          </div>
        </nav>
      </header>

      {/* Main Login Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6 py-16">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-yellow-100/90 backdrop-blur-sm border-4 border-orange-400 shadow-2xl transform -rotate-1 hover:rotate-0 transition-all duration-300">
            <div className="p-8 sm:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 bg-red-500 text-yellow-100 font-bold text-sm tracking-wide mb-6 transform rotate-2 shadow-lg">
                  ★ WELCOME BACK ★
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-orange-900 mb-4 tracking-wider transform -skew-x-3">
                  SIGN IN
                </h1>
                <p className="text-orange-800 font-bold text-lg">Continue building your presence</p>
              </div>

              {/* Divider */}
              <div className="flex items-center mb-8">
                <div className="flex-1 h-1 bg-orange-400 transform rotate-1"></div>
                <div className="px-4">
                  <div className="w-4 h-4 bg-red-500 transform rotate-45"></div>
                </div>
                <div className="flex-1 h-1 bg-orange-400 transform -rotate-1"></div>
              </div>

              {/* Google Sign In Button */}
              <GoogleSignInButton />

              {/* Alternative Options */}
              {/* <div className="mt-8 text-center">
                <div className="inline-block px-4 py-1 bg-orange-200 text-orange-900 font-bold text-xs tracking-wide transform -rotate-1">
                  MORE OPTIONS COMING SOON
                </div>
              </div> */}

              {/* Footer Text */}
              {/* <div className="mt-8 text-center">
                <p className="text-orange-700 font-bold text-sm">
                  New to PORTIFY?{" "}
                  <a href="/" className="text-red-600 hover:text-red-700 underline decoration-2 underline-offset-2">
                    Start Building →
                  </a>
                </p>
              </div> */}
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-500/90 text-yellow-100 p-4 border-2 border-red-600 shadow-lg transform rotate-1">
              <div className="font-black text-sm tracking-wide">FREE FOREVER</div>
              <div className="text-xs mt-1">No hidden costs</div>
            </div>
            <div className="bg-orange-500/90 text-yellow-100 p-4 border-2 border-orange-600 shadow-lg transform -rotate-1">
              <div className="font-black text-sm tracking-wide">DRAG & DROP</div>
              <div className="text-xs mt-1">Easy to use</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-8 border-t-4 border-orange-400 bg-gradient-to-br from-yellow-100 to-orange-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <AiOutlineStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-100" />
            </div>
            <span className="text-lg sm:text-xl font-black text-orange-900 tracking-wider transform -skew-x-6">
              PORTFOLIO • RESUME • LANDINGPAGE MAKER
            </span>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-red-500 mx-auto mb-4 transform rotate-1"></div>
          <p className="text-orange-700 font-bold tracking-wide text-sm">© 2025 • MADE FOR CREATORS</p>
        </div>
      </footer>
    </div>
  )
}

export default Login
