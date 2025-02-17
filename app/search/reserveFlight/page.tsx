import FlightReservationForm from "@/app/_components/FlightReservationForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Record<string, string>; // Define searchParams as a Record with string keys and values
};

export const metadata = {
  title: "Reserve Flight",
};

export default async function Page({ searchParams }: PageProps) {
  if (!searchParams.from || !searchParams.to || !searchParams.departureDate) {
    notFound();
  }
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Session or user email is missing");
  }

  const guest = await getGuest(session.user.email);

  return (
    <main className="bg-primary-50 text-gray-700 rounded-md lg:mx-[230px] py-6 mb-10 lg:h-[75rem] flex items-center flex-col max-sm:w-[90%] max-lg:w-[80%] max-lg:mx-auto">
      <h1 className="text-4xl font-semibold max-lg:text-center">
        Finish your flight reservation
      </h1>
      <FlightReservationForm guest={guest} searchParams={searchParams} />
    </main>
  );
}
