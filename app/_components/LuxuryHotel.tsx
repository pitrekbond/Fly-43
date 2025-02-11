import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { MdAllInclusive } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { BiSolidBath } from "react-icons/bi";
import luxuryHotel from "@/public/luxuryHotel.jpg";
import SelectHotelButton from "./SelectHotelButton";

type LuxuryHotelProps = {
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

export default function LuxuryHotel({ searchParams }: LuxuryHotelProps) {
  return (
    <div className="border-2 border-accent-500 rounded-md flex flex-col gap-3 items-center bg-primary-50 text-gray-700 px-2">
      <p className="text-xl font-semibold">Luxury</p>
      <div className="flex">
        <div className="w-[200px] aspect-[4/3] relative">
          <Image
            src={luxuryHotel}
            alt="Photo of a luxury hotel"
            placeholder="blur"
            quality={100}
            layout="fill" // Make the image fill the container
            objectFit="cover" // Ensures the image is not stretched
          />
        </div>
        <div className="flex flex-col gap-4 ml-3">
          <p className="flex gap-2">
            <IoLocation className="h-5 w-5" /> 1km from city center
          </p>
          <p className="flex gap-2">
            <MdAllInclusive className="h-5 w-5" /> All inclusive
          </p>
          <p className="flex gap-2">
            <IoBed className="h-5 w-5" /> King-size beds
          </p>
          <p className="flex gap-2">
            <BiSolidBath className="h-5 w-5" /> Private bathroom + spa
          </p>
        </div>
      </div>

      <SelectHotelButton searchParams={searchParams} hotel="Luxury" />
    </div>
  );
}
