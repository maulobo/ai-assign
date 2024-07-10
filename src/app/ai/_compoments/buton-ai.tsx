import React from "react";
import { useFormStatus } from "react-dom";
import { Skeleton } from "./skeleton";

export default function ButtonAi() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={pending}
      >
        {pending ? "loading..." : "Ask To AI"}
      </button>
      {pending ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full md: rounded-xl" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
