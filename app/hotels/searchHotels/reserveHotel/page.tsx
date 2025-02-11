import AddHotelBookingButton from "@/app/_components/AddHotelBookingButton";
import AdditionalDataHotels from "@/app/_components/AdditionalDataHotels";
import HotelDetails from "@/app/_components/HotelDetails";
import { HotelReservationProvider } from "@/app/_components/HotelReservationContext";
import PersonalDataHotels from "@/app/_components/PersonalDataHotels";
import PriceHotel from "@/app/_components/PriceHotel";
import SelectCountry from "@/app/_components/SelectCountry";
import { createBooking } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { BASIC_ADULT_HOTEL_PRICE, BASIC_CHILD_HOTEL_PRICE } from "@/app/utils";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Finish booking",
};

type PageProps = {
  searchParams: Record<string, string>; // Define searchParams as a Record with string keys and values
};

export default async function Page({ searchParams }: PageProps) {
  if (!searchParams.city || !searchParams.startDate || !searchParams.endDate) {
    notFound();
  }

  const { city, country, startDate, endDate, hotel } = searchParams;
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Session or user email is missing");
  }
  const guest = await getGuest(session.user.email);

  const rooms = Number(searchParams.rooms);
  const adults = Number(searchParams.adults);
  const kids = Number(searchParams.kids);
  const numberOfGuests = adults + kids;

  const [dayS, monthS, yearS] = startDate.split(".");
  const dateS = new Date(`${yearS}-${monthS}-${dayS}`);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedStartDate = dateS.toLocaleDateString("en-US", options);
  const [dayE, monthE, yearE] = endDate.split(".");
  const dateE = new Date(`${yearE}-${monthE}-${dayE}`);
  const formattedDateE = dateE.toLocaleDateString("en-US", options);

  const timeDifference = dateE.getTime() - dateS.getTime();
  const numNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const pricePerNight =
    adults *
      BASIC_ADULT_HOTEL_PRICE *
      rooms *
      (hotel === "Budget" ? 1 : hotel === "Comfort" ? 2 : 3) +
    kids *
      BASIC_CHILD_HOTEL_PRICE *
      rooms *
      (hotel === "Budget" ? 1 : hotel === "Comfort" ? 1.5 : 2);

  const totalPrice = pricePerNight * numNights;

  const bookingData = {
    city,
    country,
    startDate,
    endDate,
    adults,
    kids,
    rooms,
    hotel,
    numNights,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <main className="mx-[200px] py-6 mb-10 h-[55rem] flex items-center flex-col">
      <h1 className="text-4xl font-semibold">Finish your hotel reservation</h1>
      <HotelReservationProvider>
        <form action={createBookingWithData} className="flex mt-10 w-full">
          <div className="w-[30%] flex flex-col items-center gap-2">
            <HotelDetails
              hotel={hotel}
              city={city}
              country={country}
              rooms={rooms}
              adults={adults}
              kids={kids}
              numberOfGuests={numberOfGuests}
              formattedStartDate={formattedStartDate}
              formattedDateE={formattedDateE}
              numNights={numNights}
            />
            <PriceHotel
              totalPrice={totalPrice}
              numNights={numNights}
              numberOfGuests={numberOfGuests}
            />
          </div>
          <div className="w-[70%] flex flex-col items-end gap-2">
            <PersonalDataHotels
              guest={guest}
              fieldNames={["fullName", "dob", "nationalID", "phoneNumber"]}
            >
              <SelectCountry
                name="nationality"
                id="nationality"
                defaultCountry={guest.nationality as string}
                className="w-[330px] border border-black bg-primary-50 focus:border-transparent"
              />
            </PersonalDataHotels>
            <AdditionalDataHotels hotel={hotel} />
            <AddHotelBookingButton />
          </div>
        </form>
      </HotelReservationProvider>
    </main>
  );
}
