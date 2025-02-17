"use client";

import { useOptimistic } from "react";
import FlightCard from "./FlightCard";
import { deleteItem } from "../_lib/actions";
import BookingCard from "./BookingCard";
import { BiSortAlt2 } from "react-icons/bi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ReservationListProps = {
  items: Record<string, any>[];
};

export default function ReservationList({ items }: ReservationListProps) {
  //using useOptimistic to make deleting flights instant (from the UI, in SB it still takes a while)
  const [optimisticItems, optimisticDelete] = useOptimistic(
    items,
    (curItems, itemId) => {
      return curItems.filter((item) => item.id !== itemId);
    }
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeSort = searchParams.get("sortDate") ?? "desc";

  function handleSort() {
    const newSort = activeSort === "desc" ? "asc" : "desc";
    const params = new URLSearchParams(searchParams);
    params.set("sortDate", newSort);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  let itemType: string;
  if ("from" in items[0]) {
    itemType = "flight";
  } else if ("city" in items[0]) {
    itemType = "booking";
  } else {
    throw new Error("Invalid type");
  }

  async function handleDelete(itemId: number, itemType: "flight" | "booking") {
    optimisticDelete(itemId);
    await deleteItem(itemId, itemType);
  }

  const sortedItems = [...optimisticItems].sort((a, b) => {
    if (itemType === "flight") {
      const dateA = new Date(a.departure).getTime();
      const dateB = new Date(b.departure).getTime();
      return activeSort === "desc" ? dateB - dateA : dateA - dateB;
    } else {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return activeSort === "desc" ? dateB - dateA : dateA - dateB;
    }
  });

  return (
    <>
      <ul className="space-y-6 max-lg:flex max-lg:flex-col max-lg:items-center lg:ml-20">
        {sortedItems.map((item) =>
          itemType === "flight" ? (
            <FlightCard key={item.id} flight={item} onDelete={handleDelete} />
          ) : (
            <BookingCard key={item.id} booking={item} onDelete={handleDelete} />
          )
        )}
      </ul>
      <button
        className="p-2 my-8 mr-[21.8rem] gap-2 rounded-md flex border-[1.5px] border-primary-700 transition-colors duration-300 bg-primary-950 hover:bg-primary-50 hover:text-primary-900 absolute w-[150px] h-[41.6px] top-[12.3rem] right-[1.4rem] 2xl:right-[7.3rem] max-lg:hidden"
        onClick={handleSort}
      >
        <BiSortAlt2 className="h-6 w-6" />
        <p>Sort by date</p>
      </button>
    </>
  );
}
