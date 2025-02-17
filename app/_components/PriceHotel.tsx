"use client";

import { BREAKFAST_PRICE, TRANSFER_PRICE } from "../utils";
import { useCurrency } from "./CurrencyContext";
import { useHotelReservation } from "./HotelReservationContext";

type PriceHotelProps = {
  totalPrice: number;
  numNights: number;
  numberOfGuests: number;
};

export default function PriceHotel({
  totalPrice,
  numNights,
  numberOfGuests,
}: PriceHotelProps) {
  const { hasBreakfast, hasTransfer } = useHotelReservation();
  const totalBreakfastPrice = hasBreakfast
    ? numNights * numberOfGuests * BREAKFAST_PRICE
    : 0;
  const { currency } = useCurrency();

  const priceWithExtras =
    totalPrice + totalBreakfastPrice + (hasTransfer ? TRANSFER_PRICE : 0);

  return (
    <div className="text-gray-700 border-1 border-gray-600 bg-primary-50 shadow-sm rounded-md py-3 flex flex-col items-start max-lg:w-[80%] lg:w-[320px]">
      <p className="text-xl font-semibold px-2">Your price summary</p>
      <div className="flex justify-between text-2xl font-semibold py-4 bg-accent-200 w-full mt-3">
        <span className="ml-2">Total</span>
        <span className="mr-2">
          {currency === "$"
            ? (priceWithExtras * 1.05).toFixed(0)
            : priceWithExtras}
          {currency}
        </span>
      </div>
      <input type="hidden" name="price" value={priceWithExtras} />
    </div>
  );
}
