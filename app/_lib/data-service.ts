import { supabase } from "./supabase";
import axios from "axios";

export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}

export async function createGuest(newGuest: {}) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error);
    throw new Error("Settings could not be retrieved");
  }

  return data;
}

const USERNAME = "pitrekbond";
export async function getCountries() {
  try {
    const res = await fetch(
      `http://api.geonames.org/countryInfoJSON?username=${USERNAME}`
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch countries: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    return data.geonames.map((country: any) => ({
      name: country.countryName,
      flag: `http://www.geonames.org/flags/x/${country.countryCode.toLowerCase()}.gif`,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return []; // Fallback empty array
  }
}

export async function fetchCityImage(city: string) {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${city}+skyline&client_id=${unsplashAccessKey}`
    );
    const imageUrl = response.data.urls?.regular; // Image URL
    const photographerName = response.data.user?.name; // Photographer's name
    const photographerProfileUrl = response.data.user?.links?.html; // Photographer's Unsplash profile link

    return {
      imageUrl,
      photographerName,
      photographerProfileUrl,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export async function getFlights(guestId: string) {
  const { data, error } = await supabase
    .from("flightReservations")
    .select("*")
    .eq("guestId", guestId)
    .order("departure");

  if (error) {
    console.error(error);
    throw new Error("Flights could not get loaded");
  }

  return data;
}

export async function getFlight(id: string) {
  const { data, error } = await supabase
    .from("flightReservations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Flight could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: string) {
  const { data, error } = await supabase
    .from("hotelBookings")
    .select("*")
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from("hotelBookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}
