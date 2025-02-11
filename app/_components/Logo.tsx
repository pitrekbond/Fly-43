import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={logo}
        height="70"
        quality={100}
        width="70"
        alt="Fly 43 logo"
      />
    </Link>
  );
}
