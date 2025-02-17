import { ReactNode } from "react";
import MainButtons from "../_components/MainButtons";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="bg-primary-900 rounded-md mx-6 py-6 min-h-[calc(100vh-134px)] flex flex-col mb-10">
      <h1 className="text-4xl font-semibold max-lg:text-center lg:ml-20 lg:mt-10">
        Your reservations
      </h1>
      <MainButtons />
      {children}
    </main>
  );
}
