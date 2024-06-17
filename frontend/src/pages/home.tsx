import { useGetPosts } from "@/api/home/get-post";
import { Icons } from "@/components/icons";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data, isLoading } = useGetPosts();

  return (
    <Layout>
      {isLoading ? (
        <div className="mx-auto">
          <Icons.spinner />
        </div>
      ) : (
        <section className="flex flex-col gap-5">
          {data?.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col gap-10 p-5 rounded-md md:flex-row-reverse bg-card md:p-7"
            >
              <div className="relative w-full h-40 md:h-52 md:w-1/3">
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
              <div className="flex flex-col justify-between md:w-2/3">
                <div className="space-y-5">
                  <Link
                    to={`/p/${post.id}`}
                    className="text-lg font-semibold lg:text-2xl"
                  >
                    {post.title}
                  </Link>
                  <div
                    className="line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: post.content,
                    }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button variant={"link"} asChild>
                    <Link to={`/p/${post.id}`}>Read More</Link>
                  </Button>
                  {"•"}
                  <p>{formatDate(post.updatedAt.toString())}</p>
                  {"•"}
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://api.multiavatar.com/${post.author.name}.svg`}
                      className="w-5 h-5"
                    />
                    <p>{post.author.name}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}
    </Layout>
  );
}
