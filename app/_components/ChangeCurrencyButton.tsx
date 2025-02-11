"use client";

import { MdEuro } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { useCurrency } from "./CurrencyContext";

export default function ChangeCurrencyButton() {
  const { currency, toggleCurrency } = useCurrency();
  return (
    <button
      className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-primary-600 transition-colors"
      onClick={toggleCurrency}
    >
      {currency === "€" ? (
        <MdEuro className="h-5 w-5 text-primary-50" />
      ) : (
        <BsCurrencyDollar className="h-5 w-5 text-primary-50" />
      )}
    </button>
  );
}
