"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateProfile } from "../_lib/actions";
import ButtonProfile from "./ButtonProfile";

type Guest = {
  fullName: string;
  email: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
  dateOfBirth?: Date;
};

type UpdateProfileFormProps = {
  guest: Guest;
  children: ReactNode;
};

export default function UpdateProfileForm({
  guest,
  children,
}: UpdateProfileFormProps) {
  const { fullName, email, nationalID, countryFlag, dateOfBirth } = guest;
  //have to tell TS that date can be null if no date is selected
  const [date, setDate] = useState<Date>(dateOfBirth || new Date());

  return (
    <form
      className="bg-primary-950 flex flex-col items-start gap-6 w-[600px] py-8"
      action={updateProfile}
    >
      <div className="ml-10 flex flex-col gap-2 w-full">
        <label htmlFor="fullName">Full name</label>
        <input
          disabled
          defaultValue={fullName}
          className="py-2 pl-2 w-[520px] disabled:bg-gray-400 disabled:text-gray-200 rounded-md"
          name="fullName"
        />
      </div>

      <div className="ml-10 flex flex-col gap-2 w-full">
        <label htmlFor="email">Email address</label>
        <input
          disabled
          defaultValue={email}
          className="py-2 pl-2 w-[520px] disabled:bg-gray-400 disabled:text-gray-200 rounded-md"
          name="email"
        />
      </div>

      <div className="ml-10 flex flex-col gap-2 w-full">
        <label htmlFor="dateOfBirth">Date of birth</label>
        <DatePicker
          onChange={(date) => setDate(date!)} // Use the non-null assertion here
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="dateOfBirth"
          className="py-2 pl-2 w-[520px] bg-accent-50 text-gray-900 focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] rounded-md"
          name="dateOfBirth"
          popperPlacement="bottom-start"
          popperContainer={({ children }) => (
            <div className="react-datepicker-container z-50">{children}</div>
          )}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>

      <div className="ml-10 flex flex-col gap-2 w-full">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          className="py-2 pl-2 w-[520px] bg-accent-50 text-gray-900 focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] rounded-md"
          name="nationalID"
        />
      </div>

      <div className="ml-10 flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              // We needed to check if there is countryFlag because we're using Image from Next.js here, for a normal img element we wouldnt have to do it
              src={countryFlag}
              alt="Country flag"
              height="30"
              width="30"
              quality={100}
              className="mr-20"
            />
          )}
        </div>
        {children}
      </div>

      <div className="flex flex-col items-end w-full">
        <ButtonProfile />
      </div>
    </form>
  );
}
