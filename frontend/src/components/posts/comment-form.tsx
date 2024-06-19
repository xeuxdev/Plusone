import { useCreateComment } from "@/api/posts/create-comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Icons } from "../icons";

const formSchema = z.object({
  comment: z
    .string({ required_error: "Please enter comment" })
    .min(3, { message: "Please enter comment" }),
});

export type CreateCommentType = z.infer<typeof formSchema> & {
  post_id: string;
};

export default function PostCommentForm({ post_id }: { post_id: string }) {
  const { mutateAsync, isPending } = useCreateComment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmitComment({ comment }: z.infer<typeof formSchema>) {
    mutateAsync({
      comment: comment,
      post_id: post_id,
    }).then(() => {
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitComment)}
        className="relative flex flex-col items-center w-full gap-5 md:flex-row"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full h-full">
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Looks good to me....."
                  maxLength={200}
                  className="h-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="absolute -translate-y-[12%] right-5 top-1/2"
          isLoading={isPending}
          disabled={isPending}
        >
          <Icons.send />
        </Button>
      </form>
    </Form>
  );
}
