import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  differenceInDays,
  format,
  isPast,
  isToday,
  isWithinInterval,
  parseISO,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ViewFlightDetails from "./ViewFlightDetails";
import DeleteItem from "./DeleteItem";
import { useCurrency } from "./CurrencyContext";
import CityImg from "./CityImg";

type FlightCardProps = {
  flight: Record<string, any>;
  onDelete: (itemId: number, item: "flight" | "booking") => void;
};

export const formatDistanceFromNow = (dateStr: string) => {
  const date = parseISO(dateStr);
  const today = new Date();

  // Normalize both dates to midnight (00:00:00) to avoid time-related shifts
  const normalizedDate = new Date(date.setHours(0, 0, 0, 0));
  const normalizedToday = new Date(today.setHours(0, 0, 0, 0));

  const daysDifference = differenceInDays(normalizedDate, normalizedToday);

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference > 0) {
    return `in ${daysDifference} day${daysDifference !== 1 ? "s" : ""}`;
  } else {
    return `${Math.abs(daysDifference)} day${
      Math.abs(daysDifference) !== 1 ? "s" : ""
    } ago`;
  }
};

export default function FlightCard({ flight, onDelete }: FlightCardProps) {
  const {
    id,
    from,
    fromCountryFlag,
    to,
    toCountryFlag,
    departure,
    returnF,
    isReturn,
    adultTicket,
    childTicket,
    price,
    created_at,
    toCityImage,
  } = flight;
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const { currency } = useCurrency();

  const today = new Date();
  const departureDate = new Date(departure);
  const returnDate = new Date(returnF);

  const isTodayWithinRange = isWithinInterval(today, {
    start: departureDate,
    end: returnDate,
  });

  const displayedDate = currency === "$" ? (price * 1.05).toFixed(0) : price;

  return (
    <>
      <li className="flex max-sm:flex-col border border-gray-700 bg-primary-50 w-[75%] text-gray-700">
        <div className="relative h-[142.4px] aspect-square">
          {toCityImage && (
            <img
              src={toCityImage}
              alt={`Image of ${to}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
        </div>
        <div className="flex-grow max-sm:px-1 md:px-6 py-3 flex flex-col gap-4">
          <div className="flex items-center lg:justify-between max-lg:gap-4">
            <h3 className="max-sm:text-base max-lg:text-center text-xl font-semibold flex gap-2">
              {fromCountryFlag && (
                <Image
                  src={fromCountryFlag}
                  alt="Country flag"
                  width={32} // Try different dimensions
                  height={24}
                  unoptimized // Disable Next.js image optimization
                  className="object-contain" // Ensure proper scaling
                />
              )}{" "}
              {from}- {to}{" "}
              {toCountryFlag && (
                <Image
                  src={toCountryFlag}
                  alt="Country flag"
                  width={32} // Try different dimensions
                  height={24}
                  unoptimized // Disable Next.js image optimization
                  className="object-contain" // Ensure proper scaling
                />
              )}
            </h3>
            {isPast(returnDate) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 max-sm:px-1 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Past
              </span>
            ) : isTodayWithinRange ? (
              <span className="bg-yellow-300 text-white h-7 max-sm:px-1 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Current
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 max-sm:px-1 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Upcoming
              </span>
            )}
          </div>
          <div className="flex items-center md:justify-between max-sm:gap-4">
            <p className="text-lg text-gray-500">
              {format(departureDate, "EEE, MMM dd yyyy")} (
              {isToday(departureDate)
                ? "Today"
                : formatDistanceFromNow(departure)}
              ){isReturn && ` — ${format(returnDate, "EEE, MMM dd yyyy")}`}
            </p>
            {isReturn ? (
              <span className="bg-blue-300 text-black h-7 max-sm:px-1 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Round-trip
              </span>
            ) : (
              <span className="bg-black text-blue-300 h-7 max-sm:px-1 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                One-way
              </span>
            )}
          </div>

          <div className="flex gap-3 md:gap-5 mt-auto items-baseline max-sm:items-center">
            <p className="text-xl font-semibold text-accent-600">
              {currency}
              {displayedDate}
            </p>
            <p className="text-gray-500">&bull;</p>
            <p className="text-lg text-gray-500 max-lg:text-center">
              {adultTicket} adult{adultTicket > 1 && "s"}
              {childTicket > 0 &&
                `, ${childTicket} child${childTicket > 1 ? "ren" : ""}`}
            </p>
            <p className="ml-auto text-sm text-gray-500">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>
        <div className="flex flex-col max-sm:flex-row max-sm:border-t max-sm:h-[45px] md:border-l border-gray-700 max-sm:w-full w-[100px]">
          {(!isPast(departureDate) && !isReturn) ||
          (!isPast(returnDate) && !isTodayWithinRange) ? (
            <>
              <Link
                href={`/reservations/editFlight/${id}`}
                className="group flex items-center max-sm:justify-center gap-2 uppercase text-xs font-bold text-gray-500 max-sm:border-r md:border-b border-gray-700 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-50"
              >
                <PencilSquareIcon className="h-5 w-5 text-gray-500 group-hover:text-primary-50 transition-colors" />
                <span className="mt-1">Edit</span>
              </Link>
              <DeleteItem itemId={id} onDelete={onDelete} item="flight" />
            </>
          ) : (
            <button
              onClick={() => setIsOpenDetails(true)}
              className="group flex items-center max-sm:justify-center gap-2 uppercase text-xs font-bold text-gray-500 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-50"
            >
              <EyeIcon className="h-5 w-5 text-gray-500 group-hover:text-primary-50 transition-colors" />
              <span className="mt-1">View</span>
            </button>
          )}
        </div>
      </li>
      {isOpenDetails && (
        <ViewFlightDetails
          onClose={() => setIsOpenDetails(false)}
          flight={flight}
        />
      )}
    </>
  );
}
