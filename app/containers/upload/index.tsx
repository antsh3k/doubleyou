"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { toast } from "@/app/hooks/use-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { DatePicker } from "@/app/components/date-picker";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Titles must be at least 2 characters.",
  }),
  images: z.array(z.string().url()),
  date: z.date(),
});

const Upload = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onUpdate(values: z.infer<typeof formSchema>) {
    // console.log("values", values);

    const resp = await fetch("/api/process-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "1",
        imageUrl:
          "https://utfs.io/f/K4uUujr4zCgieTO3dqbjpTYqOHKQCX5t1VyLlhd8i96SARoU",
      }),
    });
    // const data = await resp.json();
    // console.log("🟣 - data", data);
    // upload to db

    // query mistral model
  }

  const images = form.watch("images");
  console.log("images", images);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-screen">
        <AlertDialogHeader>
          <AlertDialogTitle>Upload documents</AlertDialogTitle>
          <AlertDialogDescription>
            Upload your medical documents
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onUpdate)}
          >
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date of document</FormLabel>
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    text="Date"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        const urls = res.map((image) => image.url);
                        const currentUrls = form.getValues("images") || [];
                        form.setValue("images", [...currentUrls, ...urls]);
                      }}
                      config={{ mode: "auto" }}
                      onUploadError={() => {
                        toast({
                          title: "Something went wrong",
                          description:
                            "There was a problem with uploading your images",
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-2">
              {images &&
                images.map((image) => (
                  <div
                    key={image}
                    className="relative aspect-[4/3] rounded-md overflow-hidden border-2 border-foreground"
                  >
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      disabled={isLoading}
                      // onClick={() => handleDeleteImage(image)}
                      className="absolute top-1 right-1 w-6 h-6 z-10 rounded-full"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <X size={16} />
                      )}
                    </Button>
                    <Image
                      src={image}
                      layout="fill"
                      alt="image"
                      className="object-cover p-0.5 rounded-sm overflow-hidden"
                    />
                  </div>
                ))}
            </div>
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <Button asChild variant="default">
            <AlertDialogAction
              type="submit"
              className="gap-2"
              disabled={isLoading}
              onClick={form.handleSubmit(onUpdate)}
            >
              {isLoading && <Loader2 className="animate-spin" size={20} />}
              <div>Upload</div>
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Upload;
