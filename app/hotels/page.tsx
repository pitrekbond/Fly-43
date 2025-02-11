import HotelSearch from "../_components/HotelSearch";
import Images from "../_components/Images";
import LastSearchedHotels from "../_components/LastSearchedHotels";
import MainButtons from "../_components/MainButtons";

export const metadata = {
  title: "Hotels",
};

export default function Page() {
  return (
    <main className="bg-primary-900 rounded-md mx-6 py-6 h-[28rem] flex">
      <div className="w-[72%]">
        <h1 className="text-4xl font-semibold ml-20 mt-10">
          Where would you like to stay?
        </h1>
        <MainButtons to={["/", "/hotels"]} />
        <div className="flex flex-col ml-20">
          <HotelSearch />
        </div>
        <LastSearchedHotels />
      </div>
      <Images pic="hotel" />
    </main>
  );
}
