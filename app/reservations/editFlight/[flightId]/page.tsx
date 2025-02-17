import EditFlightForm from "@/app/_components/EditFlightForm";
import { getFlight } from "@/app/_lib/data-service";
import { format } from "date-fns";

type PageProps = {
  params: Record<string, string>;
};

export async function generateMetadata({ params }: PageProps) {
  return { title: `Flight #${params.flightId}` };
}

export default async function Page({ params }: PageProps) {
  const { flightId } = params;
  const flight = await getFlight(flightId);

  return (
    <div className="lg:ml-20 max-lg:flex max-lg:flex-col max-lg:items-center">
      <h2 className="font-semibold text-2xl text-accent-600 mb-2 max-lg:text-center">
        Edit Flight #{flightId} {flight.from} - {flight.to}
      </h2>
      <div className="mb-4 flex flex-wrap gap-3 max-w-[830px] max-lg:justify-center">
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {format(flight.departure, "EEE, MMM dd yyyy")}
          {flight.returnF && ` - ${format(flight.returnF, "EEE, MMM dd yyyy")}`}
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {flight.adultTicket + flight.childTicket} Passenger
          {flight.adultTicket + flight.childTicket > 1 && "s"}
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {flight.cabinClass} class
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {flight.luggage} Luggage
        </span>
        <span className="bg-primary-950 rounded-md px-2 py-1">
          {flight.legRoom} Legroom
        </span>
        {flight.priorityBoarding && (
          <span className="bg-primary-950 rounded-md px-2 py-1">
            Priority Boarding
          </span>
        )}
        {flight.isDisabled && (
          <span className="bg-primary-950 rounded-md px-2 py-1">
            Disabled person
          </span>
        )}
        {flight.isAnimal && (
          <span className="bg-primary-950 rounded-md px-2 py-1">
            Travelling with animals
          </span>
        )}
      </div>
      <EditFlightForm flight={flight} />
    </div>
  );
}
