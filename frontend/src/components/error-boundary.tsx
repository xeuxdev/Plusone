import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError() as { message: string };
  console.error(error);

  return (
    <section>
      <h1>Something went wrong!</h1>
      <small>{error?.message}</small>
    </section>
  );
}

export default ErrorBoundary;
