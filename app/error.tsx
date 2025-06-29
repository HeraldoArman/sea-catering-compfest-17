"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50 rounded-xl shadow-lg p-8">
      <h2 className="text-red-700 mb-4 text-2xl font-semibold">
        Something went wrong!
      </h2>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-6 py-2 text-base transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
