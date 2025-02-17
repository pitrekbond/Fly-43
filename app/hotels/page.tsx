import HotelSearch from "../_components/HotelSearch";
import Images from "../_components/Images";
import LastSearchedHotels from "../_components/LastSearchedHotels";
import MainButtons from "../_components/MainButtons";

export const metadata = {
  title: "Hotels",
};

export default function Page() {
  return (
    <>
      <main className="bg-primary-900 rounded-md mx-6 py-6 lg:h-[28rem] flex flex-col lg:flex-row overflow-hidden relative">
        <div className="lg:w-[72%]">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold max-lg:text-center lg:ml-20 mt-4 lg:mt-10">
            Where would you like to stay?
          </h1>
          <MainButtons to={["/", "/hotels"]} />
          <div className="flex flex-col max-lg:justify-center lg:ml-20">
            <HotelSearch />
          </div>
        </div>
        <Images pic="hotel" />
        <p className="absolute max-sm:text-xs text-sm text-gray-400 max-sm:bottom-[0.2rem] bottom-[1rem] left-[1rem]">
          © Copyright 2025 by Piotr Tomaszek
        </p>
      </main>
      <LastSearchedHotels />
    </>
  );
}
