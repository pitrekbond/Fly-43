"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

type DeleteItemProps = {
  itemId: number;
  onDelete: (itemId: number, item: "flight" | "booking") => void;
  item: "flight" | "booking";
};

export default function DeleteItem({
  itemId,
  onDelete,
  item,
}: DeleteItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Placeholder function for delete action
  function handleDelete() {
    startTransition(() => onDelete(itemId, item));
    setIsModalOpen(false);
  }

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-gray-500 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-50"
      >
        <TrashIcon className="h-5 w-5 text-gray-500 group-hover:text-primary-50 transition-colors" />
        <span className="mt-1">Delete</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {item}? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {!isPending ? "Delete" : <SpinnerMini />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
