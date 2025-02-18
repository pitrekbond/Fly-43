"use client";

import { ReactNode, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

type Guest = {
  fullName: string;
  email: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
  dateOfBirth?: Date;
};

type PersonalDataHotelsProps = {
  guest: Guest;
  fieldNames: string[];
  children: ReactNode;
};

export default function PersonalDataHotels({
  fieldNames,
  guest,
  children,
}: PersonalDataHotelsProps) {
  const { fullName, nationalID, dateOfBirth } = guest;
  const [date, setDate] = useState<Date>(dateOfBirth || new Date());

  return (
    <div className="text-gray-700 border border-gray-600 bg-primary-50 shadow-sm rounded-md py-3 px-2 flex flex-col max-sm:w-[90%] max-lg:w-[80%] lg:w-full">
      <p className="text-xl font-semibold">Enter your details</p>
      <div className="mt-4 lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-4 lg:gap-y-6 max-lg:gap-4 max-lg:flex max-lg:flex-col">
        <div className="flex flex-col gap-1">
          <label htmlFor={fieldNames[0]} className="text-sm font-semibold">
            Full Name
          </label>
          <input
            name={fieldNames[0]}
            id={fieldNames[0]}
            defaultValue={fullName}
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 border border-black bg-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent lg:w-[330px] "
            style={{
              transition:
                "box-shadow 0.2s, border-color 0.2s, background-color 0.2s",
            }}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={fieldNames[1]} className="text-sm font-semibold">
            Date of Birth
          </label>
          <DatePicker
            onChange={(date) => setDate(date!)} // Use the non-null assertion here
            selected={date}
            dateFormat="dd/MM/yyyy"
            id={fieldNames[1]}
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 border border-black bg-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent max-lg:w-[100%] lg:w-[330px]"
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
          <label htmlFor={fieldNames[2]} className="text-sm font-semibold">
            National ID number
          </label>
          <input
            name={fieldNames[2]}
            id={fieldNames[2]}
            defaultValue={nationalID}
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 border border-black bg-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent lg:w-[330px]"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nationality" className="text-sm font-semibold">
            Nationality
          </label>
          {children}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={fieldNames[3]} className="text-sm font-semibold">
            Phone number
          </label>
          <input
            name={fieldNames[3]}
            id={fieldNames[3]}
            type="number"
            className="py-2 pl-2 disabled:bg-gray-400 disabled:text-gray-200 border border-black bg-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent lg:w-[330px]"
            style={{
              transition:
                "box-shadow 0.2s, border-color 0.2s, background-color 0.2s",
            }}
            required
          />
        </div>
      </div>
    </div>
  );
}
