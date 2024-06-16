import useUserStore from "@/store/user";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Logout() {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    Cookies.remove("plusone-auth");

    navigate("/", {
      replace: true,
    });
  }

  return (
    <Button
      variant={"ghost"}
      className="p-0 text-destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
