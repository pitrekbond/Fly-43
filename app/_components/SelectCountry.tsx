import { getCountries } from "../_lib/data-service";

type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

type Country = {
  name: string;
  flag: string;
  independent: boolean;
};

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country: Country) => country.name === defaultCountry)
      ?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={`rounded-md py-2 pl-2 ${className} focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px]`}
      required
    >
      <option value="">Select country...</option>
      {countries.map((c: Country) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
