"use client";
import { useState } from "react";
import FlightSearch from "./FlightSearch";
import SelectIsReturn from "./SelectIsReturn";

export default function Search() {
  const [isReturn, setIsReturn] = useState(true);

  return (
    <div className="flex flex-col max-lg:justify-center lg:ml-20">
      <SelectIsReturn setIsReturn={setIsReturn} />
      <FlightSearch isReturn={isReturn} />
    </div>
  );
}
