import BasicFlightData from "./BasicFlightData";
import PersonalData from "./PersonalData";
import SelectCountry from "./SelectCountry";
import FlightExtras from "./FlightExtras";
import AdditionalFlightData from "./AdditionalFlightData";
import { createFlightReservation } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

export type Guest = {
  fullName: string;
  email: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
  dateOfBirth?: Date;
};

type FlightReservationFormProps = {
  guest: Guest;
  searchParams: Record<string, string>;
};

export default function FlightReservationForm({
  guest,
  searchParams,
}: FlightReservationFormProps) {
  return (
    <form action={createFlightReservation} className="w-full my-8 px-8">
      <BasicFlightData searchParams={searchParams} />
      <PersonalData
        guest={guest}
        fieldNames={["fullName", "dob", "nationalID"]}
      >
        <SelectCountry
          name="nationality"
          id="nationality"
          defaultCountry={guest.nationality as string}
          className="lg:w-[330px] bg-primary-50 text-gray-700 border border-black focus:border-transparent"
        />
      </PersonalData>
      <FlightExtras searchParams={searchParams} />
      <AdditionalFlightData />
      <SubmitButton
        className="text-xl lg:mr-4"
        className2="max-lg:justify-center"
      >
        Reserve flight
      </SubmitButton>
    </form>
  );
}
