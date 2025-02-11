import { createPortal } from "react-dom";

type HotelGuestSelectorProps = {
  onClose: () => void;
  adults: number;
  setAdults: (value: (a: number) => number) => void;
  kids: number;
  setKids: (value: (c: number) => number) => void;
  rooms: number;
  setRooms: (value: (r: number) => number) => void;
  updateURLOther?: (value: number, field: string) => void;
  className: string;
};

export default function HotelGuestSelector({
  onClose,
  adults,
  setAdults,
  kids,
  setKids,
  rooms,
  setRooms,
  updateURLOther,
  className,
}: HotelGuestSelectorProps) {
  function addRoom() {
    setRooms((prevRooms) => {
      const updatedRooms = Math.min(6, prevRooms + 1);
      if (updateURLOther) {
        updateURLOther(updatedRooms, "rooms");
      }
      return updatedRooms;
    });
  }
  function deleteRoom() {
    setRooms((prevRooms) => {
      const updatedRooms = Math.max(1, prevRooms - 1);
      if (updateURLOther) {
        updateURLOther(updatedRooms, "rooms");
      }
      return updatedRooms;
    });
  }
  function addAdult() {
    setAdults((prevAdults) => {
      const updatedAdults = Math.min(8, prevAdults + 1);
      if (updateURLOther) {
        updateURLOther(updatedAdults, "adults");
      }
      return updatedAdults;
    });
  }
  function deleteAdult() {
    setAdults((prevAdults) => {
      const updatedAdults = Math.max(1, prevAdults - 1);
      if (updateURLOther) {
        updateURLOther(updatedAdults, "adults");
      }
      return updatedAdults;
    });
  }
  function addKid() {
    setKids((prevKids) => {
      const updatedKids = Math.min(8, prevKids + 1);
      if (updateURLOther) {
        updateURLOther(updatedKids, "kids");
      }
      return updatedKids;
    });
  }
  function deleteKid() {
    setKids((prevKids) => {
      const updatedKids = Math.max(0, prevKids - 1);
      if (updateURLOther) {
        updateURLOther(updatedKids, "kids");
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
        className={`rounded-md ${className} h-[280px] w-[20rem] bg-white absolute left-[28rem] text-gray-900 p-4 flex flex-col gap-6`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Rooms</p>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={deleteRoom}
                disabled={rooms === 1}
              >
                -
              </button>
              <span className="flex items-center w-[13px] justify-center">
                {rooms}
              </span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={addRoom}
                disabled={rooms === 6}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Adults</p>
              <p>Age 16+</p>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={deleteAdult}
                disabled={adults === 1}
              >
                -
              </button>
              <span className="flex items-center w-[13px] justify-center">
                {adults}
              </span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={addAdult}
                disabled={adults === 8}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Children</p>
              <p>Age 0-15</p>
            </div>
            <div className="flex gap-3 text-xl">
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={deleteKid}
                disabled={kids === 0}
              >
                -
              </button>
              <span className="flex items-center w-[13px] justify-center">
                {kids}
              </span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors w-[37.66px] disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                onClick={addKid}
                disabled={kids === 8}
              >
                +
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Children under the age of 16 cannot book hotels alone.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
