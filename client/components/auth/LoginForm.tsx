"use client";
import React from "react";
import { BackgroundBeams } from "./Beambackground";
import { GoogleButton } from "./GoggleBtn";
export function LoginForm() {

  return (
    <div className="h-screen w-full bg-neutral-950  relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 h-fit ">
        <h1 className="relative z-10 h-[100px] text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600   font-sans font-bold">
          Hey There Buddy !
        </h1>

        <h1 className="text-neutral-500 max-w-lg mx-auto my-2 text-[20px] font-[800] xl:text-[24px] text-center relative z-10">
          No Cap, You Belong Here: Log In
        </h1>
        <div className="py-5 flex justify-center cursor-pointer relative z-10">
      <GoogleButton/>
        </div>
       
      </div>
      <BackgroundBeams />
    </div>
  );
}
