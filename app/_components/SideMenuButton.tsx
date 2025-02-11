"use client";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Navigation from "./Navigation";

export default function SideMenuButton() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <button
        className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-primary-600 transition-colors"
        onClick={() => setOpenMenu(true)}
      >
        {<Bars3Icon className="h-5 w-5 text-primary-50" />}
      </button>
      {openMenu && <Navigation setOpenMenu={setOpenMenu} />}
    </>
  );
}
