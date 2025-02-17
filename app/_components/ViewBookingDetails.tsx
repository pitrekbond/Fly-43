import { format } from "date-fns";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useCurrency } from "./CurrencyContext";

type ViewBookingDetailsProps = {
  booking: Record<string, any>;
  onClose: () => void;
};

export default function ViewBookingDetails({
  booking,
  onClose,
}: ViewBookingDetailsProps) {
  //use ref to add animation to the div when it mounts, because we dont want any additional re-renders with useState. We can do it with useState as well though
  const modalRef = useRef<HTMLDivElement>(null);
  const { currency } = useCurrency();

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.add("modal-content");
    }
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 modal-overlay"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="text-gray-700 border-1 border-gray-600 bg-white shadow-lg rounded-md lg:text-lg py-6 px-8 w-[60%] max-sm:w-[80%] max-w-2xl flex flex-col space-y-4"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-accent-600 mb-4">
          Booking #{booking.id} {booking.city}
        </h2>

        {/* Booking Details */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Start Date:</span>{" "}
            {format(new Date(booking.startDate), "EEE, MMM dd yyyy")}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}>End Date:</span>{" "}
            {format(new Date(booking.endDate), "EEE, MMM dd yyyy")}
          </p>
        </div>

        {/* Booked On */}
        <div className="flex flex-col space-y-4 border-b border-gray-200  pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Booked On:</span>{" "}
            {format(new Date(booking.created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>

        {/* Guests and Hotel */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Guests:</span> {booking.adults}{" "}
            Adult
            {booking.adults > 1 && "s"}
            {booking.kids > 0 &&
              `, ${booking.kids} Child${booking.kids > 1 ? "ren" : ""}`}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}>Rooms:</span> {booking.rooms} Room
            {booking.rooms > 1 && "s"}{" "}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}>Hotel:</span> {booking.hotel}
          </p>
        </div>

        {/* Bedtype */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Beds:</span>{" "}
            {booking.bedType.charAt(0).toUpperCase() + booking.bedType.slice(1)}
          </p>
        </div>

        {/* Additional Options */}
        {booking.hasBreakfast ||
          (booking.hasTransfer && (
            <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
              {booking.hasBreakfast && (
                <p>
                  <span style={{ fontWeight: 500 }}>Breakfast:</span> Yes
                </p>
              )}
              {booking.hasTransfer && (
                <p>
                  <span style={{ fontWeight: 500 }}>Airport Transfer:</span> Yes
                </p>
              )}
            </div>
          ))}

        {/* Price */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Price:</span> {currency}
            {currency === "$"
              ? (booking.price * 1.05).toFixed(0)
              : booking.price}
          </p>
        </div>

        {/* Additional Requests */}
        <div className="flex flex-col space-y-4">
          <p>
            <span style={{ fontWeight: 500 }}>Additional Requests:</span>{" "}
            {booking.specialRequests || "None"}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
