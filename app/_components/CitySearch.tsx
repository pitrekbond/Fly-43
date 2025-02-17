import { useEffect, useRef, useState } from "react";
import { City } from "./HotelSearch";
import axios from "axios";

type CitySearchProps = {
  cityInput: string;
  setCityInput: (value: string) => void;
  setLastSelectedCity: (city: City | null) => void;
  className: string;
  className2?: string;
};

export default function CitySearch({
  cityInput,
  setCityInput,
  setLastSelectedCity,
  className,
  className2,
}: CitySearchProps) {
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);

  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cityInput.trim().length > 2) {
      const fetchCities = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
            {
              params: { namePrefix: cityInput, minPopulation: 400000 },
              headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
              },
            }
          );

          //make sure on the client side that we get only cities >400 000 pop
          const cities = response.data.data.filter(
            (city: City) => city.population > 400000
          );

          // Enhanced deduplication logic
          const uniqueCitiesMap = new Map<string, City>();

          cities.forEach((city: City) => {
            // More aggressive normalization
            const normalizedName = city.name
              .toLowerCase()
              .replace(
                /\b(greater|city|metropolitan|province|region|county|area|district)\b/gi,
                ""
              )
              .replace(/\s+/g, " ")
              .trim();

            const key = `${normalizedName}-${city.country.toLowerCase()}`;

            if (!uniqueCitiesMap.has(key)) {
              uniqueCitiesMap.set(key, {
                ...city,
                name: city.name
                  .replace(
                    /\b(Greater|City|Metropolitan|Province|Region|County|Area|District)\b/g,
                    ""
                  )
                  .trim(),
              });
            } else {
              const existingCity = uniqueCitiesMap.get(key)!;
              // Keep the city with the shorter, simpler name
              if (city.name.length < existingCity.name.length) {
                uniqueCitiesMap.set(key, {
                  ...city,
                  name: city.name
                    .replace(
                      /\b(Greater|City|Metropolitan|Province|Region|County|Area|District)\b/g,
                      ""
                    )
                    .trim(),
                });
              }
            }
          });

          const uniqueCities = Array.from(uniqueCitiesMap.values()).sort(
            (a, b) => b.population - a.population
          );

          setSuggestions(uniqueCities);
          setIsOpenSuggestions(true);
        } catch (error) {
          console.error("Error fetching cities:", error);
        } finally {
          setIsLoading(false);
        }
      };

      //A debounce mechanism delays the API call by 300ms to prevent firing too many requests as the user types. If the user types again within 300ms, the previous setTimeout is cleared.
      const debounceFetch = setTimeout(fetchCities, 300);
      return () => clearTimeout(debounceFetch);
    } else {
      setSuggestions([]);
      setIsOpenSuggestions(false);
    }
  }, [cityInput]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpenSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSuggestionClick = (city: City) => {
    setCityInput(`${city.name}, ${city.country}`);
    setLastSelectedCity(city);
    setSuggestions([]);
    setIsOpenSuggestions(false);
  };

  return (
    <>
      <input
        placeholder="Select a city"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        className={`text-gray-900 focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 ${className2} pl-2 outline-offset-[-1px] w-[170px] hover:bg-purple-100 transition-colors`}
      />
      {isOpenSuggestions && (
        <div
          ref={suggestionsRef}
          className={`absolute ${className} w-[170px] bg-primary-50 shadow-md z-50 max-h-[140px] overflow-y-auto`}
        >
          {isLoading ? (
            <p className="p-2 text-sm text-gray-500">Loading...</p>
          ) : (
            suggestions.map((city) => (
              <div
                key={city.id}
                className="p-2 text-sm hover:bg-accent-500 text-gray-900 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(city)}
              >
                {city.name}, {city.region}, {city.country}
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
