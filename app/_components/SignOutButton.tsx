import { signOutAction } from "../_lib/actions";
import { VscSignOut } from "react-icons/vsc";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        className={`flex items-center gap-5 py-2 pl-4 pr-10 hover:bg-primary-50 hover:text-primary-900 rounded-md transition-colors`}
      >
        <VscSignOut className="h-6 w-6 transition-colors" />
        <span>Sign out</span>
      </button>
    </form>
  );
}
