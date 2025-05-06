"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, UploadCloud, X } from "lucide-react";
import { userSchema } from "@/utlis";
import { useCreateUserStore } from "@/store/user-store/create-user-store";
import { toast } from "sonner";
import useUsersStore from "@/store/user-store/get-user-store";
import Container from "../containers/main-container";

type FormData = z.infer<typeof userSchema>;

interface CreateUserProps {
  onSuccess: () => void;
}

export default function CreateUser({ onSuccess }: CreateUserProps) {
  const { createUser, loading, error: errMsg } = useCreateUserStore();
  const { fetchUsers } = useUsersStore();
  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      contact: "",
      password: "",
      profile: null,
    },
  });

  const { setValue } = form;
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setValue("profile", acceptedFiles[0] ?? null);
    setFileName(acceptedFiles[0]?.name ?? null);
  };

  const removeFile = () => {
    setValue("profile", null);
    setFileName(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createUser({
        ...data,
        profile: data.profile ?? undefined,
      });
      if (res) {
        toast.success("User created successfully");
        form.reset();
        setFileName(null);
        fetchUsers();
        onSuccess(); // Close the modal
      } else {
        toast.error(errMsg);
      }
    } catch (error) {
      toast.error(errMsg);
      throw new Error("Failed to create the user", error as Error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-300">
                  Name
                </FormLabel>
                <FormControl className="  border border-gray-300 dark:border-gray-700 shadow-sm  dark:shadow-blue-400 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-300">
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="text-gray-500 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-300">
                  Email
                </FormLabel>
                <FormControl className="  border border-gray-300 dark:border-gray-700 shadow-sm  dark:shadow-blue-400 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-300">
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="text-gray-500 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Container>

        <Container className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-300">
                  Address
                </FormLabel>
                <FormControl className="  border border-gray-300 dark:border-gray-700 shadow-sm  dark:shadow-blue-400 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-300">
                  <Input
                    {...field}
                    placeholder="La, USA, Street 123"
                    className="text-gray-500 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-300">
                  Contact
                </FormLabel>
                <FormControl className="  border border-gray-300 dark:border-gray-700 shadow-sm  dark:shadow-blue-400 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-300">
                  <Input
                    {...field}
                    placeholder="9800000000"
                    className="text-gray-500 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Container>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500 dark:text-gray-300">
                Password
              </FormLabel>
              <FormControl className="  border border-gray-300 dark:border-gray-700 shadow-sm  dark:shadow-blue-400 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 dark:placeholder:text-gray-300">
                <Input
                  type="password"
                  {...field}
                  placeholder="Secret@1234"
                  className="text-gray-500 dark:text-gray-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile"
          render={() => (
            <FormItem className="gap-4">
              <FormLabel className="text-gray-500 dark:text-gray-300">
                Profile Image
              </FormLabel>
              <FormControl className=" shadow-sm  dark:shadow-blue-400">
                <div
                  {...getRootProps()}
                  className="border border-dashed border-gray-400 dark:border-gray-700 p-12 rounded-md cursor-pointer text-center  relative"
                >
                  <input {...getInputProps()} />
                  {fileName ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-green-700">{fileName}</p>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="ml-2 text-red-600 hover:text-red-800"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      <UploadCloud className="w-6 h-6 mx-auto mb-2" />
                      Drag &apos;n&apos; drop or click to upload
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? <Loader2 /> : "Create User"}
        </Button>
      </form>
    </Form>
  );
}
