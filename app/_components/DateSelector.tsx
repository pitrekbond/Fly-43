import { DateRange, DayPicker } from "react-day-picker";
import { createPortal } from "react-dom";
import "react-day-picker/dist/style.css";
import { isPast, isToday } from "date-fns";

type DateSelectorProps = {
  onClose: () => void;
  setRange: (value: DateRange | undefined) => void;
  range: DateRange | undefined;
  isReturn: boolean;
  singleDate?: Date | undefined;
  setSingleDate?: (date: Date | undefined) => void;
  className: string;
};

export default function DateSelector({
  onClose,
  setRange,
  range,
  isReturn,
  singleDate,
  setSingleDate,
  className,
}: DateSelectorProps) {
  const resetSelection = () => {
    if (isReturn) {
      setRange(undefined);
    } else {
      setSingleDate!(undefined);
    }
  };

  const commonProps = {
    className: "lg:pt-6 place-self-center text-gray-900 rdp",
    min: 0,
    max: 356,
    fromMonth: new Date(),
    fromDate: new Date(),
    toYear: new Date().getFullYear() + 5,
    captionLayout: "dropdown" as const,
    numberOfMonths: 2,
    disabled: (curDate: Date) => isPast(curDate) && !isToday(curDate),
    classNames: {
      month_caption:
        "flex items-center justify-center font-semibold text-lg h-9 px-2 text-gray-900",
    },
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`rounded-md max-sm:text-xs lg:h-[27rem] shadow-md max-sm:w-[80%] max-lg:w-[45rem] w-[50rem] bg-white absolute ${className}`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between">
          {isReturn ? (
            <DayPicker
              {...commonProps}
              mode="range"
              selected={range}
              onSelect={(value) => setRange(value)}
            />
          ) : (
            <DayPicker
              {...commonProps}
              mode="single"
              selected={singleDate}
              onSelect={(date) => {
                if (date) {
                  setSingleDate!(date);
                }
              }}
            />
          )}
        </div>
        <div className="flex justify-center max-lg:mb-2 md:mt-4">
          <button
            className="text-black border border-gray-600 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            onClick={resetSelection}
          >
            Clear
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
