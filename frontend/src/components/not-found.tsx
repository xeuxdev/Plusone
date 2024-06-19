import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function NotFound({
  resource_name = "resources",
}: {
  resource_name?: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center max-w-md p-8 text-center rounded-lg shadow-md bg-muted">
      <h1 className="mb-4 text-3xl font-bold">
        Oops! We Could Not find the {resource_name} you were looking for 😔😥
      </h1>
      <p className="mb-8 ">
        The page you're looking for could not be found. It might be misspelled
        or removed.
      </p>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        className="font-medium text-secondary"
      >
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
          />
        </svg>
        Go Back
      </Button>
    </div>
  );
}
