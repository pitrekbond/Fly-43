import { LiaExchangeAltSolid } from "react-icons/lia";
import { City } from "./FlightSearch";

type ExchangeButtonProps = {
  from: string;
  to: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  setLastSelectedFrom: (city: City | null) => void;
  setLastSelectedTo: (city: City | null) => void;
  lastSelectedFrom: City | null;
  lastSelectedTo: City | null;
};

export default function ExchangeButton({
  from,
  to,
  setFrom,
  setTo,
  lastSelectedFrom,
  lastSelectedTo,
  setLastSelectedFrom,
  setLastSelectedTo,
}: ExchangeButtonProps) {
  function handleExchange() {
    if (!lastSelectedFrom || !lastSelectedTo) {
      return; // Prevent swapping if either city is invalid
    }

    setFrom(to);
    setTo(from);
    setLastSelectedFrom(lastSelectedTo), setLastSelectedTo(lastSelectedFrom);
  }
  return (
    <button
      className="hover:bg-primary-400 transition-colors rounded-md self-center p-2"
      onClick={handleExchange}
    >
      <LiaExchangeAltSolid className="h-5 w-5" />
    </button>
  );
}
