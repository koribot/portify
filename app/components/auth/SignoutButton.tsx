"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const SignoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-orange-500 text-yellow-50 px-4 py-2 sm:px-8 sm:py-3 rounded-none font-bold text-sm sm:text-lg shadow-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 border-2 sm:border-4 border-orange-600 cursor-default"
    >
      Sign-out
    </button>
  );
};

export default SignoutButton;
