import {
  differenceInDays,
  format,
  isPast,
  isToday,
  isWithinInterval,
  parseISO,
} from "date-fns";
import Image from "next/image";
import budgetHotel from "@/public/budgetHotel.jpg";
import comfortHotel from "@/public/comfortHotel.jpg";
import luxuryHotel from "@/public/luxuryHotel.jpg";
import Link from "next/link";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteItem from "./DeleteItem";
import { useState } from "react";
import ViewBookingDetails from "./ViewBookingDetails";
import { useCurrency } from "./CurrencyContext";

type BookingCardProps = {
  booking: Record<string, any>;
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

export default function BookingCard({ booking, onDelete }: BookingCardProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const { currency } = useCurrency();

  const {
    id,
    created_at,
    city,
    country,
    startDate,
    endDate,
    numNights,
    adults,
    kids,
    rooms,
    hotel,
    price,
    flag,
  } = booking;

  const today = new Date();
  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);

  const isTodayWithinRange = isWithinInterval(today, {
    start: startingDate,
    end: endingDate,
  });

  let image;
  if (hotel === "Budget") {
    image = budgetHotel;
  } else if (hotel === "Comfort") {
    image = comfortHotel;
  } else {
    image = luxuryHotel;
  }

  return (
    <>
      <li className="flex border border-gray-700 bg-primary-50 w-[75%] text-gray-700">
        <div className="relative h-[142.4px] aspect-square">
          <Image
            src={image}
            alt="Image of a hotel`"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="flex-grow px-6 py-3 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex gap-2">
              {numNights} night{numNights > 1 && "s"} in {city}
              {flag && (
                <Image
                  src={flag}
                  alt="Country flag"
                  width={32} // Try different dimensions
                  height={24}
                  unoptimized // Disable Next.js image optimization
                  className="object-contain" // Ensure proper scaling
                />
              )}
            </h3>
            {isToday(startingDate) || isTodayWithinRange ? (
              <span className="bg-yellow-300 text-white h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Current
              </span>
            ) : isPast(startingDate) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Past
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Upcoming
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-500">
              {format(startingDate, "EEE, MMM dd yyyy")} (
              {formatDistanceFromNow(startDate)}) —{" "}
              {format(endingDate, "EEE, MMM dd yyyy")}
            </p>
            {hotel === "Budget" ? (
              <span className="border border-gray-400 text-orange-800 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Budget
              </span>
            ) : hotel === "Comfort" ? (
              <span className="border border-gray-400 text-gray-500 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Comfort
              </span>
            ) : (
              <span className="border border-gray-400 text-rose-700 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                Luxury
              </span>
            )}
          </div>

          <div className="flex gap-5 mt-auto items-baseline">
            <p className="text-xl font-semibold text-accent-600">
              {currency}
              {currency === "$" ? (price * 1.05).toFixed(0) : price}
            </p>
            <p className="text-gray-500">&bull;</p>
            <p className="text-lg text-gray-500">
              {adults} adult{adults > 1 && "s"}
              {kids > 0 && `, ${kids} child${kids > 1 ? "ren" : ""}`}
            </p>
            <p className="text-gray-500">&bull;</p>
            <p className="text-lg text-gray-500">
              {rooms} room{rooms > 1 && "s"}
            </p>
            <p className="ml-auto text-sm text-gray-500">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>
        <div className="flex flex-col border-l border-gray-700 w-[100px]">
          {!isPast(endingDate) && !isTodayWithinRange ? (
            <>
              <Link
                href={`/reservations/bookings/editBooking/${id}`}
                className="group flex items-center gap-2 uppercase text-xs font-bold text-gray-500 border-b border-gray-700 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-50"
              >
                <PencilSquareIcon className="h-5 w-5 text-gray-500 group-hover:text-primary-50 transition-colors" />
                <span className="mt-1">Edit</span>
              </Link>
              <DeleteItem itemId={id} onDelete={onDelete} item="booking" />
            </>
          ) : (
            <button
              onClick={() => setIsOpenDetails(true)}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-gray-500  flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-50"
            >
              <EyeIcon className="h-5 w-5 text-gray-500 group-hover:text-primary-50 transition-colors" />
              <span className="mt-1">View</span>
            </button>
          )}
        </div>
      </li>
      {isOpenDetails && (
        <ViewBookingDetails
          onClose={() => setIsOpenDetails(false)}
          booking={booking}
        />
      )}
    </>
  );
}
