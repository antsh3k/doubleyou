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
import { createDocument, updateDocument } from "@/app/utils/queries/documents";
import moment from "moment";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Titles must be at least 2 characters.",
  }),
  images: z.array(z.string().url()),
  date: z.date(),
  summary: z.any(),
});

const Upload = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [documentSummary, setDocumentSummary] = useState<any>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const images = form.watch("images");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // const serializedSummary = documentSummary?.response
      //   ? JSON.parse(JSON.stringify(documentSummary?.response))
      //   : null;

      const metadata = {
        name: values.name,
        date: moment(values.date).format("L"),
        images: images[0],
        summary: documentSummary,
      };

      const resp = await fetch("/api/create-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });
      const data = await resp.json();
      setOpen(false);
      router.refresh();
      toast({
        title: "Document uploaded successfully",
        description: "Your document has been created and saved.",
      });
    } catch (error) {
      console.error("Error creating document:", error);
      toast({
        title: "Error",
        description:
          "There was a problem uploading your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onUpload(imageUrl: string) {
    setSubmitting(true);
    try {
      const resp = await fetch("/api/py/pixtral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
        }),
      });
      const data = await resp.json();
      // Convert the response to an object
      const transformedData = JSON.parse(data.response);
      setDocumentSummary(transformedData);
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      console.log("🟣 - ", e);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
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
                      onClientUploadComplete={async (res) => {
                        const urls = res.map((image) => image.url);
                        const currentUrls = form.getValues("images") || [];
                        form.setValue("images", [...currentUrls, ...urls]);
                        onUpload(urls[0]);
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
                      {isLoading || submitting ? (
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
          <AlertDialogCancel disabled={isLoading || submitting}>
            Cancel
          </AlertDialogCancel>

          <Button asChild variant="default">
            <AlertDialogAction
              type="submit"
              className="gap-2"
              disabled={isLoading || submitting}
              onClick={form.handleSubmit(onSubmit)}
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
