"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaArrowRight } from "react-icons/fa6";
import SpinnerMini from "./SpinnerMini";
import { useCurrency } from "./CurrencyContext";

type PriceFlightProps = {
  from: string;
  to: string;
  departureDate: string;
  isReturn: boolean;
  adultTicket: number;
  childTicket: number;
  cabinClass: string;
  totalPrice: number;
  returnDate?: string;
  fromCountry: string;
  toCountry: string;
};

export default function PriceFlight({
  from,
  to,
  departureDate,
  isReturn,
  adultTicket,
  childTicket,
  cabinClass,
  totalPrice,
  returnDate,
  fromCountry,
  toCountry,
}: PriceFlightProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { currency } = useCurrency();

  const displayedPrice = currency === "$" ? totalPrice * 1.05 : totalPrice;

  function handleSelect() {
    const params = new URLSearchParams({
      from,
      fromCountry,
      to,
      toCountry,
      departureDate,
      isReturn: isReturn.toString(),
      adultTicket: adultTicket.toString(),
      childTicket: childTicket.toString(),
      cabinClass,
      totalPrice: totalPrice.toString(),
      ...(returnDate && { returnDate }), // Conditionally add returnDate if it's not undefined
    });

    startTransition(() => {
      router.push(`/search/reserveFlight?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center w-1/3 border-l border-gray-300 py-4">
      <p className="text-sm">Total price</p>
      <p className="text-lg text-black font-semibold">
        {displayedPrice}
        {currency === "€" ? "€" : "$"}
      </p>
      <button
        className="flex items-center justify-center gap-2 mt-2 bg-accent-600 text-primary-50 p-2 rounded-md hover:bg-accent-700 transition-colors disabled:cursor-not-allowed w-[100px] h-[40px]"
        onClick={handleSelect}
        disabled={isPending}
      >
        {isPending ? (
          <SpinnerMini />
        ) : (
          <>
            Select <FaArrowRight className="h-5 w-5" />
          </>
        )}
      </button>
    </div>
  );
}
