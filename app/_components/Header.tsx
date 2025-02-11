import Link from "next/link";
import Logo from "./Logo";
import SideMenuButton from "./SideMenuButton";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { auth } from "../_lib/auth";
import Image from "next/image";
import ChangeCurrencyButton from "./ChangeCurrencyButton";
import { CurrencyProvider } from "./CurrencyContext";

export default async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-950 py-2 px-6 flex justify-between">
      <div className="flex gap-4 items-center">
        <SideMenuButton />
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <ChangeCurrencyButton />
        <Link
          href="/information"
          className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-primary-600 transition-colors"
        >
          <BsQuestionCircle className="h-5 w-5 text-primary-50" />
        </Link>
        {session?.user?.image ? (
          <Link
            href="/account"
            className="py-[6px] px-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            <Image
              className="h-7 w-7 rounded-full"
              src={session.user.image || "/default-avatar.png"}
              alt={session.user.name || "User"}
              width={28}
              height={28}
              unoptimized
              referrerPolicy="no-referrer"
              quality={100}
            />
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 border-[1.5px] border-primary-50 py-2 px-3 rounded-md hover:bg-primary-600 transition-colors"
          >
            <IoPersonCircleOutline className="h-5 w-5 text-primary-50" />
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
