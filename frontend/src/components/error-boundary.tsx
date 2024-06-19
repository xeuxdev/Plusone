import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError() as { message: string };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <div className="max-w-md p-8 text-center rounded-lg shadow-md bg-muted">
        <h1 className="mb-4 text-3xl font-bold">
          Oops! Something went wrong 😔😥
        </h1>
        <p className="mb-8 ">{error?.message}</p>
      </div>
    </div>
  );
}

export default ErrorBoundary;
