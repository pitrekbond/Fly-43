import { ReactNode } from "react";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { Poppins } from "next/font/google";
import { CurrencyProvider } from "./_components/CurrencyContext";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s / Fly 43",
    default: "Welcome / Fly 43",
  },
  description: "Find the flights and bookings easily with our app.",
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-primary-950 text-primary-50 min-h-[calc(100vh-86px)] overflow-y-auto`}
      >
        <CurrencyProvider>
          <Header />
          <div className="mt-[86px]"></div>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
