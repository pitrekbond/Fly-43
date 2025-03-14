"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

type SubmitButtonProps = {
  className: string;
  className2?: string;
  children: ReactNode;
};

export default function SubmitButton({
  className,
  className2,
  children,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <div className={`flex lg:justify-end mt-8 ${className2}`}>
      <button
        className={`${className} min-w-[170px] h-[44px] py-2 bg-accent-600 text-primary-50 hover:bg-accent-700 transition-colors rounded-md flex gap-1 disabled:cursor-not-allowed items-center justify-center`}
        disabled={pending}
      >
        {pending ? <SpinnerMini /> : children}
      </button>
    </div>
  );
}
