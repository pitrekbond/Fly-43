import { IoInformationCircleOutline } from "react-icons/io5";

export default function AdditionalFlightData() {
  return (
    <div className="flex items-start gap-8 pb-8 mt-8">
      <div className="text-2xl flex flex-col items-center gap-1 w-[216.18px]">
        <p>4. Additional</p>
        <p>information</p>
        <IoInformationCircleOutline className="w-10 h-10 mt-3" />
      </div>
      <div className="border-2 border-gray-400 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-6 p-2 rounded-md shadow-md">
        <div className="flex flex-col gap-1">
          <label htmlFor="isDisabled" className="text-sm text-accent-500">
            Are you a disabled person?
          </label>
          <select
            id="isDisabled"
            name="isDisabled"
            className="py-2 pl-2 rounded-md bg-primary-50 text-gray-700 focus:border-transparent border border-black focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="isAnimal" className="text-sm text-accent-500">
            Are you taking any animals with you?
          </label>
          <select
            id="isAnimal"
            name="isAnimal"
            className="py-2 pl-2 rounded-md bg-primary-50 text-gray-700 focus:border-transparent border border-black focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[330px]"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-2 items-center">
          <label htmlFor="other" className="text-sm text-accent-500">
            In case you have any other needs, please specify it
          </label>
          <textarea
            id="other"
            name="other"
            className="py-2 pl-2 rounded-md bg-primary-50 text-gray-700 focus:border-transparent border border-black focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 outline-offset-[-1px] w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
