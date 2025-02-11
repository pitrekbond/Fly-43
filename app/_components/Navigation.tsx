"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { IoAirplaneOutline } from "react-icons/io5";
import { LuBedDouble } from "react-icons/lu";
import { BsSuitcaseLg } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SignOutButton from "./SignOutButton";

type NavigationProps = {
  setOpenMenu: (open: boolean) => void;
};

const navLinks = [
  {
    name: "Flights",
    href: "/",
    icon: IoAirplaneOutline,
  },
  {
    name: "Hotels",
    href: "/hotels",
    icon: LuBedDouble,
  },
  {
    name: "My trips",
    href: "/reservations",
    icon: BsSuitcaseLg,
  },
];

export default function Navigation({ setOpenMenu }: NavigationProps) {
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Delay the animation trigger to allow the portal to mount first
    const timeout = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  function handleClose() {
    setAnimate(false);
    setTimeout(() => setOpenMenu(false), 300); // Allow the animation to finish before unmounting
  }

  return createPortal(
    <>
      {/* Overlay with dark background */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 origin-left transform transition-transform duration-300 ${
          animate ? "scale-x-100" : "scale-x-0"
        }`}
        onClick={handleClose}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-start"
        onClick={handleClose}
      >
        <div
          className={`bg-primary-950 px-2 py-4 border-r-[1.5px] border-t-[1.5px] border-primary-700 h-[calc(100vh-86px)] mt-[86px] flex flex-col items-start justify-between transform transition-transform duration-300 ${
            animate ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Links Section */}
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={handleClose}
                  className={`flex items-center gap-5 py-2 pl-4 pr-10 hover:bg-primary-50 hover:text-primary-900 rounded-md transition-colors  ${
                    pathname === link.href
                      ? "bg-primary-50 text-primary-900"
                      : ""
                  }`}
                >
                  <link.icon className="h-6 w-6 transition-colors" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <SignOutButton />
        </div>
      </div>
    </>,
    document.body
  );
}
