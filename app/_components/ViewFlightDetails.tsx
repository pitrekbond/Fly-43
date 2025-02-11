import { format } from "date-fns";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useCurrency } from "./CurrencyContext";

type ViewFlightDetailsProps = {
  flight: Record<string, any>;
  onClose: () => void;
};

export default function ViewFlightDetails({
  flight,
  onClose,
}: ViewFlightDetailsProps) {
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
        className="text-gray-700 border-1 border-gray-600 bg-white shadow-lg rounded-md text-lg py-6 px-8 w-[60%] max-w-2xl flex flex-col space-y-4"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-accent-600 mb-4">
          Flight #{flight.id} {flight.from} - {flight.to}
        </h2>

        {/* Flight Details */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Departure:</span>{" "}
            {format(new Date(flight.departure), "EEE, MMM dd yyyy")}
          </p>
          {flight.isReturn && (
            <p>
              <span style={{ fontWeight: 500 }}>Return:</span>{" "}
              {format(new Date(flight.returnF), "EEE, MMM dd yyyy")}
            </p>
          )}
        </div>

        {/* Booked On */}
        <div className="flex flex-col space-y-4 border-b border-gray-200  pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Booked On:</span>{" "}
            {format(new Date(flight.created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>

        {/* Passengers and Cabin Class */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Passengers:</span>{" "}
            {flight.adultTicket} adult
            {flight.adultTicket > 1 && "s"}{" "}
            {flight.childTicket > 0 &&
              `, ${flight.childTicket} child${
                flight.childTicket > 1 ? "ren" : ""
              }`}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}>Cabin Class:</span>{" "}
            {flight.cabinClass}
          </p>
        </div>

        {/* Luggage and Leg Room */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Luggage:</span> {flight.luggage}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}>Leg Room:</span> {flight.legRoom}
          </p>
        </div>

        {/* Additional Options */}
        {flight.priorityBoarding ||
          flight.isDisabled ||
          (flight.isAnimal && (
            <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
              {flight.priorityBoarding && (
                <p>
                  <span style={{ fontWeight: 500 }}>Priority Boarding:</span>{" "}
                  Yes
                </p>
              )}
              {flight.isDisabled && (
                <p>
                  <span style={{ fontWeight: 500 }}>Disabled Person:</span> Yes
                </p>
              )}
              {flight.isAnimal && (
                <p>
                  <span style={{ fontWeight: 500 }}>
                    Travelling with Animals:
                  </span>{" "}
                  Yes
                </p>
              )}
            </div>
          ))}

        {/* Price */}
        <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
          <p>
            <span style={{ fontWeight: 500 }}>Price:</span> {currency}
            {currency === "$" ? (flight.price * 1.05).toFixed(0) : flight.price}
          </p>
        </div>

        {/* Additional Requests */}
        <div className="flex flex-col space-y-4">
          <p>
            <span style={{ fontWeight: 500 }}>Additional Requests:</span>{" "}
            {flight.other || "None"}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
