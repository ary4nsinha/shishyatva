import { UserButton, SignedIn, SignOutButton } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <section className="  flex justify-center items-center py-12 px-4">
      <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="font-bold text-4xl text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-300 mb-6">You're currently logged in as:</p>
          <SignedIn>
            <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-32 h-32",
                    userButtonBox: "w-full flex justify-center",
                  },
                }}
              />
            </div>
          </SignedIn>
          <p className="text-sm text-red-500 mt-4">
            Click on the avatar to log out
          </p>
        </div>
      </div>
    </section>
  );
}
