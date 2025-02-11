import { parse, addDays, format } from "date-fns";

/**
 * Parses a date string in "dd.MM.yyyy" format, adds one day, 
 * and returns the formatted date in "yyyy-MM-dd" format.

 */
export function parseAndFormatDate(inputDate: string) {
  const parsedDate = parse(inputDate, "dd.MM.yyyy", new Date())
    .toISOString()
    .slice(0, 10);
  const correctedDate = addDays(parsedDate, 1);
  return format(correctedDate, "yyyy-MM-dd");
}

export const BASIC_ADULT_HOTEL_PRICE = 50;
export const BASIC_CHILD_HOTEL_PRICE = 30;
export const BREAKFAST_PRICE = 8;
export const TRANSFER_PRICE = 20;

export const COUNTRY_NAME_MAPPING: { [key: string]: string } = {
  "People's Republic of China": "China",
  "United States of America": "United States",
  Turkey: "Türkiye",
  "Democratic Republic of the Congo": "DR Congo",
  "Czech Republic": "Czechia",
};
