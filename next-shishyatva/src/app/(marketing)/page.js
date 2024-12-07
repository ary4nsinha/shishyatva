"use client";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main className="flex flex-col items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center py-12 sm:py-20">
        <div className="space-y-12">
          <div className="relative flex items-center justify-center mx-auto transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.jpeg"
              width={300}
              height={300}
              alt="Shishyatva Logo"
              className="drop-shadow-xl"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-[#0470bd]">
              Find Your Perfect Mentor
            </h1>

            <p className="text-2xl sm:text-3xl font-bold text-[#0470bd] mt-4">
              <span className="text-[#ee904d]">आपके लिये,</span> आपके कल के लिये
            </p>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Connect with experienced professionals who can guide you through
              your career journey. Get personalized mentorship in technology,
              academics, and professional development.
            </p>
          </div>

          <div className="mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
            <SignedOut>
              <SignInButton>
                <button className="bg-[#eeab7c] hover:bg-[#e59a66] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 ml-4">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-[#0470bd] text-xl font-semibold mb-3">
                Expert Mentors
              </h3>
              <p className="text-gray-600">
                Connect with industry professionals with years of experience
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-[#0470bd] text-xl font-semibold mb-3">
                Personalized Guidance
              </h3>
              <p className="text-gray-600">
                Get customized mentorship tailored to your career goals
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-[#0470bd] text-xl font-semibold mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your growth with structured development plans
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
