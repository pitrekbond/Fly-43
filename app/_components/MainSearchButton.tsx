import { ReactNode } from "react";

type MainSearchButtonProps = {
  className: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
};

export default function MainSearchButton({
  className,
  onClick,
  children,
  isActive,
}: MainSearchButtonProps) {
  const isPlaceholder =
    children === "Start date" ||
    children === "End date" ||
    children === "Departure" ||
    children === "Return";

  return (
    <button
      className={`bg-white text-gray-900 px-2 ${className} hover:bg-purple-100 transition-colors focus:outline-none focus:ring-[1.5px] focus:ring-accent-500 ${
        isPlaceholder ? "text-gray-400" : ""
      } ${isActive && "ring-[1.5px] ring-accent-500"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
