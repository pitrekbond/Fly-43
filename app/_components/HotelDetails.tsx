"use client";

import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

type HotelDetailsProps = {
  hotel: string;
  city: string;
  country: string;
  numberOfGuests: number;
  rooms: number;
  adults: number;
  kids: number;
  formattedStartDate: string;
  formattedDateE: string;
  numNights: number;
};

export default function HotelDetails({
  hotel,
  city,
  country,
  numberOfGuests,
  rooms,
  adults,
  kids,
  formattedStartDate,
  formattedDateE,
  numNights,
}: HotelDetailsProps) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsClicked((c) => !c);
  }

  return (
    <div className="text-gray-700 border-1 border-gray-600 bg-primary-50 shadow-sm rounded-md py-3 px-2 flex flex-col items-start max-lg:w-[80%] lg:w-[320px]">
      <p className="text-xl font-semibold">{hotel} Hotel</p>
      <p className="mb-3">
        {city}, {country}
      </p>
      <div className="flex gap-3 w-full pt-4 border-t border-gray-300">
        <div className="border-r border-gray-300 w-1/2">
          <p>Check in</p>
          <p className="font-semibold">{formattedStartDate}</p>
        </div>
        <div className="w-1/2">
          <p>Check out</p>
          <p className="font-semibold">{formattedDateE}</p>
        </div>
      </div>
      <p className="mt-1">Total length of stay:</p>
      <p className="font-semibold mb-3">
        {numNights} night{numNights > 1 ? "s" : ""}
      </p>
      <div className="w-full pt-4 border-t border-gray-300">
        <p>Selected option:</p>
        <button
          className="font-semibold flex justify-between w-full"
          onClick={handleClick}
        >
          <span>
            {rooms} Room{rooms > 1 ? "s" : ""} for {numberOfGuests}{" "}
            {numberOfGuests > 1 ? "people" : "person"}
          </span>
          {!isClicked ? (
            <GoChevronDown className="h-5 w-5" />
          ) : (
            <GoChevronUp className="h-5 w-5" />
          )}
        </button>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isClicked ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p>
            {adults} Adult{adults > 1 && "s"}, {kids} Child
            {kids > 1 || (kids === 0 && "ren")}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
