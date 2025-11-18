"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong!
          </h2>

          <p className="text-gray-600 mt-2">{error.message}</p>

          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
