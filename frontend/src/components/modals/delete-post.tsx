import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { useDeletePost } from "@/api/dashboard/delete-post";

type Props = {
  data: {
    title: string;
    id: string;
  };
};

export default function DeletePostsModal({ data }: Props) {
  const { mutateAsync: deletePost, isPending } = useDeletePost();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function handleDeletePost() {
    deletePost(data.id).then(() => {
      setOpenDeleteModal(false);
    });
  }

  return (
    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
      <DialogTrigger>
        <Icons.trash className="text-destructive" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            You are about to delete post with title{" "}
            <strong>{data.title}</strong>. This action cannot be undone. This
            will permanently delete this blog post and remove the data from our
            servers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-5 w-full *:w-full">
          <Button
            variant={"destructive"}
            isLoading={isPending}
            onClick={handleDeletePost}
          >
            Yes, delete
          </Button>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
