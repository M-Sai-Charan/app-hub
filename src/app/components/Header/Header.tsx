"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FiUser, FiLogOut, FiBell } from "react-icons/fi";
import { auth } from "@/lib/firebase";

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState("User");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        const name = user.displayName || user.email?.split("@")[0] || "User";
        setUsername(name);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="w-full bg-zinc-900 text-white px-4 md:px-8 py-4 shadow-md flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-yellow-400 tracking-wide">
        App Hub
      </div>

      {/* Right: Greeting, Bell, Avatar */}
      <div className="flex items-center gap-4 relative">
        {/* Greeting */}
        <span className="hidden md:block text-sm text-gray-300">
          Hi, <span className="text-white font-medium">{username}</span>
        </span>

        {/* Notification Bell */}
        <button
          className="relative hover:text-yellow-400 transition"
          aria-label="Notifications"
        >
          <FiBell className="text-2xl" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-zinc-900"></span>
        </button>

        {/* User Icon Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 transition px-3 py-2 rounded-full"
            aria-label="User Menu"
          >
            <FiUser className="text-xl" />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-50 animate-fadeIn">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-zinc-700 text-sm"
              >
                <FiLogOut className="text-base" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
