import { Icons } from "@/components/icons";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logout from "../auth/logout";
import useUserStore from "@/store/user";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useUserStore();

  return (
    <header className="flex items-center justify-between w-full h-14">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-bold">PlusOne</span>
      </Link>
      <div className="flex items-center gap-4">
        <Icons.search />
        <ThemeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={`https://api.multiavatar.com/plusone`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="capitalize">{user?.name}</p>
                <p>{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link to={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="py-0">
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
