import { useSearchPosts } from "@/api/posts/search-posts";
import { ModalProps } from "@/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Icons } from "../icons";

export default function SearchPosts({
  open,
  onOpenChange,
}: ModalProps<undefined>) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, refetch } = useSearchPosts(searchTerm);

  console.log(data);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Posts</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Search Posts.."
            onChange={(e) => {
              setTimeout(() => {
                setSearchTerm(e.target.value);
                refetch();
              }, 500);
            }}
            className="w-full"
          />

          {isLoading ? <Icons.spinner /> : <></>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
