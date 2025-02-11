"use client";

import { addDays, differenceInDays, parse, subDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { GrNext, GrPrevious } from "react-icons/gr";
import HotelGuestSelector from "./HotelGuestSelector";

const today = new Date();
const formattedToday = today.toLocaleDateString("en-GB").replace(/\//g, ".");

export default function ResultBarHotels({
  city,
  startDate,
  endDate,
  adults,
  kids,
  rooms,
}: Record<string, string>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [newAdults, setNewAdults] = useState(Number(adults));
  const [newKids, setNewKids] = useState(Number(kids));
  const [newRooms, setNewRooms] = useState(Number(rooms));
  const [isOpenGuestSelector, setIsOpenGuestSelector] = useState(false);

  function updateURLDate(newDate: string, field: string) {
    //searchParams as any so that TS doesnt complain
    const params = new URLSearchParams(searchParams as any);
    params.set(field, newDate);
    router.replace(`?${params.toString()}`);
  }

  function updateURLOther(newValue: number, field: string) {
    const params = new URLSearchParams(searchParams as any);
    params.set(field, newValue.toString());
    router.replace(`?${params.toString()}`);
  }

  function handleAddDay(
    state: string,
    setter: (value: string) => void,
    field: string
  ) {
    const [day, month, year] = state.split(".");
    const date = new Date(`${year}-${month}-${day}`);
    const dayLater = addDays(date, 1);
    const formattedDate = dayLater
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");
    setter(formattedDate);
    updateURLDate(formattedDate, field);
  }

  function handleSubstractDay(
    state: string,
    setter: (value: string) => void,
    field: string
  ) {
    const [day, month, year] = state.split(".");
    const date = new Date(`${year}-${month}-${day}`);
    const dayEarlier = subDays(date, 1);
    const formattedDate = dayEarlier
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");
    setter(formattedDate);
    updateURLDate(formattedDate, field);
  }

  const [dayD, monthD, yearD] = startDate.split(".");
  const dateS = new Date(`${yearD}-${monthD}-${dayD}`);
  //we need to do this because of TS
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const formattedStartDate = dateS.toLocaleDateString("en-US", options);

  const [dayR, monthR, yearR] = endDate.split(".");
  const dateE = new Date(`${yearR}-${monthR}-${dayR}`);
  const formattedDateE = dateE.toLocaleDateString("en-US", options);

  const parsedStartDate = parse(startDate, "dd.MM.yyyy", new Date());
  const parsedEndDate = parse(endDate, "dd.MM.yyyy", new Date());

  const isValidDates = differenceInDays(parsedEndDate, parsedStartDate) > 1;

  const numberOfGuests = Number(adults) + Number(kids);
  const numberOfRooms = Number(rooms);

  return (
    <>
      <div className="flex gap-[6px] mt-4 h-[48px]">
        <div className="bg-primary-950 px-4 flex items-center rounded-md max-w-[386px]">
          {city}
        </div>

        <button
          className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md disabled:cursor-not-allowed disabled:bg-primary-900"
          onClick={() =>
            handleSubstractDay(newStartDate, setNewStartDate, "startDate")
          }
          disabled={startDate === formattedToday}
        >
          <GrPrevious className="h-5 w-5" />
        </button>
        <div className="w-[110px] flex-none">
          <div className="h-full flex items-center justify-center">
            <span className="text-center block w-full truncate">
              {formattedStartDate}
            </span>
          </div>
        </div>
        <button
          className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md disabled:cursor-not-allowed disabled:bg-primary-900"
          onClick={() =>
            handleAddDay(newStartDate, setNewStartDate, "startDate")
          }
          disabled={!isValidDates}
        >
          <GrNext className="h-5 w-5" />
        </button>
        <div className="flex items-center justify-center">
          <BsDot className="h-5 w-5" />
        </div>
        <button
          className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md disabled:cursor-not-allowed disabled:bg-primary-900"
          onClick={() =>
            handleSubstractDay(newEndDate, setNewEndDate, "endDate")
          }
          disabled={!isValidDates}
        >
          <GrPrevious className="h-5 w-5" />
        </button>
        {/*so many divs because otherwise the layout shifts for some reason*/}
        <div className="w-[110px] flex-none">
          <div className="h-full flex items-center justify-center">
            <span className="text-center block w-full truncate">
              {formattedDateE}
            </span>
          </div>
        </div>
        <button
          className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md"
          onClick={() => handleAddDay(newEndDate, setNewEndDate, "endDate")}
        >
          <GrNext className="h-5 w-5" />
        </button>

        <button
          className="bg-primary-950 px-4 flex items-center rounded-md max-w-[386px] truncate hover:bg-[#1e083e] transition-colors"
          style={{ wordWrap: "break-word", whiteSpace: "normal" }}
          onClick={() => setIsOpenGuestSelector(true)}
        >
          {numberOfGuests} Guest{numberOfGuests > 1 ? "s" : ""}, {numberOfRooms}{" "}
          Room{numberOfRooms > 1 ? "s" : ""}
        </button>
      </div>
      {isOpenGuestSelector && (
        <HotelGuestSelector
          onClose={() => setIsOpenGuestSelector(false)}
          adults={newAdults}
          setAdults={setNewAdults}
          kids={newKids}
          setKids={setNewKids}
          rooms={newRooms}
          setRooms={setNewRooms}
          updateURLOther={updateURLOther}
          className="bottom-[18rem] left-[33.5rem]"
        />
      )}
    </>
  );
}
