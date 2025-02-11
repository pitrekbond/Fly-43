type SelectCityProps = {
  cities: string[];
  placeholder: string;
  className?: string;
  stateSetter: (value: string) => void;
  stateValue: string;
};

export default function SelectCity({
  cities,
  placeholder,
  className,
  stateSetter,
  stateValue,
}: SelectCityProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    stateSetter(value);
  }

  return (
    <select
      className={`w-[170px] py-2 pl-2 text-gray-900 focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] ${className}`}
      onChange={handleChange}
      value={stateValue}
    >
      <option value="">{placeholder}</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
