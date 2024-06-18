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
import { useState } from "react";
import SearchPosts from "../modals/search-posts";

export default function Header() {
  const { user } = useUserStore();
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <>
      <header className="fixed inset-0 z-50 w-full h-16 border-b-2 bg-background">
        <div className="flex items-center justify-between h-full max-w-6xl px-5 mx-auto ">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">PlusOne</span>
          </Link>
          <div className="flex items-center gap-4">
            <Icons.search
              className="cursor-pointer"
              onClick={() => setOpenSearchModal(true)}
            />
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-6 h-6 md:h-8 md:w-8">
                    <AvatarImage
                      src={`https://api.multiavatar.com/${user.name}.svg`}
                    />
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
        </div>
      </header>

      <SearchPosts
        data={undefined}
        open={openSearchModal}
        onOpenChange={setOpenSearchModal}
      />
    </>
  );
}
