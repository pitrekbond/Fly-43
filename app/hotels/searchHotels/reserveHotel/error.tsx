"use client";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  return (
    <main className="text-center space-y-6 mt-20">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-lg">{error.message}</p>
      <button
        onClick={() => router.back()}
        className="inline-block bg-accent-600 px-6 py-3 text-lg hover:bg-accent-700 transition-colors rounded-md"
      >
        Go back
      </button>
    </main>
  );
}
