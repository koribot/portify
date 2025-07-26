"use client";

import { useState, useEffect } from "react";
import Logo from "../svgs/Logo";
import { signOut } from "next-auth/react";
import RetroPatterns from "../retro-patterns/RetroPatterns";
import StudioTabNavigation from "../studio/StudioTabNavigation";

type DashboardLayoutClientProps = {
  session: any;
  display_id?: string;
};

export default function Dashboard({
  session,
  display_id,
}: DashboardLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50 text-orange-900 relative overflow-hidden">
      <RetroPatterns />
      <main className="flex-1 flex flex-col relative z-10">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-orange-300 px-4 bg-yellow-50/80 backdrop-blur-sm justify-between">
          <div className="flex items-center gap-2">
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

        <div className="flex-1 flex flex-col gap-4">
          <StudioTabNavigation />
        </div>
      </main>
    </div>
  );
}
