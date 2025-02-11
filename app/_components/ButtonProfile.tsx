"use client";

import { useFormStatus } from "react-dom";

export default function ButtonProfile() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-600 hover:bg-accent-700 rounded-md p-2 transition-colors mr-10 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 w-[129.35px]"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update profile"}
    </button>
  );
}
