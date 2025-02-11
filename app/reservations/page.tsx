// import Link from "next/link";
// import { auth } from "../_lib/auth";
// import { getCountries, getFlights } from "../_lib/data-service";
// import ReservationList from "../_components/ReservationList";
// import { COUNTRY_NAME_MAPPING } from "../utils";

// export const metadata = {
//   title: "Your Flights",
// };

// export default async function Page() {
//   const session = await auth();

//   if (!session?.user?.guestId)
//     throw new Error("You have to be logged in to access your flights");

//   const flights = await getFlights(session.user.guestId as string);
//   const countries = await getCountries();
//   const flightsWithFlags = flights.map((flight: any) => {
//     const fromCountryName =
//       COUNTRY_NAME_MAPPING[flight.fromCountry] || flight.fromCountry;
//     const toCountryName =
//       COUNTRY_NAME_MAPPING[flight.toCountry] || flight.toCountry;

//     const fromCountry = countries.find((c: any) => c.name === fromCountryName);
//     const toCountry = countries.find((c: any) => c.name === toCountryName);
//     return {
//       ...flight,
//       fromCountryFlag: fromCountry ? fromCountry.flag : null,
//       toCountryFlag: toCountry ? toCountry.flag : null,
//     };
//   });

//   return flightsWithFlags.length === 0 ? (
//     <span className="ml-20 text-2xl flex flex-col mt-10">
//       You have not reserved any flights yet.{" "}
//       <Link href="/" className="underline text-accent-600">
//         Check them out now!
//       </Link>
//     </span>
//   ) : (
//     <ReservationList items={flightsWithFlags} />
//   );
// }

import Link from "next/link";
import { auth } from "../_lib/auth";
import { getCountries, getFlights } from "../_lib/data-service";
import ReservationList from "../_components/ReservationList";
import { COUNTRY_NAME_MAPPING } from "../utils";
import { fetchCityImage } from "../_lib/data-service";

export const metadata = {
  title: "Your Flights",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.guestId)
    throw new Error("You have to be logged in to access your flights");

  const flights = await getFlights(session.user.guestId as string);
  const countries = await getCountries();

  // Fetch city images for each flight
  const flightsWithFlagsAndImages = await Promise.all(
    flights.map(async (flight: any) => {
      const fromCountryName =
        COUNTRY_NAME_MAPPING[flight.fromCountry] || flight.fromCountry;
      const toCountryName =
        COUNTRY_NAME_MAPPING[flight.toCountry] || flight.toCountry;

      const fromCountry = countries.find(
        (c: any) => c.name === fromCountryName
      );
      const toCountry = countries.find((c: any) => c.name === toCountryName);
      const toCityImage = await fetchCityImage(flight.to);

      return {
        ...flight,
        fromCountryFlag: fromCountry ? fromCountry.flag : null,
        toCountryFlag: toCountry ? toCountry.flag : null,
        toCityImage: toCityImage ? toCityImage.imageUrl : null,
      };
    })
  );

  return flightsWithFlagsAndImages.length === 0 ? (
    <span className="ml-20 text-2xl flex flex-col mt-10">
      You have not reserved any flights yet.{" "}
      <Link href="/" className="underline text-accent-600">
        Check them out now!
      </Link>
    </span>
  ) : (
    <ReservationList items={flightsWithFlagsAndImages} />
  );
}
