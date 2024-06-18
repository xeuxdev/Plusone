import { useGetPosts } from "@/api/home/get-post";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, stripFirstImg } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data, isLoading } = useGetPosts();

  if (isLoading) {
    return (
      <div className="mx-auto">
        <Icons.spinner />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      {data?.map((post) => (
        <Card
          key={post.id}
          className="flex flex-col-reverse gap-5 p-5 rounded-md md:gap-10 md:flex-row"
        >
          <CardHeader className="flex flex-col justify-between p-0 md:w-2/3">
            <div className="space-y-5">
              <CardTitle className="text-xl font-semibold lg:text-3xl">
                <Link to={`/p/${post.id}`}>{post.title}</Link>
              </CardTitle>
              <CardDescription>
                <div
                  className="line-clamp-2 lg:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: stripFirstImg(post.content),
                  }}
                />
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant={"link"} asChild>
                <Link to={`/p/${post.id}`}>Read More</Link>
              </Button>
              {"•"}
              <span>{formatDate(post.createdAt.toString())}</span>
              {"•"}
              <div className="flex items-center gap-2">
                <img
                  src={`https://api.multiavatar.com/${post.author.name}.svg`}
                  className="w-5 h-5"
                />
                <span>{post.author.name}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative w-full h-40 md:h-52 md:w-1/3">
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
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
