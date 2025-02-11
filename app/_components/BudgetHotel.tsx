import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { FaBusSimple } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { BiSolidBath } from "react-icons/bi";
import budgetHotel from "@/public/budgetHotel.jpg";
import SelectHotelButton from "./SelectHotelButton";

type BudgetHotelProps = {
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

export default function BudgetHotel({ searchParams }: BudgetHotelProps) {
  return (
    <div className="border-2 border-accent-500 rounded-md flex flex-col gap-3 items-center bg-primary-50 text-gray-700 px-2">
      <p className="text-xl font-semibold">Budget</p>
      <div className="flex">
        <div className="w-[200px] aspect-[4/3] relative">
          <Image
            src={budgetHotel}
            alt="Photo of a budget hostel"
            placeholder="blur"
            quality={100}
            layout="fill" // Make the image fill the container
            objectFit="cover" // Ensures the image is not stretched
          />
        </div>
        <div className="flex flex-col gap-4 ml-3">
          <p className="flex gap-2">
            <IoLocation className="h-5 w-5" /> 5km from city center
          </p>
          <p className="flex gap-2">
            <FaBusSimple className="h-5 w-5" /> 3min from public transit
          </p>
          <p className="flex gap-2">
            <IoBed className="h-5 w-5" /> Standard beds
          </p>
          <p className="flex gap-2">
            <BiSolidBath className="h-5 w-5" /> Shared bathroom
          </p>
        </div>
      </div>

      <SelectHotelButton searchParams={searchParams} hotel="Budget" />
    </div>
  );
}
