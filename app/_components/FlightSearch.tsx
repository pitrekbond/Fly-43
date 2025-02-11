import { useEffect, useState, useTransition } from "react";
import ExchangeButton from "./ExchangeButton";
import DateSelector from "./DateSelector";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import MainSearchButton from "./MainSearchButton";
import CitySearch from "./CitySearch";
import SpinnerMini from "./SpinnerMini";
import PassengerSelector from "./PassengerSelector";

export type City = {
  id: string;
  name: string;
  region: string;
  country: string;
  population: number;
};

type SearchHistoryItem = {
  from: string;
  to: string;
  fromCountry: string;
  toCountry: string;
  departureDate: string;
  returnDate?: string;
  isReturn: boolean;
  adultTicket: number;
  childTicket: number;
  cabinClass: string;
  searchTimestamp: number;
};

type FlightSearchProps = {
  isReturn: boolean;
};

export default function FlightSearch({ isReturn }: FlightSearchProps) {
  const [isOpenDateSelector, setIsOpenDateSelector] = useState(false);
  const [isOpenGuestSelector, setIsOpenGuestSelector] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [lastSelectedFrom, setLastSelectedFrom] = useState<City | null>(null);
  const [lastSelectedTo, setLastSelectedTo] = useState<City | null>(null);

  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [singleDate, setSingleDate] = useState<Date | undefined>(undefined);
  const [adultTicket, setAdultTicket] = useState(1);
  const [childTicket, setChildTicket] = useState(0);
  const [cabinClass, setCabinClass] = useState("Economy");
  const [error, setError] = useState("");

  const numberOfTickets = adultTicket + childTicket;
  const departureDate = isReturn
    ? range?.from?.toLocaleDateString()
    : singleDate?.toLocaleDateString();
  const returnDate = isReturn ? range?.to?.toLocaleDateString() : undefined;

  //SAVING LAST SEARCHES
  function saveSearchHistory() {
    if (!lastSelectedFrom || !lastSelectedTo) return;

    const searchItem: SearchHistoryItem = {
      from: lastSelectedFrom.name,
      to: lastSelectedTo.name,
      fromCountry: lastSelectedFrom.country,
      toCountry: lastSelectedTo.country,
      departureDate: departureDate as string,
      returnDate: isReturn ? returnDate : undefined,
      isReturn,
      adultTicket,
      childTicket,
      cabinClass,
      searchTimestamp: Date.now(),
    };

    // Retrieve existing history
    const savedHistory = localStorage.getItem("flightSearchHistory");
    let searchHistory: SearchHistoryItem[] = savedHistory
      ? JSON.parse(savedHistory)
      : [];

    // Check for duplicate searches
    const isDuplicate = searchHistory.some(
      (item) =>
        item.from === searchItem.from &&
        item.to === searchItem.to &&
        item.departureDate === searchItem.departureDate
    );

    // Only add if not a duplicate
    if (!isDuplicate) {
      searchHistory.unshift(searchItem);
      searchHistory = searchHistory.slice(0, 3); // Keep only the last 5 unique searches

      localStorage.setItem(
        "flightSearchHistory",
        JSON.stringify(searchHistory)
      );
    }
  }

  //END

  function handleSearch() {
    setError("");

    if (
      !from ||
      !to ||
      !departureDate ||
      !lastSelectedFrom ||
      !lastSelectedTo
    ) {
      setError(
        !lastSelectedFrom || !lastSelectedTo
          ? "Please select a valid city"
          : "Please fill in all required fields (City and Dates)"
      );
      return;
    }
    if (from === to) {
      setError("Origin and destination cannot be the same");
      return;
    }

    saveSearchHistory();

    const params = new URLSearchParams({
      from: lastSelectedFrom.name,
      fromCountry: lastSelectedFrom.country,
      to: lastSelectedTo.name,
      toCountry: lastSelectedTo.country,
      departureDate: departureDate as string,
      isReturn: isReturn.toString(),
      adultTicket: adultTicket.toString(),
      childTicket: childTicket.toString(),
      cabinClass,
      ...(returnDate && { returnDate }), // Conditionally add returnDate if it's not undefined
    });

    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  }

  return (
    <>
      <div className="flex gap-[6px] mt-4 h-[48px]">
        <CitySearch
          cityInput={from}
          setCityInput={setFrom}
          setLastSelectedCity={setLastSelectedFrom}
          className="top-[386px] left-[105px]"
          className2="rounded-l-md"
        />
        <ExchangeButton
          from={from}
          to={to}
          setFrom={setFrom}
          setTo={setTo}
          lastSelectedFrom={lastSelectedFrom}
          lastSelectedTo={lastSelectedTo}
          setLastSelectedFrom={setLastSelectedFrom}
          setLastSelectedTo={setLastSelectedTo}
        />
        <CitySearch
          cityInput={to}
          setCityInput={setTo}
          setLastSelectedCity={setLastSelectedTo}
          className="top-[386px] left-[323px]"
        />
        <MainSearchButton
          className="w-[120px]"
          onClick={() => setIsOpenDateSelector(true)}
        >
          {departureDate ? departureDate : "Departure"}
        </MainSearchButton>
        {isReturn && (
          <MainSearchButton
            className="w-[120px]"
            onClick={() => setIsOpenDateSelector(true)}
          >
            {returnDate ? returnDate : "Return"}
          </MainSearchButton>
        )}
        <MainSearchButton
          className="w-[170px] rounded-r-md"
          onClick={() => setIsOpenGuestSelector(true)}
        >
          {`${numberOfTickets} Traveler${
            numberOfTickets > 1 ? "s" : ""
          }, ${cabinClass}`}
        </MainSearchButton>
        <button
          className="ml-3 bg-accent-600 hover:bg-accent-700 rounded-md p-2 transition-colors font-semibold disabled:cursor-not-allowed w-[110px]"
          onClick={handleSearch}
          disabled={isPending}
        >
          {isPending ? <SpinnerMini /> : "Search"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isOpenDateSelector && (
        <DateSelector
          onClose={() => setIsOpenDateSelector(false)}
          setRange={setRange}
          range={range}
          isReturn={isReturn}
          singleDate={singleDate}
          setSingleDate={setSingleDate}
          className="bottom-[0.5rem] left-[16rem]"
        />
      )}
      {isOpenGuestSelector && (
        <PassengerSelector
          onClose={() => setIsOpenGuestSelector(false)}
          adultTicket={adultTicket}
          setAdultTicket={setAdultTicket}
          childTicket={childTicket}
          setChildTicket={setChildTicket}
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
          className="bottom-[7.5rem] left-[42rem]"
        />
      )}
    </>
  );
}
