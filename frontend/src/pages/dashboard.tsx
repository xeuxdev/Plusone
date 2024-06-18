import { useGetUserPosts } from "@/api/dashboard/get-posts";
import { Icons } from "@/components/icons";
import DeletePostsModal from "@/components/modals/delete-post";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { data, isLoading } = useGetUserPosts();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="w-full rounded-lg">
        <div className="grid grid-cols-1 min-[310px]:grid-cols-2 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <Icons.posts className="w-8 h-8 text-muted-foreground" />
            <header className="mt-2 text-2xl font-bold">
              {data?.numOfPosts}
            </header>
            <p className="text-muted-foreground">Total Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <Icons.views className="w-8 h-8 text-muted-foreground" />
            <header className="mt-2 text-2xl font-bold">
              {data?.totalViews}
            </header>
            <p className="text-muted-foreground">Total Views</p>
          </div>

          <div className="flex flex-col items-center justify-center min-[310px]:col-span-2 p-4 rounded-lg sm:col-span-1 bg-muted">
            <Icons.comments className="w-8 h-8 text-muted-foreground" />
            <header className="mt-2 text-2xl font-bold">
              {data?.numOfComments}
            </header>
            <p className="text-muted-foreground">Total Comments</p>
          </div>
        </div>
      </section>

      <section className="container w-full">
        <header className="flex items-center justify-between gap-2">
          <p className="py-5 text-2xl font-semibold">Posts</p>
          <Button asChild className="flex items-center gap-2">
            <Link to={"/p/new"}>
              <Icons.add className="md:flex" />
              <span className="hidden md:flex">Create Post</span>
            </Link>
          </Button>
        </header>

        {!data || data?.posts?.length === 0 ? (
          <div>No Posts yet</div>
        ) : (
          <div className="flex flex-col w-full gap-4">
            {data.posts?.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between w-full gap-2 p-5 rounded-md bg-muted"
              >
                <div className="max-w-[448px] space-y-5">
                  <Link
                    to={`/p/${item.id}`}
                    className="w-full text-xl font-semibold sm:text-2xl"
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-center flex-wrap gap-1 min-[375px]:gap-3 *:text-muted-foreground *:capitalize *:lg:text-base *:text-sm">
                    <p>
                      <span className="font-semibold">published on</span>:{" "}
                      {formatDate(item.createdAt.toString())}
                    </p>
                    <p>
                      <span className="font-semibold">edited on</span>:{" "}
                      {formatDate(item.updatedAt.toString())}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full gap-5 md:w-fit">
                  <div className="flex items-center gap-2">
                    <Icons.views />
                    <span>{item.viewCount}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant={"link"} className="p-0" asChild>
                      <Link to={`/p/${item.id}/edit`}>Edit</Link>
                    </Button>

                    <DeletePostsModal
                      data={{
                        id: item.id,
                        title: item.title,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
