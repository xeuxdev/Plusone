import React from "react";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-5">
      <Header />
      <main className="flex items-center justify-center h-full py-10">
        {children}
      </main>
    </div>
  );
}
