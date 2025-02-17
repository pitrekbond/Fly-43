import BudgetHotel from "@/app/_components/BudgetHotel";
import ComfortHotel from "@/app/_components/ComfortHotel";
import LuxuryHotel from "@/app/_components/LuxuryHotel";
import ResultBarHotels from "@/app/_components/ResultBarHotels";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Search Hotel",
};

type PageProps = {
  searchParams: Record<string, string>; // Define searchParams as a Record with string keys and values
};

export default function Page({ searchParams }: PageProps) {
  if (!searchParams.city || !searchParams.startDate || !searchParams.endDate) {
    notFound();
  }

  const { city, country, startDate, endDate, adults, kids, rooms } =
    searchParams;

  return (
    <main className="bg-primary-900 rounded-md mx-6 lg:pl-20 py-6 lg:h-[40rem] flex flex-col max-lg:items-center">
      <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold lg:mt-10 max-lg:text-center">
        Our hotels in {city}, {country}
      </h1>
      <ResultBarHotels
        city={city}
        startDate={startDate}
        endDate={endDate}
        adults={adults}
        kids={kids}
        rooms={rooms}
      />
      <div className="flex max-lg:flex-col gap-6 max-sm:mt-4 mt-10">
        <BudgetHotel
          searchParams={{
            city,
            country,
            startDate,
            endDate,
            adults,
            kids,
            rooms,
          }}
        />
        <ComfortHotel
          searchParams={{
            city,
            country,
            startDate,
            endDate,
            adults,
            kids,
            rooms,
          }}
        />
        <LuxuryHotel
          searchParams={{
            city,
            country,
            startDate,
            endDate,
            adults,
            kids,
            rooms,
          }}
        />
      </div>
    </main>
  );
}
