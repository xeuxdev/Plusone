import { useUploadPostBannerImage } from "@/api/posts/upload-post-banner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ModalProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import { Editor } from "@tiptap/react";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  postBanner: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function UploadPostBannerImage({
  data,
  onOpenChange,
  open,
}: ModalProps<{ editor: Editor | null }>) {
  const [selectedImage, setSelectedImage] = React.useState<
    File | undefined | null
  >(null);

  const { mutateAsync, isPending: isUploading } = useUploadPostBannerImage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleUploadPic(selectedImage: File) {
    const image = new FormData();
    image.append("file", selectedImage);
    image.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    if (selectedImage) {
      mutateAsync(image).then((res) => {
        onOpenChange(false);
        form.reset({ postBanner: "" });

        if (res.secure_url) {
          data?.editor?.chain().focus().setImage({ src: res.secure_url }).run();
        }
        setSelectedImage(undefined);
      });
    }
  }

  function handleSubmit(data: z.infer<typeof formSchema>) {
    const { postBanner } = data;
    handleUploadPic(postBanner[0]);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Post Banner</DialogTitle>
          <DialogDescription>
            Change your Banner Image by uploading a new one here or removing
            existing one
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="relative w-full overflow-hidden h-60 md:w-full md:h-72 lg:h-80">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="selectedImage"
                    className="object-cover"
                  />
                ) : (
                  <Icons.image className="w-full h-full" />
                )}
              </div>
            </div>

            <div className="grid w-full gap-4 pt-5 md:gap-5">
              <FormField
                control={form.control}
                name="postBanner"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        type="button"
                        className="w-full"
                        asChild
                      >
                        <label htmlFor="file">
                          <input
                            type="file"
                            id="file"
                            className="hidden"
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              setSelectedImage(e.target.files?.[0]);
                            }}
                            ref={field.ref}
                          />
                          Select Image
                        </label>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" isLoading={isUploading}>
                Upload
                <Upload className="w-4 ml-3" />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
