import React from "react";

export default function ConfirmPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <main
      style={{
        background:
          "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
      className="w-full min-h-screen flex flex-col items-center justify-center sm:px-4 relative"
    >
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="flex text-center align-middle justify-center">
          <img
            src="https://farmui.com/logo.svg"
            width={100}
            className="mr-auto rounded-full text-center align-middle"
          />
        </div>

        <div className="text-center">
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
