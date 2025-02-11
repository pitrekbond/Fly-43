"use client";

import { useState, useTransition } from "react";
import CitySearch from "./CitySearch";
import MainSearchButton from "./MainSearchButton";
import { DateRange } from "react-day-picker";
import DateSelector from "./DateSelector";
import HotelGuestSelector from "./HotelGuestSelector";
import { useRouter } from "next/navigation";
import SpinnerMini from "./SpinnerMini";

export type City = {
  id: string;
  name: string;
  region: string;
  country: string;
  population: number;
};

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

export default function HotelSearch() {
  const router = useRouter();

  const [cityInput, setCityInput] = useState("");
  const [lastSelectedCity, setLastSelectedCity] = useState<City | null>(null);
  const [isOpenDateSelector, setIsOpenDateSelector] = useState(false);
  const [isOpenGuestSelector, setIsOpenGuestSelector] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const startDate = range?.from?.toLocaleDateString();
  const endDate = range?.to?.toLocaleDateString();

  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [rooms, setRooms] = useState(1);

  function saveSearchHistory() {
    if (!lastSelectedCity) return;

    const searchItem: SearchHistoryItem = {
      city: lastSelectedCity.name,
      country: lastSelectedCity.country,
      startDate: startDate as string,
      endDate: endDate as string,
      adults,
      kids,
      rooms,
      searchTimestamp: Date.now(),
    };

    // Retrieve existing history
    const savedHistory = localStorage.getItem("hotelSearchHistory");
    let searchHistory: SearchHistoryItem[] = savedHistory
      ? JSON.parse(savedHistory)
      : [];

    // Check for duplicate searches
    const isDuplicate = searchHistory.some(
      (item) =>
        item.city === searchItem.city &&
        item.country === searchItem.country &&
        item.startDate === searchItem.startDate
    );

    // Only add if not a duplicate
    if (!isDuplicate) {
      searchHistory.unshift(searchItem);
      searchHistory = searchHistory.slice(0, 3); // Keep only the last 5 unique searches

      localStorage.setItem("hotelSearchHistory", JSON.stringify(searchHistory));
    }
  }

  function handleSearch() {
    setError("");

    if (!cityInput || !startDate || !endDate || !lastSelectedCity) {
      setError(
        !lastSelectedCity
          ? "Please select a valid city"
          : "Please fill in all required fields (City and Dates)"
      );
      return;
    }
    if (startDate === endDate) {
      setError("You have to stay at least 1 night");
      return;
    }

    saveSearchHistory();

    //because of TS I need to convert numbers to strings here
    const params = new URLSearchParams({
      city: lastSelectedCity.name,
      country: lastSelectedCity.country,
      startDate,
      endDate,
      adults: adults.toString(),
      kids: kids.toString(),
      rooms: rooms.toString(),
    });

    startTransition(() => {
      router.push(`/hotels/searchHotels?${params.toString()}`);
    });
  }

  return (
    <>
      <div className="flex gap-[6px] mt-[2.3rem] h-[48px] relative">
        <CitySearch
          cityInput={cityInput}
          setCityInput={setCityInput}
          setLastSelectedCity={setLastSelectedCity}
          className="top-[53px] left-0 rounded-l-md"
          className2="rounded-l-md"
        />
        <MainSearchButton
          className="w-[120px]"
          onClick={() => setIsOpenDateSelector(true)}
          isActive={isOpenDateSelector}
        >
          {startDate ? startDate : "Start date"}
        </MainSearchButton>
        <MainSearchButton
          className="w-[120px]"
          onClick={() => setIsOpenDateSelector(true)}
          isActive={isOpenDateSelector}
        >
          {endDate ? endDate : "End date"}
        </MainSearchButton>
        <MainSearchButton
          className="w-[170px] rounded-r-md"
          onClick={() => setIsOpenGuestSelector(true)}
          isActive={isOpenGuestSelector}
        >
          {`${rooms} Room${rooms > 1 ? "s" : ""}, ${adults + kids} Guest${
            adults + kids > 1 ? "s" : ""
          }`}
        </MainSearchButton>
        <button
          className="ml-3 bg-accent-600 hover:bg-accent-700 rounded-md p-2 transition-colors font-semibold disabled:cursor-not-allowed w-[110px]"
          onClick={handleSearch}
          disabled={isPending}
        >
          {isPending ? <SpinnerMini /> : "Search"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isOpenDateSelector && (
        //passing isReturn so that the dateSelector works correctly
        <DateSelector
          onClose={() => setIsOpenDateSelector(false)}
          setRange={setRange}
          range={range}
          isReturn={true}
          className="bottom-[0.5rem] left-[4rem] 2xl:bottom-[8rem] 2xl:left-[2rem]"
        />
      )}
      {isOpenGuestSelector && (
        <HotelGuestSelector
          onClose={() => setIsOpenGuestSelector(false)}
          adults={adults}
          setAdults={setAdults}
          kids={kids}
          setKids={setKids}
          rooms={rooms}
          setRooms={setRooms}
          className="bottom-[10rem] 2xl:bottom-[17.5rem] 2xl:left-[28.6rem]"
        />
      )}
    </>
  );
}
