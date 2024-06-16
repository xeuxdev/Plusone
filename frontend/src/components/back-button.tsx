import { useNavigate } from "react-router-dom";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant={"link"}
      className="flex items-center gap-2 mr-auto"
      onClick={() => navigate(-1)}
    >
      <Icons.arrowLeft />
      Back
    </Button>
  );
}
