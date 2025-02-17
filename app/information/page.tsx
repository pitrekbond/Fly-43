import wing from "@/public/wing.jpg";
import islandvilla from "@/public/islandvilla.jpeg";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Information",
};

export default function Page() {
  return (
    <div className="grid max-sm:grid-cols-1 grid-cols-5 gap-x-20 max-sm:gap-y-2 gap-y-16 text-lg items-center bg-primary-900 rounded-md mx-6 py-6 mb-6 max-sm:w-[90%]">
      <div className="col-span-3 md:ml-20 max-sm:mx-6 max-sm:mt-4 mt-10 max-sm:">
        <h1 className="text-4xl mb-10 text-accent-600 font-medium">
          Welcome to Fly43
        </h1>
        <p>
          Fly43 is my learning project - a search engine app which you can use
          to find flight connections and book one of the 3 kinds of hotels
          located around the world. Its aim was to build my own flight/hotel
          search page using front-end and back-end (Next.JS) technology.
        </p>
        <p>
          The flight and hotel data used in the project is not real-world, but
          was implemented with the intention of resembling the one you can find
          in the most popular applications of these kind.
        </p>
      </div>

      <div className="max-sm:col-span-3 col-span-2 md:mr-20 max-sm:flex max-sm:justify-center transform translate-y-10 max-sm:mx-6">
        <Image
          src={wing}
          alt="Photo of a plane wing"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="relative aspect-square col-span-2 ml-20 mt-10 max-sm:hidden">
        <Image
          src={islandvilla}
          fill
          className="object-cover"
          alt="Photo of a luxury villa"
        />
      </div>

      <div className="col-span-3 md:mr-20 max-sm:mx-6 max-sm:mt-12">
        <h1 className="text-4xl mb-10 text-accent-600 font-medium">Features</h1>
        <p>
          The application was created with the purpose of being user-friendly
          and intuitive. You can find a separate part for booking flights and
          hotels, which works for cities with a population bigger than 400
          thousand.
        </p>
        <p>
          To create a reservation, you need to fill in all the required fields.
          After doing so, you can find all your reservations in &quot;My
          trips&quot; tab. This is also the place where you can also edit your
          upcoming reservations, as well as delete them if needed.
        </p>

        <div className="flex gap-4 mt-12 max-sm:order-last">
          <Link
            href="/"
            className="inline-block mt-4 bg-accent-600 text-gray-800 px-6 py-4 text-lg font-semibold hover:bg-accent-700 transition-colors"
          >
            Explore Flights
          </Link>
          <Link
            href="/hotels"
            className="inline-block mt-4 bg-accent-600 text-gray-800 px-6 py-4 text-lg font-semibold hover:bg-accent-700 transition-colors"
          >
            Explore Hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
