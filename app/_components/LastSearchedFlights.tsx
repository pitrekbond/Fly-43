"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type SearchHistoryItem = {
  from: string;
  fromCountry: string;
  toCountry: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  isReturn: boolean;
  adultTicket: number;
  childTicket: number;
  cabinClass: string;
  searchTimestamp: number;
};

export default function LastSearchedFlights() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("flightSearchHistory");
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
        Last Searched Flights
      </h2>
      <div className="max-lg:gap-4 lg:gap-10 flex max-sm:flex-col max-sm:items-center max-lg:justify-center">
        {searchHistory.map((search, index) => {
          const searchParams = new URLSearchParams({
            from: search.from,
            fromCountry: search.fromCountry,
            to: search.to,
            toCountry: search.toCountry,
            departureDate: search.departureDate,
            isReturn: search.isReturn.toString(),
            adultTicket: search.adultTicket.toString(),
            childTicket: search.childTicket.toString(),
            cabinClass: search.cabinClass,
            ...(search.returnDate && { returnDate: search.returnDate }),
          });

          return (
            <Link
              key={index}
              href={`/search?${searchParams.toString()}`}
              className="bg-primary-900  hover:bg-primary-800 transition-transform transform hover:scale-105 rounded-md flex items-center gap-2 border border-gray-400 max-sm:text-sm max-sm:w-[60%]"
            >
              <div className="p-2">
                <div className="flex flex-col">
                  <span className="lg:text-lg font-semibold">
                    {search.from} - {search.to}
                  </span>
                  <span className="text-gray-300">
                    {search.departureDate}{" "}
                    {search.returnDate && `- ${search.returnDate}`}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  {search.adultTicket} Adult, {search.childTicket} Child,{" "}
                  {search.cabinClass}
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
