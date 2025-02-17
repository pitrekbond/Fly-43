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
      <div className="flex max-lg:flex-col max-lg:items-center max-lg:gap-[12px] gap-[6px] lg:mt-[2.3rem] lg:h-[48px]">
        <CitySearch
          cityInput={cityInput}
          setCityInput={setCityInput}
          setLastSelectedCity={setLastSelectedCity}
          className="top-[300px] left-[80px] max-sm:top-[212px] max-sm:left-[17px] max-lg:top-[222px] max-lg:left-[153px] z-100"
          className2="lg:rounded-l-md max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
        />
        <MainSearchButton
          className="lg:w-[120px] max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
          onClick={() => setIsOpenDateSelector(true)}
          isActive={isOpenDateSelector}
        >
          {startDate ? startDate : "Start date"}
        </MainSearchButton>
        <MainSearchButton
          className="lg:w-[120px] max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
          onClick={() => setIsOpenDateSelector(true)}
          isActive={isOpenDateSelector}
        >
          {endDate ? endDate : "End date"}
        </MainSearchButton>
        <MainSearchButton
          className="lg:w-[170px]  max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px] rounded-r-md"
          onClick={() => setIsOpenGuestSelector(true)}
          isActive={isOpenGuestSelector}
        >
          {`${rooms} Room${rooms > 1 ? "s" : ""}, ${adults + kids} Guest${
            adults + kids > 1 ? "s" : ""
          }`}
        </MainSearchButton>
        <button
          className="md:ml-3 max-lg:my-4 bg-accent-600 hover:bg-accent-700 rounded-md p-2 transition-colors font-semibold disabled:cursor-not-allowed w-[110px]"
          onClick={handleSearch}
          disabled={isPending}
        >
          {isPending ? <SpinnerMini /> : "Search"}
        </button>
      </div>
      {error && (
        <p className="text-red-500 lg:mt-2 max-lg:text-center">{error}</p>
      )}
      {isOpenDateSelector && (
        //passing isReturn so that the dateSelector works correctly
        <DateSelector
          onClose={() => setIsOpenDateSelector(false)}
          setRange={setRange}
          range={range}
          isReturn={true}
          className="bottom-[0.5rem] left-[4rem] 2xl:bottom-[8rem] 2xl:left-[2rem] max-sm:bottom-[7rem] max-sm:left-[1.2rem] max-lg:bottom-[12rem] max-lg:left-[0.8rem]"
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
          className="bottom-[10rem] 2xl:bottom-[17.5rem] 2xl:left-[28.6rem] max-sm:bottom-[7.3rem] max-sm:left-[2.2rem] max-lg:bottom-[28rem] max-lg:left-[15.6rem]"
        />
      )}
    </>
  );
}
