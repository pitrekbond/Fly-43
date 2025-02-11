"use client";

import { MdOutlineFreeBreakfast } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { RiTaxiLine } from "react-icons/ri";
import { GoQuestion } from "react-icons/go";
import { useHotelReservation } from "./HotelReservationContext";
import { useState } from "react";
import { useCurrency } from "./CurrencyContext";

type AdditionalDataHotelsProps = {
  hotel: string;
};

export default function AdditionalDataHotels({
  hotel,
}: AdditionalDataHotelsProps) {
  const { hasBreakfast, hasTransfer, setHasBreakfast, setHasTransfer } =
    useHotelReservation();
  const [bedType, setBedType] = useState("single");
  const { currency } = useCurrency();

  const handleBreakfastChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasBreakfast(event.target.checked);
  };

  const handleTransferChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTransfer(event.target.checked);
  };

  const handleBedTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBedType(event.target.value); // Update bed type state
  };

  return (
    <div className="text-gray-700 border border-gray-600 bg-primary-50 shadow-sm rounded-md py-3 px-2 flex flex-col w-full">
      <p className="text-xl font-semibold">Add to your stay</p>

      <div className="mt-4">
        <label className="font-semibold flex gap-2 items-center">
          <IoBedOutline className="h-5 w-5" /> Select your bed
        </label>
        <div className="space-y-1">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="bedType"
              value="single"
              className="form-radio h-4 w-4 text-accent-500 focus:ring-accent-500 border-gray-300"
              checked={bedType === "single"}
              onChange={handleBedTypeChange}
            />
            <span>Single Bed</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="bedType"
              value="double"
              className="form-radio h-4 w-4 text-accent-500 focus:ring-accent-500 border-gray-300"
              checked={bedType === "double"}
              onChange={handleBedTypeChange}
            />
            <span>Double Bed</span>
          </label>
        </div>
      </div>

      {hotel === "Budget" && (
        <div className="mt-4">
          <label
            className="font-semibold flex gap-2 items-center"
            htmlFor="hasBreakfast"
          >
            <MdOutlineFreeBreakfast className="h-5 w-5" />
            Breakfast (optional)
          </label>
          <div className="flex gap-3">
            <input
              type="checkbox"
              id="hasBreakfast"
              name="hasBreakfast"
              checked={hasBreakfast}
              className="w-6 h-6"
              onChange={handleBreakfastChange}
            />{" "}
            Add Breakfast ({currency === "$" ? (8 * 1.05).toFixed(2) : 8}
            {currency}/person/night)
          </div>
        </div>
      )}

      <div className="mt-4">
        <label
          className="font-semibold flex gap-2 items-center"
          htmlFor="hasTransfer"
        >
          <RiTaxiLine className="h-5 w-5" />
          Airport transfer (optional)
        </label>
        <div className="flex gap-3">
          <input
            type="checkbox"
            id="hasTransfer"
            name="hasTransfer"
            checked={hasTransfer}
            className="w-6 h-6"
            onChange={handleTransferChange}
          />{" "}
          Add Airport Transfer ({currency === "$" ? (20 * 1.05).toFixed(2) : 20}
          {currency})
        </div>
      </div>

      <div className="mt-4">
        <label
          className="font-semibold flex gap-2 items-center"
          htmlFor="specialRequests"
        >
          <GoQuestion className="h-5 w-5" />
          Special requests
        </label>
        <textarea
          id="specialRequests"
          placeholder="Please provide any other requests that you have, and we'll try our best to meet your needs."
          name="specialRequests"
          className="py-2 mt-1 pl-2 rounded-md border border-black bg-primary-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent w-[100%] "
        />
      </div>
    </div>
  );
}
