"use client";

import { IoPerson } from "react-icons/io5";
import { Guest } from "./FlightReservationForm";
import DatePicker from "react-datepicker";
import { ReactNode, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

type PersonalDataProps = {
  guest: Guest;
  fieldNames: string[];
  children: ReactNode;
};

export default function PersonalData({
  guest,
  fieldNames,
  children,
}: PersonalDataProps) {
  const { fullName, email, nationalID, nationality, dateOfBirth } = guest;

  const [date, setDate] = useState<Date>(dateOfBirth || new Date());

  return (
    <div className="flex items-start gap-8 border-gray-400 border-b pb-8 mt-8">
      <p className="text-2xl flex flex-col items-center gap-4 w-[216.18px]">
        2. Personal data <IoPerson className="w-10 h-10" />
      </p>

      <div className="border-2 border-gray-400 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-6 p-2 rounded-md shadow-md">
        <div className="flex flex-col gap-1">
          <label htmlFor={fieldNames[0]} className="text-sm text-accent-500">
            Full Name
          </label>
          <input
            name={fieldNames[0]}
            id={fieldNames[0]}
            defaultValue={fullName}
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 focus:border-transparent rounded-md border border-black bg-primary-50 text-gray-700 focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={fieldNames[1]} className="text-sm text-accent-500">
            Date of Birth
          </label>
          <DatePicker
            onChange={(date) => setDate(date!)} // Use the non-null assertion here
            selected={date}
            dateFormat="dd/MM/yyyy"
            id={fieldNames[1]}
            className="py-2 pl-2 w-[330px] bg-primary-50 text-gray-700 focus:border-transparent focus:outline-none border border-black focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] rounded-md"
            name={fieldNames[1]}
            popperPlacement="bottom-start"
            popperContainer={({ children }) => (
              <div className="react-datepicker-container z-50">{children}</div>
            )}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={fieldNames[2]} className="text-sm text-accent-500">
            National ID number
          </label>
          <input
            name={fieldNames[2]}
            id={fieldNames[2]}
            defaultValue={nationalID}
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 rounded-md focus:border-transparent border border-black bg-primary-50 text-gray-700 focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nationality" className="text-sm text-accent-500">
            Nationality
          </label>
          {children}
        </div>
      </div>
    </div>
  );
}
