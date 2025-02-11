"use client";

import { createPortal } from "react-dom";

type PassengerSelectorProps = {
  onClose: () => void;
  adultTicket: number;
  setAdultTicket: (value: (at: number) => number) => void;
  childTicket: number;
  setChildTicket: (value: (ct: number) => number) => void;
  cabinClass: string;
  setCabinClass: (value: string) => void;
  updateURLOther?: (value: number | string, field: string) => void;
  className: string;
};

export default function PassengerSelector({
  onClose,
  adultTicket,
  setAdultTicket,
  childTicket,
  setChildTicket,
  cabinClass,
  setCabinClass,
  updateURLOther,
  className,
}: PassengerSelectorProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    if (updateURLOther) {
      updateURLOther(value, "cabinClass");
    }
    setCabinClass(value);
  }

  function addAdult() {
    setAdultTicket((prevAdults) => {
      const updatedAdults = Math.min(8, prevAdults + 1);
      if (updateURLOther) {
        updateURLOther(updatedAdults, "adultTicket");
      }
      return updatedAdults;
    });
  }
  function deleteAdult() {
    setAdultTicket((prevAdults) => {
      const updatedAdults = Math.max(1, prevAdults - 1);
      if (updateURLOther) {
        updateURLOther(updatedAdults, "adultTicket");
      }
      return updatedAdults;
    });
  }
  function addKid() {
    setChildTicket((prevKids) => {
      const updatedKids = Math.min(8, prevKids + 1);
      if (updateURLOther) {
        updateURLOther(updatedKids, "childTicket");
      }
      return updatedKids;
    });
  }
  function deleteKid() {
    setChildTicket((prevKids) => {
      const updatedKids = Math.max(0, prevKids - 1);
      if (updateURLOther) {
        updateURLOther(updatedKids, "childTicket");
      }
      return updatedKids;
    });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`${className} rounded-md h-[20rem] w-[20rem] bg-white absolute text-gray-900 p-4`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="class">
              Cabin class
            </label>
            <select
              className="py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-transparent ring-offset-[-1px]"
              id="class"
              value={cabinClass}
              onChange={handleChange}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Adults</p>
              <p>Age 16+</p>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={deleteAdult}
                disabled={adultTicket === 1}
              >
                -
              </button>
              <span className="flex items-center w-[13px] justify-center">
                {adultTicket}
              </span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={addAdult}
                disabled={adultTicket === 8}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Children</p>
              <p>Age 0 to 15</p>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={deleteKid}
                disabled={childTicket === 0}
              >
                -
              </button>
              <span className="flex items-center justify-center w-[13px]">
                {childTicket}
              </span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={addKid}
                disabled={childTicket === 8}
              >
                +
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Children under the age of 16 cannot travel alone.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
