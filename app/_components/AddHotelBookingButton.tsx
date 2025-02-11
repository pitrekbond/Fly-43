"use client";

import { useFormStatus } from "react-dom";
import { MdDone } from "react-icons/md";
import SpinnerMini from "./SpinnerMini";

export default function AddHotelBookingButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-600 hover:bg-accent-700 transition-colors w-full h-[50px] rounded-md px-4 py-1 mb-4 text-primary-50 text-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
      disabled={pending}
    >
      {!pending ? (
        <>
          <span>Reserve now</span>
          <MdDone className="h-7 w-7" />
        </>
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}
