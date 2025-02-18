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
      <div className="flex max-lg:flex-col max-lg:items-center max-lg:gap-[12px] gap-[6px] mt-4 lg:h-[48px]">
        <CitySearch
          cityInput={from}
          setCityInput={setFrom}
          setLastSelectedCity={setLastSelectedFrom}
          className="top-[300px] left-[80px] max-sm:top-[250px] max-sm:left-[17px] max-lg:top-[260px] max-lg:left-[153px]"
          className2="lg:rounded-l-md max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
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
          className="top-[300px] left-[298px] max-sm:left-[17px] max-sm:top-[346px] max-lg:top-[354px] max-lg:left-[153px] "
          className2="max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
        />
        <MainSearchButton
          className="lg:w-[120px] max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
          onClick={() => setIsOpenDateSelector(true)}
        >
          {departureDate ? departureDate : "Departure"}
        </MainSearchButton>
        {isReturn && (
          <MainSearchButton
            className="lg:w-[120px] max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px]"
            onClick={() => setIsOpenDateSelector(true)}
          >
            {returnDate ? returnDate : "Return"}
          </MainSearchButton>
        )}
        <MainSearchButton
          className="lg:w-[170px]  max-sm:w-[90%] max-lg:w-[60%] max-lg:rounded-md max-lg:h-[36px] rounded-r-md"
          onClick={() => setIsOpenGuestSelector(true)}
        >
          {`${numberOfTickets} Traveler${
            numberOfTickets > 1 ? "s" : ""
          }, ${cabinClass}`}
        </MainSearchButton>
        <button
          className="md:ml-3 max-lg:my-4 bg-accent-600 hover:bg-accent-700 rounded-md p-2 transition-colors font-semibold disabled:cursor-not-allowed w-[110px]"
          onClick={handleSearch}
          disabled={isPending}
        >
          {isPending ? <SpinnerMini /> : "Search"}
        </button>
      </div>
      {error && (
        <p className="text-red-500 lg:mt-2 max-lg:text-center">{error}</p>
      )}
      {isOpenDateSelector && (
        <DateSelector
          onClose={() => setIsOpenDateSelector(false)}
          setRange={setRange}
          range={range}
          isReturn={isReturn}
          singleDate={singleDate}
          setSingleDate={setSingleDate}
          className="max-sm:bottom-[7rem] max-sm:left-[1.2rem] bottom-[0.5rem] left-[16rem] 2xl:bottom-[8rem] 2xl:left-[15rem] max-lg:bottom-[3rem] max-lg:left-[0.8rem]"
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
          className="bottom-[7.5rem] left-[42rem] 2xl:bottom-[15rem] 2xl:left-[42rem] max-sm:bottom-[19.5rem] max-sm:left-[2.2rem] max-lg:bottom-[17rem] max-lg:left-[15.6rem]"
        />
      )}
    </>
  );
}
