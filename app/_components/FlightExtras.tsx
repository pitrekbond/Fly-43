"use client";

import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useCurrency } from "./CurrencyContext";

type AdditionalFlightDataProps = {
  searchParams: Record<string, string>; // Define searchParams as a Record with string keys and values
};

export default function FlightExtras({
  searchParams,
}: AdditionalFlightDataProps) {
  const { cabinClass, adultTicket, childTicket } = searchParams;
  const [luggage, setLuggage] = useState("Basic");
  const [legRoom, setLegRoom] = useState("Basic");
  const [seatAllocation, setSeatAllocation] = useState("Random");
  const { currency } = useCurrency();

  const numberOfPassengers = Number(adultTicket) + Number(childTicket);

  function handleChangeLuggage(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setLuggage(value);
  }

  function handleChangeLegRoom(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setLegRoom(value);
  }

  function handleChangeSeatAllocation(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    setSeatAllocation(value);
  }

  return (
    <div className="flex items-start gap-8 border-gray-400 border-b pb-8 mt-8">
      <p className="text-2xl flex flex-col items-center gap-4 w-[216.18px]">
        3. Travel extras <AiOutlineFileAdd className="w-10 h-10" />
      </p>
      <div className="border-2 border-gray-400 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-6 p-2 rounded-md shadow-md">
        <div className="flex flex-col gap-1">
          <label htmlFor="luggage" className="text-sm text-accent-500">
            Luggage
          </label>
          <select
            name="luggage"
            id="luggage"
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 rounded-md bg-primary-50 text-gray-700 focus:border-transparent border border-black focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
            onChange={handleChangeLuggage}
            disabled={cabinClass === "Business"}
            defaultValue={cabinClass === "Business" ? "Expanded" : "Basic"}
          >
            <option value="Basic">Basic (free)</option>
            <option value="Expanded">
              Extra{" "}
              {cabinClass === "Business"
                ? ""
                : `(${
                    currency === "$" ? 30 * 1.05 : 30
                  }${currency}/person)`}{" "}
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priorityBoarding" className="text-sm text-accent-500">
            Would you like to choose priority boarding?
          </label>
          <div className="flex gap-3 py-2 pl-2">
            <input
              type="hidden"
              name="priorityBoarding"
              value="false" // Default value when unchecked
            />
            <input
              type="checkbox"
              id="priorityBoarding"
              name="priorityBoarding"
              className="w-6 h-6 "
            />{" "}
            Priority Boarding ({currency === "$" ? 15 * 1.05 : 15}
            {currency}/person)
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="legRoom" className="text-sm text-accent-500">
            Leg room
          </label>
          <select
            name="legRoom"
            id="legRoom"
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 rounded-md bg-primary-50 text-gray-700 focus:border-transparent border border-black focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
            onChange={handleChangeLegRoom}
            disabled={cabinClass === "Business"}
            defaultValue={cabinClass === "Business" ? "Expanded" : "Basic"}
          >
            <option value="Basic">Basic (free)</option>
            <option value="Expanded">
              Extra{" "}
              {cabinClass === "Business"
                ? ""
                : `(${
                    currency === "$" ? 20 * 1.05 : 20
                  }${currency}/person)`}{" "}
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="seatAllocation" className="text-sm text-accent-500">
            Seat allocation
          </label>
          <select
            name="seatAllocation"
            id="seatAllocation"
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 rounded-md bg-primary-50 text-gray-700 focus:border-transparent border border-black focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
            onChange={handleChangeSeatAllocation}
            disabled={numberOfPassengers === 1}
          >
            <option value="Random">Random (free)</option>
            <option value="Together">
              Passengers together ({currency === "$" ? 15 * 1.05 : 15}
              {currency}/person){" "}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
