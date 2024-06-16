import React from "react";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-5">
      <Header />
      <main className="flex flex-col items-center justify-center w-full h-full gap-5 py-10">
        {children}
      </main>
    </div>
  );
}
