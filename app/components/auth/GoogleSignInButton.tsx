"use client";
import { Toast } from "@/app/utils/toast";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";

const GoogleSignInButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" , redirect: true}).catch((err)=>{
        Toast().fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      })}
      className="group w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-6 border-4 border-orange-500 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-4"
    >
      <FcGoogle className="w-6 h-6" />
      <span className="text-lg tracking-wide">CONTINUE WITH GOOGLE</span>
      <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-orange-600" />
    </button>
  );
};

export default GoogleSignInButton;
