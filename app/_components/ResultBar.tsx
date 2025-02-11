"use client";

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { BsDot } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { addDays, subDays } from "date-fns";
import PassengerSelector from "./PassengerSelector";

type ResultBarProps = {
  cabinClass: string;
  departureDate: string;
  returnDate: string | undefined;
  adultTicket: number;
  childTicket: number;
};

const today = new Date();
const formattedToday = today.toLocaleDateString("en-GB").replace(/\//g, ".");

export default function ResultBar({
  cabinClass,
  departureDate,
  returnDate,
  adultTicket,
  childTicket,
}: ResultBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenGuestSelector, setIsOpenGuestSelector] = useState(false);
  const [newDateD, setNewDateD] = useState(departureDate);
  const [newDateR, setNewDateR] = useState(returnDate);
  const [newAdults, setNewAdults] = useState(Number(adultTicket));
  const [newKids, setNewKids] = useState(Number(childTicket));
  const [newCabin, setNewCabin] = useState(cabinClass);

  function updateURLDate(newDate: string, field: string) {
    //searchParams as any so that TS doesnt complain
    const params = new URLSearchParams(searchParams as any);
    params.set(field, newDate);
    router.replace(`?${params.toString()}`);
  }

  function updateURLOther(newValue: number | string, field: string) {
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

  const [dayD, monthD, yearD] = departureDate.split(".");
  const dateD = new Date(`${yearD}-${monthD}-${dayD}`);
  //we need to do this because of TS
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const formattedDateD = dateD.toLocaleDateString("en-US", options);

  let formattedDateR: string | undefined;
  if (returnDate) {
    const [dayR, monthR, yearR] = returnDate.split(".");
    const dateR = new Date(`${yearR}-${monthR}-${dayR}`);
    formattedDateR = dateR.toLocaleDateString("en-US", options);
  } else {
    formattedDateR = undefined;
  }

  const numberOfPassengers = adultTicket + childTicket;

  return (
    <>
      <div className="flex gap-[6px] mt-4 h-[48px]">
        <button
          className="bg-primary-950 ml-20 px-4 flex items-center rounded-md max-w-[386px] sm:text-sm truncate hover:bg-[#1e083e] transition-colors"
          style={{ wordWrap: "break-word", whiteSpace: "normal" }}
          onClick={() => setIsOpenGuestSelector(true)}
        >
          {numberOfPassengers} Traveler{numberOfPassengers > 1 && "s"} (
          {adultTicket} Adult{adultTicket > 1 && "s"}, {childTicket} Child
          {childTicket > 1 && "ren"}) {cabinClass} Class
        </button>
        <button
          className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md disabled:cursor-not-allowed disabled:bg-primary-900"
          onClick={() =>
            handleSubstractDay(newDateD, setNewDateD, "departureDate")
          }
          disabled={departureDate === formattedToday}
        >
          <GrPrevious className="h-5 w-5" />
        </button>
        {/*so many divs because otherwise the layout shifts for some reason*/}
        <div className="w-[110px] flex-none">
          <div className="h-full flex items-center justify-center">
            <span className="text-center block w-full truncate">
              {formattedDateD}
            </span>
          </div>
        </div>
        <button
          className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md disabled:cursor-not-allowed disabled:bg-primary-900"
          onClick={() => handleAddDay(newDateD, setNewDateD, "departureDate")}
          disabled={departureDate === returnDate}
        >
          <GrNext className="h-5 w-5" />
        </button>
        {formattedDateR && (
          <>
            <div className="flex items-center justify-center">
              <BsDot className="h-5 w-5" />
            </div>
            <button
              className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md disabled:cursor-not-allowed disabled:bg-primary-900"
              onClick={() =>
                handleSubstractDay(
                  newDateR as string,
                  setNewDateR,
                  "returnDate"
                )
              }
              disabled={
                returnDate === formattedToday || returnDate === departureDate
              }
            >
              <GrPrevious className="h-5 w-5" />
            </button>
            {/*so many divs because otherwise the layout shifts for some reason*/}
            <div className="w-[110px] flex-none">
              <div className="h-full flex items-center justify-center">
                <span className="text-center block w-full truncate">
                  {formattedDateR}
                </span>
              </div>
            </div>
            <button
              className="bg-primary-950 px-2 hover:bg-[#1e083e] transition-colors rounded-md"
              onClick={() =>
                handleAddDay(newDateR as string, setNewDateR, "returnDate")
              }
            >
              <GrNext className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {isOpenGuestSelector && (
        <PassengerSelector
          onClose={() => setIsOpenGuestSelector(false)}
          adultTicket={newAdults}
          setAdultTicket={setNewAdults}
          childTicket={newKids}
          setChildTicket={setNewKids}
          cabinClass={newCabin}
          setCabinClass={setNewCabin}
          updateURLOther={updateURLOther}
          className="bottom-[15.3rem] left-[6.5rem]"
        />
      )}
    </>
  );
}
