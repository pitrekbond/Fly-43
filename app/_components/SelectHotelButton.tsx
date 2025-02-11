"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

type SelectHotelButtonProps = {
  searchParams: {
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    adults: string;
    kids: string;
    rooms: string;
  };
  hotel: string;
};

export default function SelectHotelButton({
  searchParams,
  hotel,
}: SelectHotelButtonProps) {
  const { city, country, startDate, endDate, adults, kids, rooms } =
    searchParams;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const params = new URLSearchParams({
      city,
      country,
      startDate,
      endDate,
      adults,
      kids,
      rooms,
      hotel,
    });

    startTransition(() => {
      router.push(`/hotels/searchHotels/reserveHotel?${params.toString()}`);
    });
  }

  return (
    <button
      className="bg-accent-600 hover:bg-accent-700 transition-colors w-[130px] h-[40px] rounded-md px-4 py-1 mb-4 text-primary-50 text-xl disabled:cursor-not-allowed flex items-center justify-center"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? <SpinnerMini /> : "Select"}
    </button>
  );
}
