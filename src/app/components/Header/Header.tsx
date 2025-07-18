"use client";

import { useEffect, useState } from "react";
import { FiLogOut, FiBell, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header({
  onUsernameLoaded,
}: {
  onUsernameLoaded: (username: string) => void;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("User");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email?.split("@")[0] || "User";
        setUsername(name);
        onUsernameLoaded(name); // 👈 send name to parent
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router, onUsernameLoaded]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="w-full bg-zinc-800 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">App Hub</div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-yellow-900">
            <FiBell size={20} />
          </button>
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center space-x-2 text-white-600 hover:text-black-800"
            >
              {/* <span>Hi, {username}</span> */}
              <FiChevronDown />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-yellow-800 rounded shadow py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2"
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
