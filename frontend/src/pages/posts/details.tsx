import { useGetPostDetails } from "@/api/posts/get-post-details";
import BackButton from "@/components/back-button";
import { Icons } from "@/components/icons";
import Layout from "@/components/layout";
import PostCommentForm from "@/components/posts/comment-form";
import { formatDate } from "@/lib/utils";

export default function BlogDetailsPage() {
  const { data, isLoading, error } = useGetPostDetails();

  return (
    <Layout>
      {isLoading ? (
        <div>
          <Icons.spinner />
        </div>
      ) : !data ? (
        <p>{error?.message}</p>
      ) : (
        <>
          <BackButton />
          <div className="flex flex-col w-full">
            <section className="flex flex-col gap-10">
              <div className="relative w-full h-40 overflow-hidden rounded-md md:h-64 bg-secondary">
                {data?.image ? (
                  <img src={data?.image} />
                ) : (
                  <div className="grid w-full h-full place-items-center">
                    <Icons.image className="w-2/4 mx-auto h-2/4" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                  {data?.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  By {data?.author.name} |{" "}
                  {formatDate(data?.createdAt.toString())}
                </p>
              </div>

              <div
                className="p-2 *:text-lg md:*:text-xl w-full"
                dangerouslySetInnerHTML={{
                  __html: data.content.toString(),
                }}
              />
            </section>

            <section className="py-12 md:py-20 lg:py-24">
              <div className="container px-4 md:px-6">
                <div className="space-y-4 md:space-y-6 lg:space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                      Comments
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      Share your thoughts and feedback.
                    </p>
                  </div>

                  <PostCommentForm post_id={data.id} />

                  <div className="grid gap-6">
                    {data.comments.length === 0 ? (
                      <p>No Comment yet..</p>
                    ) : (
                      data.comments.map((comment) => (
                        <div
                          className="flex items-start gap-4 text-sm"
                          key={comment.id}
                        >
                          <img
                            src={`https://api.multiavatar.com/${
                              comment.commenter_name || "plusone"
                            }.svg`}
                            className="w-7 h-7"
                          />

                          <div className="grid gap-1.5">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">
                                {comment.commenter_name || "Anonymous"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(comment.updatedAt.toString())}
                              </div>
                            </div>
                            <div>{comment.comment}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}
