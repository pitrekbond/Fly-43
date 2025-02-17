import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-40 items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-semibold max-lg:text-center">
        Sign in to reserve flights, book hotels and check/modify your
        reservations.
      </h2>
      <form action={signInAction}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium hover:bg-primary-600 transition-colors duration-300 rounded-md">
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
}
