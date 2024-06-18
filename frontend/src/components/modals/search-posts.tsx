import { useSearchPosts } from "@/api/posts/search-posts";
import { formatDate } from "@/lib/utils";
import { ModalProps } from "@/types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export default function SearchPosts({
  open,
  onOpenChange,
}: ModalProps<undefined>) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, refetch, isRefetching } = useSearchPosts(searchTerm);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm === "" || !searchTerm || searchTerm.length < 2) return;
      refetch();
    }, 800);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative max-w-2xl px-5">
        <ScrollArea className="w-full max-h-[90vh]">
          <DialogHeader className="absolute top-0 z-10 w-full px-4 pb-10 pl-8 space-y-4 -left-5 bg-background">
            <DialogTitle>Search Posts</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="Search Posts.."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="w-full"
              />
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-3 pt-32">
            {isLoading || isRefetching ? (
              <Icons.spinner />
            ) : !data || data.length === 0 ? (
              <p>Post Not Found</p>
            ) : (
              data?.map((post) => (
                <Card
                  key={post.id}
                  className="flex flex-col rounded-md bg-card"
                >
                  <Link to={`/p/${post.id}`}>
                    <CardHeader className="pb-2">
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content,
                          }}
                        />
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-3">
                      <div className="flex items-center gap-3">
                        <p>{formatDate(post.createdAt.toString())} ago.</p>
                        {"•"}
                      </div>
                      <div className="relative w-full h-40 md:h-52">
                        {post.image ? (
                          <img
                            src={post.image}
                            className="absolute inset-0 w-full h-full rounded-md"
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full rounded-md bg-muted-foreground">
                            <div className="relative grid w-full h-full place-items-center">
                              <Icons.image className="w-10 h-10" />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
