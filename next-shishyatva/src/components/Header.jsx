"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignOutButton } from "@clerk/nextjs";

export default function Sidenav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "AI Resume Review" },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-52 bg-white border-r border-gray-200 pb-4 pt-4 pl-4 pr-0">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="mb-8">
          <Link href="/">
            <h1 className="text-xl font-bold">
              <span className="text-[#0470bd]">Shish</span>
              <span className="text-[#eeab7c]">yatva</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span
                    className={`flex items-center p-2 rounded transition-colors duration-200 ${
                      pathname === item.href
                        ? "bg-[#0470bd]/10 text-[#0470bd] font-semibold"
                        : "text-zinc-600 hover:bg-gray-100 hover:text-[#0470bd]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 pt-4 flex items-center justify-center gap-3">
          <div>
            <SignedIn>
              <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                      userButtonBox: "w-full flex justify-center",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
          <div className="text-center flex justify-center items-center">
          User Profile
          </div>
        </div>
      </div>
    </nav>
  );
}
