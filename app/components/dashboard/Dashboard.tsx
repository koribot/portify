"use client";

import { useState, useEffect } from "react";
import Logo from "../svgs/Logo";
import { signOut } from "next-auth/react";
import RetroPatterns from "../retro-patterns/RetroPatterns";
import StudioTabNavigation from "../studio/StudioTabNavigation";

type DashboardLayoutClientProps = {
  session: any;
  displayId: string;
};

export default function Dashboard({
  session,
  displayId,
}: DashboardLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Effect to prevent body scrolling when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Clean up on unmount
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50 text-orange-900 relative">
      <RetroPatterns />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-200 border-r border-orange-300 flex flex-col transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex-shrink-0`}
      >
        <div className="p-4 border-b border-orange-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 relative">
                <Logo />
              </div>
            </a>
            <h2 className="text-xl font-black tracking-wide text-red-600 transform -skew-x-3">
              Portify Studio
            </h2>
          </div>
          <button
            className="md:hidden text-orange-900 hover:text-red-600 p-1 rounded-md"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <span className="font-bold text-2xl leading-none">&times;</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
        </nav>
      </aside> 
       */}

      <main className="flex-1 flex flex-col relative z-10">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-orange-300 px-4 bg-yellow-50/80 backdrop-blur-sm justify-between">
          <div className="flex items-center gap-2">
            {/* <button
              className="md:hidden text-orange-900 hover:text-red-600 p-1 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <span className="font-bold text-2xl leading-none">&#9776;</span>{" "}
            </button> */}
            <a
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 relative">
                <Logo />
              </div>
            </a>
            <h1 className="text-xl font-bold text-orange-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt="User avatar"
                className="w-8 h-8 rounded-full border-2 border-orange-300"
              />
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 p-2 rounded-md text-orange-900 hover:bg-orange-300 transition-colors"
            >
              <div className="size-4 bg-orange-700 border border-orange-900 rounded-sm"></div>
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4">
          <StudioTabNavigation />
        </div>
      </main>
    </div>
  );
}
