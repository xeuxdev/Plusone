import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="max-w-md p-8 text-center rounded-lg shadow-md bg-muted">
        <h1 className="mb-4 text-3xl font-bold">
          Oops! Looks like you're lost. 😔😥
        </h1>
        <p className="mb-8 ">
          The page you're looking for could not be found. It might be misspelled
          or removed.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7"
              ></path>
            </svg>
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
