import React from "react";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container ">
      <Header />
      <main className="flex flex-col items-center justify-center w-full h-full max-w-6xl gap-5 px-5 py-10 pt-32 mx-auto">
        {children}
      </main>
    </div>
  );
}
