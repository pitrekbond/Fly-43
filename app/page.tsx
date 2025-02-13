import Images from "./_components/Images";
import LastSearchedFlights from "./_components/LastSearchedFlights";
import MainButtons from "./_components/MainButtons";
import Search from "./_components/Search";

export const metadata = {
  title: "Flights",
};

export default async function Page() {
  return (
    <main className="bg-primary-900 rounded-md mx-6 py-6 h-[28rem] flex overflow-hidden relative">
      <div className="w-[72%]">
        <h1 className="text-4xl font-semibold ml-20 mt-10">
          Where would you like to go?
        </h1>
        <MainButtons to={["/", "/hotels"]} />
        <Search />
        <LastSearchedFlights />
      </div>
      <Images pic="plane" />
      <p className="absolute text-sm text-gray-400 bottom-[1rem] left-[1rem]">
        © Copyright 2025 by Piotr Tomaszek
      </p>
    </main>
  );
}
