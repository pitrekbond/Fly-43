import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-20">
      <h1 className="text-3xl font-semibold">This page could not be found</h1>
      <Link
        href="/"
        className="inline-block bg-accent-600 px-6 py-3 text-lg hover:bg-accent-700 transition-colors"
      >
        Go back home
      </Link>
    </main>
  );
}
