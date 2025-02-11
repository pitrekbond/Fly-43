import EditBookingForm from "@/app/_components/EditBookingForm";
import { getBooking } from "@/app/_lib/data-service";
import { format } from "date-fns";

type PageProps = {
  params: Record<string, string>;
};

export async function generateMetadata({ params }: PageProps) {
  return { title: `Booking #${params.bookingId}` };
}

export default async function page({ params }: PageProps) {
  const { bookingId } = params;
  const booking = await getBooking(bookingId);

  return (
    <div className="ml-20">
      <h2 className="font-semibold text-2xl text-accent-600 mb-2">
        Edit Booking#{bookingId} - {booking.numNights} night
        {booking.numNights > 1 && "s"} in {booking.city}
      </h2>
      <div className="mb-4 flex flex-wrap gap-3 max-w-[830px]">
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {format(booking.startDate, "EEE, MMM dd yyyy")} -
          {format(booking.endDate, "EEE, MMM dd yyyy")}
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {booking.adults + booking.kids} Guest
          {booking.adults + booking.kids > 1 && "s"}
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {booking.rooms} Room
          {booking.rooms > 1 && "s"}
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {booking.hotel} hotel
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {booking.bedType.charAt(0).toUpperCase() + booking.bedType.slice(1)}{" "}
          bed
        </span>
      </div>
      <EditBookingForm booking={booking} />
    </div>
  );
}
