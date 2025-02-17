"use client";

import { useEffect, useState } from "react";
import { updateFlight } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import { useCurrency } from "./CurrencyContext";

type EditFlightFormProps = {
  flight: {
    adultTicket: number;
    childTicket: number;
    seatAllocation: string;
    other: string;
    price: number;
    id: number;
  };
};

export default function EditFlightForm({ flight }: EditFlightFormProps) {
  const [adults, setAdults] = useState(flight.adultTicket);
  const [children, setChildren] = useState(flight.childTicket);
  const [seatAllocation, setSeatAllocation] = useState(flight.seatAllocation);
  const numPassengers = flight.adultTicket + flight.childTicket;
  const { currency } = useCurrency();

  useEffect(() => {
    if (numPassengers === 1) {
      setSeatAllocation("Random");
    }
  }, [numPassengers]);

  const childPrice =
    flight.price / (1.5 * flight.adultTicket + flight.childTicket);
  const adultPrice = childPrice * 1.5;
  const updatedPrice =
    adults * adultPrice +
    children * childPrice +
    (flight.seatAllocation === "Together" && seatAllocation === "Random"
      ? -((adults + children) * 15)
      : flight.seatAllocation !== "Together" && seatAllocation === "Together"
      ? (adults + children) * 15
      : 0);
  const priceDifference = updatedPrice - flight.price;
  const priceDifferenceText =
    priceDifference === 0
      ? ""
      : priceDifference > 0
      ? `(+${currency}${
          currency === "$"
            ? (priceDifference * 1.05).toFixed(0)
            : priceDifference.toFixed(0)
        })`
      : `(-${currency}${Math.abs(priceDifference).toFixed(0)})`;

  function handleAdultsChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setAdults(Number(value));
  }

  function handleChildrenChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setChildren(Number(value));
  }

  function handleSeatAllocationChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    setSeatAllocation(value);
  }

  return (
    <form
      className="text-gray-700 border-1 border-gray-600 bg-primary-50 shadow-sm rounded-md text-lg py-4 px-8 w-[60%] max-sm:w-[90%] max-lg:w-[80%] flex flex-col"
      action={updateFlight}
    >
      <div className="space-y-2 mb-6">
        <label htmlFor="adultTicket">How many adults?</label>
        <select
          name="adultTicket"
          defaultValue={flight.adultTicket}
          id="adultTicket"
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
        <label htmlFor="childTicket">How many children?</label>
        <select
          name="childTicket"
          defaultValue={flight.childTicket}
          id="childTicket"
          className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          required
          onChange={handleChildrenChange}
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

      {adults + children > 1 && (
        <div className="space-y-2 mb-6">
          <label htmlFor="seatAllocation">Select your seat allocation</label>
          <select
            name="seatAllocation"
            defaultValue={flight.seatAllocation}
            id="seatAllocation"
            className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            onChange={handleSeatAllocationChange}
          >
            <option value="Random">Random</option>
            <option value="Together">
              Passengers together (
              {currency === "$" ? (15 * 1.05).toFixed(0) : 15}
              {currency}/person)
            </option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="other">Additional requests</label>
        <textarea
          name="other"
          defaultValue={flight.other}
          id="other"
          className="rounded-md px-5 py-2 w-full shadow-sm bg-primary-50 border border-black focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
        ></textarea>
      </div>
      <SubmitButton
        className="px-2 text-primary-50"
        className2="max-lg:justify-center"
      >
        Update flight {priceDifferenceText}
      </SubmitButton>
      <input type="hidden" name="id" value={flight.id} />
      <input type="hidden" name="price" value={updatedPrice} />
    </form>
  );
}
