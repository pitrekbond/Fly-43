"use client";
import { IoAirplaneOutline } from "react-icons/io5";
import { LuBedDouble } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MainButtonsProps = {
  to?: string[];
};

export default function MainButtons({
  to = ["/reservations", "/reservations/bookings"],
}: MainButtonsProps) {
  const pathname = usePathname();

  return (
    <div className="flex max-lg:justify-center gap-4 my-8 lg:ml-[7rem]">
      <Link
        href={to[0]}
        className={`p-2 rounded-md flex gap-4 border-[1.5px] border-primary-700 transition-colors duration-300 ${
          pathname === to[0]
            ? "bg-accent-600 hover:bg-accent-700 hover:text-primary-50"
            : "bg-primary-950 hover:bg-primary-50 hover:text-primary-900"
        } `}
      >
        <IoAirplaneOutline className="h-6 w-6" />
        <p>Flights</p>
      </Link>

      <Link
        href={to[1]}
        className={`p-2 rounded-md flex gap-4 border-[1.5px] border-primary-700 transition-colors duration-300 ${
          pathname === to[1]
            ? "bg-accent-600 hover:bg-accent-700 hover:text-primary-50"
            : "bg-primary-950 hover:bg-primary-50 hover:text-primary-900"
        }`}
      >
        <LuBedDouble className="h-6 w-6" />
        <p>Hotels</p>
      </Link>
    </div>
  );
}
