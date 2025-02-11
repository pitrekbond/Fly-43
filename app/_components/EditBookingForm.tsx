"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { updateBooking } from "../_lib/actions";
import { useCurrency } from "./CurrencyContext";

type EditBookingFormProps = {
  booking: {
    adults: number;
    kids: number;
    hotel: string;
    hasBreakfast: boolean;
    hasTransfer: boolean;
    specialRequests: string;
    price: number;
    id: number;
    numNights: number;
  };
};

export default function EditBookingForm({ booking }: EditBookingFormProps) {
  const [adults, setAdults] = useState(booking.adults);
  const [kids, setKids] = useState(booking.kids);
  const [hasBreakfast, setHasBreakfast] = useState(booking.hasBreakfast);
  const [hasTransfer, setHasTransfer] = useState(booking.hasTransfer);
  const { currency } = useCurrency();

  const numGuests = booking.adults + booking.kids;

  const basePrice =
    booking.price -
    (booking.hasBreakfast ? numGuests * 8 * booking.numNights : 0) -
    (booking.hasTransfer ? 20 : 0);

  const childPrice = basePrice / (1.5 * numGuests);
  const adultPrice = childPrice * 1.5;
  const newBasePrice = adults * adultPrice + kids * childPrice;
  const breakfastCost = hasBreakfast
    ? (adults + kids) * 8 * booking.numNights
    : 0;
  const transferCost = hasTransfer ? 20 : 0;

  const updatedPrice = newBasePrice + breakfastCost + transferCost;

  const priceDifference = updatedPrice - booking.price;
  const priceDifferenceText =
    priceDifference === 0
      ? ""
      : priceDifference > 0
      ? ` (+${
          currency === "$"
            ? (priceDifference * 1.05).toFixed(0)
            : priceDifference.toFixed(0)
        }${currency})`
      : ` (-${
          currency === "$"
            ? (Math.abs(priceDifference) * 1.05).toFixed(0)
            : Math.abs(priceDifference).toFixed(0)
        }${currency})`;

  function handleAdultsChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setAdults(Number(value));
  }

  function handleKidsChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setKids(Number(value));
  }

  function handleBreakfastChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setHasBreakfast(value === "true" ? true : false);
  }

  function handleTransferChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setHasTransfer(value === "true" ? true : false);
  }

  return (
    <form
      className="text-gray-700 border-1 border-gray-600 bg-primary-50 shadow-sm rounded-md text-lg py-4 px-8 w-[60%] flex flex-col"
      action={updateBooking}
    >
      <div className="space-y-2 mb-6">
        <label htmlFor="adults">How many adults?</label>
        <select
          name="adults"
          defaultValue={booking.adults}
          id="adults"
          className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          required
          onChange={handleAdultsChange}
        >
          <option value="" key="">
            Select the number of adults...
          </option>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "adult" : "adults"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 mb-6">
        <label htmlFor="kids">How many children?</label>
        <select
          name="kids"
          defaultValue={booking.kids}
          id="kids"
          className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          required
          onChange={handleKidsChange}
        >
          <option value="" key="">
            Select the number of children...
          </option>
          {Array.from({ length: 9 }, (_, i) => i).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "child" : "children"}
            </option>
          ))}
        </select>
      </div>

      {booking.hotel === "Budget" && (
        <div className="space-y-2 mb-6">
          <label htmlFor="hasBreakfast">
            Would you like to add breakfast to your stay?
          </label>
          <select
            name="hasBreakfast"
            defaultValue={booking.hasBreakfast ? "true" : "false"}
            id="hasBreakfast"
            className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            onChange={handleBreakfastChange}
          >
            <option value="true">Yes (8€/person/night)</option>
            <option value="false">No</option>
          </select>
        </div>
      )}

      <div className="space-y-2 mb-6">
        <label htmlFor="hasTransfer">
          Would you like to add an aiport transfer?
        </label>
        <select
          name="hasTransfer"
          defaultValue={booking.hasTransfer ? "true" : "false"}
          id="hasTransfer"
          className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          onChange={handleTransferChange}
        >
          <option value="true">Yes (20€)</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="specialRequests">Additional requests</label>
        <textarea
          name="specialRequests"
          defaultValue={booking.specialRequests}
          id="specialRequests"
          className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
        ></textarea>
      </div>
      <SubmitButton className="px-2 text-primary-50">
        Update booking {priceDifferenceText}
      </SubmitButton>
      <input type="hidden" name="id" value={booking.id} />
      <input type="hidden" name="price" value={updatedPrice} />
    </form>
  );
}
