import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { BiSolidBath } from "react-icons/bi";
import comfortHotel from "@/public/comfortHotel.jpg";
import SelectHotelButton from "./SelectHotelButton";

type ComfortHotelProps = {
  searchParams: {
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    adults: string;
    kids: string;
    rooms: string;
  };
};

export default function ComfortHotel({ searchParams }: ComfortHotelProps) {
  return (
    <div className="border-2 border-accent-500 rounded-md flex flex-col gap-3 items-center bg-primary-50 text-gray-700 px-2">
      <p className="text-xl font-semibold">Comfort</p>
      <div className="flex">
        <div className="w-[200px] aspect-[4/3] relative">
          <Image
            src={comfortHotel}
            alt="Photo of a comfort hotel"
            placeholder="blur"
            quality={100}
            layout="fill" // Make the image fill the container
            objectFit="cover" // Ensures the image is not stretched
          />
        </div>
        <div className="flex flex-col gap-4 ml-3">
          <p className="flex gap-2">
            <IoLocation className="h-5 w-5" /> 0,5km from city center
          </p>
          <p className="flex gap-2">
            <MdOutlineFreeBreakfast className="h-5 w-5" /> Breakfast included
          </p>
          <p className="flex gap-2">
            <IoBed className="h-5 w-5" /> Extra size beds
          </p>
          <p className="flex gap-2">
            <BiSolidBath className="h-5 w-5" /> Private bathroom
          </p>
        </div>
      </div>

      <SelectHotelButton searchParams={searchParams} hotel="Comfort" />
    </div>
  );
}
