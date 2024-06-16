import { useGetUserPosts } from "@/api/dashboard/get-posts";
import { Icons } from "@/components/icons";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { DollarSignIcon, EyeIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { data, isLoading } = useGetUserPosts();

  console.log(data);

  return (
    <Layout>
      <section className="w-full rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <FileTextIcon className="w-8 h-8 text-muted-foreground" />
            <h3 className="mt-2 text-2xl font-bold">1,234</h3>
            <p className="text-muted-foreground">Total Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <EyeIcon className="w-8 h-8 text-muted-foreground" />
            <h3 className="mt-2 text-2xl font-bold">45,678</h3>
            <p className="text-muted-foreground">Total Views</p>
          </div>

          <div className="flex flex-col items-center justify-center col-span-1 p-4 rounded-lg bg-muted">
            <DollarSignIcon className="w-8 h-8 text-muted-foreground" />
            <h3 className="mt-2 text-2xl font-bold">457</h3>
            <p className="text-muted-foreground">Total Comments</p>
          </div>
        </div>
      </section>

      <section className="container w-full ">
        <header className="flex items-center justify-between gap-2">
          <p className="py-5 text-2xl font-semibold">Posts</p>
          <Button className="flex items-center gap-2">
            <Icons.add className="md:flex" />
            <Link to={"/p/new"} className="hidden md:flex">
              Create Post
            </Link>
          </Button>
        </header>

        {isLoading ? (
          <div>Loading...</div>
        ) : !data || data?.length === 0 ? (
          <div>No Posts yet</div>
        ) : (
          <div className="flex flex-col w-full gap-4">
            {data?.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between w-full gap-2 p-5 rounded-md bg-muted"
              >
                <div>
                  <p className="text-2xl font-semibold">{item.title}</p>

                  <div className="flex items-center gap-3 *:text-muted-foreground *:capitalize *:text-lg">
                    <p>published on: {formatDate(item.createdAt.toString())}</p>
                    <p>edited on: {formatDate(item.updatedAt.toString())}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Icons.likes />
                  <p>{item.likesCount}</p>
                  {/* <p>{item.views}</p> */}
                </div>

                <div className="flex items-center gap-3">
                  <Button variant={"link"} className="p-0">
                    Edit
                  </Button>
                  <Button variant={"ghost"} className="p-0">
                    <Icons.trash className="text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
