"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { parseAndFormatDate } from "../utils";

export async function signInAction() {
  await signIn("google", { redirectTo: "/information" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const dateOfBirthValue = (formData.get("dateOfBirth") as string).replace(
    /\//g,
    "."
  );
  const formattedDateOfBirth = parseAndFormatDate(dateOfBirthValue as string);

  const nationalityField = formData.get("nationality");
  // Ensure that it's a string, and not a File or null
  if (typeof nationalityField !== "string") {
    throw new Error("Invalid nationality data");
  }

  const [nationality, countryFlag] = nationalityField.split("%");

  //We need to cast nationalID as string in this test because formData.get could return null and TS doesnt automatically assume its a string
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
    dateOfBirth: formattedDateOfBirth,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account");

  redirect("/account");
}

export async function createFlightReservation(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const dobValue = (formData.get("dob") as string).replace(/\//g, ".");
  const dob = parseAndFormatDate(dobValue as string);
  const departureValue = formData.get("departure") as string;
  const departure = parseAndFormatDate(departureValue as string);
  const returnValue = formData.get("return") as string;
  const returnF =
    returnValue === "" ? null : parseAndFormatDate(returnValue as string);

  const from = formData.get("from");
  const to = formData.get("to");
  const fromCountry = formData.get("fromCountry");
  const toCountry = formData.get("toCountry");
  const isReturn = !!returnF;
  const adultTicket = Number(formData.get("adultTicket"));
  const childTicket = Number(formData.get("childTicket"));
  const cabinClass = formData.get("cabinClass");
  const fullName = formData.get("fullName");
  const luggage = formData.get("luggage");
  const priorityBoarding = formData.get("priorityBoarding") === "true";
  const legRoom = formData.get("legRoom");
  const seatAllocation = formData.get("seatAllocation");
  const isDisabled = formData.get("isDisabled") === "true";
  const isAnimal = formData.get("isAnimal") === "true";
  const other = formData.get("other");

  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID");

  const nationalityField = formData.get("nationality");
  // Ensure that it's a string, and not a File or null
  if (typeof nationalityField !== "string") {
    throw new Error("Invalid nationality data");
  }
  const nationality = nationalityField.split("%")[0];

  const extraLuggageCost =
    luggage === "Expanded" ? (adultTicket + childTicket) * 30 : 0;
  const extraLegRoomCost =
    legRoom === "Expanded" ? (adultTicket + childTicket) * 20 : 0;
  const priorityBoardingCost = priorityBoarding
    ? (adultTicket + childTicket) * 15
    : 0;
  const seatAllocationCost =
    seatAllocation === "Together" ? (adultTicket + childTicket) * 15 : 0;
  const price =
    Number(formData.get("totalPrice")) +
    extraLegRoomCost +
    extraLuggageCost +
    priorityBoardingCost +
    seatAllocationCost;

  const newFlight = {
    guestId: session.user.guestId,
    from,
    fromCountry,
    to,
    toCountry,
    departure,
    returnF,
    isReturn,
    adultTicket,
    childTicket,
    cabinClass,
    price,
    fullName,
    dob,
    nationalID,
    nationality,
    luggage,
    legRoom,
    priorityBoarding,
    seatAllocation,
    isDisabled,
    isAnimal,
    other,
  };

  const { error } = await supabase
    .from("flightReservations")
    .insert([newFlight])
    .select()
    .single();

  if (error) throw new Error("Flight reservation couldn't be created");

  //change it for reservations path later
  revalidatePath("/search");

  redirect(`/thankyou?city=${encodeURIComponent(to as string)}&res=flight`);
}

export async function createBooking(
  bookingData: {
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    hotel: string;
    adults: number;
    kids: number;
    rooms: number;
    numNights: number;
  },
  formData: FormData
) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const {
    city,
    country,
    startDate: stringStartDate,
    endDate: stringEndDate,
    hotel,
    adults,
    kids,
    rooms,
    numNights,
  } = bookingData;

  //DATA FROM bookingData
  const startDate = parseAndFormatDate(stringStartDate);
  const endDate = parseAndFormatDate(stringEndDate);

  bookingData.startDate = startDate;
  bookingData.endDate = endDate;

  //startDate and endDate are strings and in SB we set these fields to accept dates, but Supabase is able to handle the string representation of the dates and convert them to the appropriate date format internally

  //DATA FROM formData
  const fullName = formData.get("fullName");
  const dobValue = (formData.get("dob") as string).replace(/\//g, ".");
  const dob = parseAndFormatDate(dobValue);
  const phoneNumber = formData.get("phoneNumber");
  if (!/^\d{9,10}$/.test(phoneNumber as string)) {
    throw new Error("Please provide a valid phone number (9 or 10 digits)");
  }
  const nationalID = formData.get("nationalID");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID");

  const nationalityField = formData.get("nationality");
  // Ensure that it's a string, and not a File or null
  if (typeof nationalityField !== "string") {
    throw new Error("Invalid nationality data");
  }
  const nationality = nationalityField.split("%")[0];
  const bedType = formData.get("bedType");
  const hasBreakfast = formData?.get("hasBreakfast") === "on" || false;
  const hasTransfer = formData?.get("hasTransfer") === "on" || false;
  const specialRequests = formData.get("specialRequests");
  const price = Number(formData.get("price"));

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    fullName,
    dob,
    phoneNumber,
    nationalID,
    nationality,
    bedType,
    hasBreakfast,
    hasTransfer,
    specialRequests,
    price,
  };

  const { error } = await supabase
    .from("hotelBookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) throw new Error("Booking couldn't be created");

  //change it for reservations path later
  revalidatePath("/hotels");

  redirect(`/thankyou?city=${encodeURIComponent(city)}&res=hotel`);
}

export async function updateFlight(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const updateData = {
    adultTicket: Number(formData.get("adultTicket")),
    childTicket: Number(formData.get("childTicket")),
    seatAllocation: formData.get("seatAllocation"),
    other: formData.get("other"),
    price: Number(formData.get("price")).toFixed(0),
  };
  const flightId = Number(formData.get("id"));

  const { error } = await supabase
    .from("flightReservations")
    .update(updateData)
    .eq("id", flightId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Flight could not be updated");

  revalidatePath(`/reservations/editFlight/${flightId}`);

  redirect("/reservations");
}

export async function updateBooking(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const updateData = {
    adults: Number(formData.get("adults")),
    kids: Number(formData.get("kids")),
    hasBreakfast: formData.get("hasBreakfast") === "true" || false,
    hasTransfer: formData.get("hasTransfer") === "true" || false,
    specialRequests: formData.get("specialRequests"),
    price: Number(formData.get("price")).toFixed(0),
  };
  const bookingId = Number(formData.get("id"));

  const { error } = await supabase
    .from("hotelBookings")
    .update(updateData)
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/reservations/bookings/editBooking/${bookingId}`);

  redirect("/reservations/bookings");
}

export async function deleteItem(itemId: number, item: "flight" | "booking") {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  let tableName: string;
  if (item === "flight") {
    tableName = "flightReservations";
  } else if (item === "booking") {
    tableName = "hotelBookings";
  } else {
    throw new Error("Invalid type");
  }

  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq("id", itemId)
    .eq("guestId", session.user.guestId);

  if (error) throw new Error(`${item} could not be deleted`);

  revalidatePath(
    `${item === "flight" ? "/reservations" : "/reservations/bookings"}`
  );
}
