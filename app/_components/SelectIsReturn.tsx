"use client";

type FlightFilterProps = {
  setIsReturn: (value: boolean) => void;
};

export default function SelectIsReturn({ setIsReturn }: FlightFilterProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setIsReturn(value === "true");
  }

  return (
    <div className="text-sm max-lg:flex max-lg:justify-center">
      <select
        className="bg-primary-900 text-primary-100 focus:outline-none"
        onChange={handleChange}
      >
        <option className="bg-primary-50 text-primary-900" value="true">
          Round trip
        </option>
        <option className="bg-primary-50 text-primary-900" value="false">
          One way
        </option>
      </select>
    </div>
  );
}
