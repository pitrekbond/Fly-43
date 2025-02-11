import { fetchCityImage } from "../_lib/data-service";
import { unstable_cache } from "next/cache";

type CityImgProps = {
  to: string;
  className: string;
  isSearch?: string;
};

// Cache the fetchCityImage function using React's cache utility
const getCityImage = unstable_cache(
  async (city: string) => {
    const imageUrl = await fetchCityImage(city);
    return imageUrl;
  },
  ["city-image"], // cache key
  {
    revalidate: false, // Never revalidate during the session
    tags: ["city-image"],
  }
);

export default async function CityImg({
  to,
  className,
  isSearch,
}: CityImgProps) {
  const imageData = await getCityImage(to);
  if (!imageData) return null;

  const { imageUrl, photographerName, photographerProfileUrl } = imageData;

  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt={`Image of ${to}`}
        className="w-full h-full object-cover"
        loading="eager"
      />
      {isSearch && (
        <div className="absolute bottom-[12.5rem] right-[12.5rem] text-primary-50 text-xs p-1 rounded">
          Photo by{" "}
          <a
            href={`${photographerProfileUrl}?utm_source=Fly43&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {photographerName}
          </a>{" "}
          on{" "}
          <a
            href={`https://unsplash.com/?utm_source=Fly43&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </div>
      )}
    </div>
  );
}
