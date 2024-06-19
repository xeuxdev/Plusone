import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./header";

export default function Layout() {
  return (
    <>
      <div className="container w-full">
        <Header />
        <main className="flex flex-col items-center justify-center w-full h-full max-w-6xl gap-5 px-5 py-10 pt-32 mx-auto">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration
        getKey={(location) => {
          const paths = ["/", "/dashboard"];

          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      />
    </>
  );
}
