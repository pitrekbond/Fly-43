"use client";

import { IoIosAirplane } from "react-icons/io";
import { useCurrency } from "./CurrencyContext";

type BasicFlightDataProps = {
  searchParams: Record<string, string>; // Define searchParams as a Record with string keys and values
};

export default function BasicFlightData({
  searchParams,
}: BasicFlightDataProps) {
  const {
    from,
    to,
    departureDate,
    adultTicket,
    childTicket,
    cabinClass,
    returnDate,
    totalPrice,
    fromCountry,
    toCountry,
  } = searchParams;

  const adultTickets = Number(adultTicket);
  const childTickets = Number(childTicket);
  const finalPrice = Number(totalPrice);

  const { currency } = useCurrency();
  const displayedPrice = currency === "$" ? finalPrice * 1.05 : finalPrice;

  return (
    <div className="flex items-start justify-center gap-8 border-gray-400 border-b pb-8 relative">
      <p className="text-2xl flex flex-col items-center gap-4 w-[216.18px] mr-10">
        1. Flight details <IoIosAirplane className="w-10 h-10" />
      </p>

      <div className="border-2 border-gray-400 p-2 rounded-md shadow-md grid grid-cols-4 grid-rows-2 gap-x-8 gap-y-6 w-[711.2px]">
        {/* Display flight details */}
        {[
          { label: "Origin", name: "from", value: from },
          { label: "Destination", name: "to", value: to },
          { label: "Departure date", name: "departure", value: departureDate },
          { label: "Return date", name: "return", value: returnDate || "" },
          { label: "Adult tickets", name: "adultTicket", value: adultTickets },
          { label: "Child tickets", name: "childTicket", value: childTickets },
          { label: "Cabin class", name: "cabinClass", value: cabinClass },
          {
            label: `Total price (${currency})`,
            name: "totalPrice",
            value: finalPrice,
          },
        ].map(({ label, name, value }) => (
          <div key={name} className="flex flex-col gap-1 items-center">
            <label className="text-sm text-accent-500">{label}</label>
            <input
              type="text"
              value={
                name === "totalPrice" && currency === "$"
                  ? displayedPrice
                  : value
              }
              disabled
              className="w-full border-none bg-transparent cursor-default text-lg text-center"
            />
            {/* Hidden input for form data */}
            <input type="hidden" name={name} value={value} />
          </div>
        ))}
        <input type="hidden" name="fromCountry" value={fromCountry} />
        <input type="hidden" name="toCountry" value={toCountry} />
      </div>
    </div>
  );
}
