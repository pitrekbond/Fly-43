"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type SearchHistoryItem = {
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  adults: number;
  kids: number;
  rooms: number;
  searchTimestamp: number;
};

export default function LastSearchedHotels() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("hotelSearchHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setSearchHistory(parsedHistory);
      } catch (error) {
        console.error("Error parsing search history", error);
      }
    }
  }, []);

  if (searchHistory.length === 0) return null;

  return (
    <div className="flex flex-col mt-10 lg:ml-[6.5rem] max-sm:mb-6">
      <h2 className="text-2xl font-semibold mb-2 max-lg:text-center">
        Last Searched Hotels
      </h2>
      <div className="max-lg:gap-4 gap-10 flex max-sm:flex-col max-sm:items-center max-lg:justify-center">
        {searchHistory.map((search, index) => {
          const searchParams = new URLSearchParams({
            city: search.city,
            country: search.country,
            startDate: search.startDate,
            endDate: search.endDate,
            adults: search.adults.toString(),
            kids: search.kids.toString(),
            rooms: search.rooms.toString(),
          });

          return (
            <Link
              key={index}
              href={`/hotels/searchHotels?${searchParams.toString()}`}
              className="bg-primary-900  hover:bg-primary-800 transition-transform transform hover:scale-105 rounded-md flex items-center gap-2 border border-gray-400 max-sm:text-sm max-sm:w-[60%]"
            >
              <div className="p-2">
                <div className="flex flex-col">
                  <span className="lg:text-lg font-semibold">
                    {search.city}
                  </span>
                  <span className="text-gray-300">
                    {search.startDate} - {search.endDate}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  {search.adults} Adult, {search.kids} Child, {search.rooms}{" "}
                  Room{search.rooms > 1 && "s"}
                </div>
              </div>
              <div className="p-2 h-full border-l border-gray-400 flex items-center">
                <FaArrowRight className="h-5 w-5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
