"use client";

import { useEffect, useState } from "react";
import { FiLogOut, FiBell, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Header({
  onUsernameLoaded,
}: {
  onUsernameLoaded: (username: string) => void;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("User");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const name = user.name || user.email || "User";
      setUsername(name);
      onUsernameLoaded(name);
    } catch (e) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router, onUsernameLoaded]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="w-full bg-zinc-800 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white">App Hub</div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-yellow-300">
            <FiBell size={20} />
          </button>
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center space-x-2 text-white hover:text-yellow-300"
            >
              {/* <span>Hi, {username}</span> */}
              <FiChevronDown />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-yellow-800 rounded shadow py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-yellow-700"
                >
                  <FiLogOut className="inline mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
