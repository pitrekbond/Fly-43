import { notFound } from "next/navigation";
import ResultBar from "../_components/ResultBar";
import { IoIosAirplane } from "react-icons/io";
import CityImg from "../_components/CityImg";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import PriceFlight from "../_components/PriceFlight";

export const metadata = {
  title: "Search Flight",
};

type PageProps = {
  searchParams: Record<string, string>; // Define searchParams as a Record with string keys and values
};

export default async function Page({ searchParams }: PageProps) {
  if (!searchParams.from || !searchParams.to || !searchParams.departureDate) {
    notFound();
  }

  const flightAdultPrice =
    Math.floor((Math.random() * (500 - 100 + 1)) / 10) * 10 + 100;
  const flightChildPrice =
    Math.floor(
      (Math.random() * Math.min(300, flightAdultPrice - 100 + 1)) / 10
    ) *
      10 +
    100;

  const from = searchParams.from;
  const to = searchParams.to;
  const fromCountry = searchParams.fromCountry;
  const toCountry = searchParams.toCountry;

  const departureDate = searchParams.departureDate;
  const isReturn = searchParams.isReturn === "true";
  const adultTicket = Number(searchParams.adultTicket);
  const childTicket = Number(searchParams.childTicket);
  const cabinClass = searchParams.cabinClass;
  const returnDate = searchParams.returnDate;

  let adultPrice;
  if (cabinClass === "Business") adultPrice = 2 * flightAdultPrice;
  else adultPrice = flightAdultPrice;

  let childPrice;
  if (cabinClass === "Business") childPrice = 2 * flightChildPrice;
  else childPrice = flightChildPrice;

  const totalPrice = adultPrice * adultTicket + childPrice * childTicket;

  return (
    <main className="bg-primary-900 rounded-md mx-6 py-6 lg:h-[36rem] flex max-lg:flex-col max-lg:items-center">
      <div className="lg:w-[65%] max-lg:w-full max-lg:flex max-lg:flex-col max-lg:items-center">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold lg:ml-20 lg:mt-10 max-lg:text-center">
          Your {isReturn ? "round trip" : "one way"} flight from {from} to {to}
        </h1>
        <ResultBar
          adultTicket={adultTicket}
          childTicket={childTicket}
          cabinClass={cabinClass}
          departureDate={departureDate}
          returnDate={returnDate}
        />
        <div className="lg:ml-20 mt-8 bg-primary-50 text-gray-700 rounded-md lg:w-1/2 max-lg:w-[90%] h-[10rem] flex max-sm:flex-col gap-4">
          <div className="w-2/3 py-4 pl-4">
            <p className="font-semibold">Outbound</p>
            <div
              className={`flex items-center ml-[3rem] ${!isReturn && "mt-6"}`}
            >
              <span className="mr-2">{departureDate}</span>
              <span className="mr-2">{from.slice(0, 3).toUpperCase()}</span>
              <div className="flex-1 border-t border-gray-300"></div>
              <IoIosAirplane className="h-4 w-4 ml-1" />
              <span className="ml-2">{to.slice(0, 3).toUpperCase()}</span>
            </div>
            {isReturn && (
              <div className="mt-4">
                <p className="font-semibold">Return</p>
                <div className="flex items-center ml-[3rem]">
                  <span className="mr-2">{returnDate}</span>
                  <span className="mr-2">{to.slice(0, 3).toUpperCase()}</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                  <IoIosAirplane className="h-4 w-4 ml-1" />
                  <span className="ml-2">{from.slice(0, 3).toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>
          <PriceFlight
            from={from}
            to={to}
            departureDate={departureDate}
            isReturn={isReturn}
            adultTicket={adultTicket}
            childTicket={childTicket}
            cabinClass={cabinClass}
            totalPrice={totalPrice}
            returnDate={returnDate}
            fromCountry={fromCountry}
            toCountry={toCountry}
          />
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        <CityImg
          to={to}
          className="lg:w-[35%] max-sm:mt-[7rem] max-lg:w-[90%] flex justify-center lg:ml-30 lg:mr-16 my-10 relative flex-col items-center"
          isSearch="true"
        />
      </Suspense>
    </main>
  );
}
