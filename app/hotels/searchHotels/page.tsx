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
    <main className="bg-primary-900 rounded-md mx-6 pl-20 py-6 h-[40rem] flex flex-col">
      <h1 className="text-4xl font-semibold mt-10">
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
      <div className="flex gap-6 mt-10">
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
