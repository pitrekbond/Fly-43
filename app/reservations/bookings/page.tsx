import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings, getCountries } from "@/app/_lib/data-service";
import { COUNTRY_NAME_MAPPING } from "@/app/utils";
import Link from "next/link";

export const metadata = {
  title: "Your Bookings",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.guestId)
    throw new Error("You have to be logged in to access your bookings");

  const bookings = await getBookings(session.user.guestId as string);
  const countries = await getCountries();
  const bookingsWithFlags = bookings.map((booking: any) => {
    // Use the mapping to standardize the country name
    const mappedCountryName =
      COUNTRY_NAME_MAPPING[booking.country] || booking.country;

    // Find the country in the GeoNames data
    const country = countries.find((c: any) => c.name === mappedCountryName);

    return {
      ...booking,
      flag: country ? country.flag : null, // Add the flag to the booking
    };
  });

  return bookingsWithFlags.length === 0 ? (
    <span className="ml-20 text-2xl flex flex-col mt-10">
      You do not have any bookings yet.
      <Link href="/hotels" className="underline text-accent-600">
        Check them out now!
      </Link>
    </span>
  ) : (
    <ReservationList items={bookingsWithFlags} />
  );
}
