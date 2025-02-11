import Link from "next/link";

export const metadata = {
  title: "Thank you",
};

type ThankYouPageProps = {
  searchParams: {
    city: string;
    res: string;
  };
};

export default function Page({ searchParams }: ThankYouPageProps) {
  const { city, res } = searchParams;

  return (
    <div className="text-center flex flex-col items-center space-y-6 mt-[150px]">
      <h1 className="text-3xl font-semibold">
        Thank you for{" "}
        {res === "hotel"
          ? `your reservation in ${city}`
          : `reserving a flight to ${city}`}
        !
      </h1>
      <div className="flex gap-10">
        <div>
          <p className="mb-2">Go to your reservations</p>
          <Link
            href={res === "hotel" ? "/reservations/bookings" : "/reservations"}
            className="text-xl bg-accent-600 inline-block p-2 hover:bg-accent-700 rounded-md transition-colors"
          >
            Reservations &rarr;
          </Link>
        </div>
        <div>
          <p className="mb-2">
            Would you also like to book a {res === "hotel" ? "flight" : "hotel"}
            ?
          </p>
          <Link
            href={res === "hotel" ? "/" : "/hotels"}
            className="text-xl bg-accent-600 inline-block p-2 hover:bg-accent-700 rounded-md transition-colors"
          >
            {res === "hotel" ? "Flights" : "Hotels"} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
