"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-white text-sm mx-auto `}>
          {!isHomePage && <Header />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
