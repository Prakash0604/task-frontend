"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginSchema } from "@/utils";
import Image from "next/image";
import img from "../../../public/img.jpeg";
import Link from "next/link";
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> Include the Navbar component here */}

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left image section */}
        <div className="lg:w-1/2 w-full h-64 lg:h-auto hidden lg:block">
          <Image
            src={img} // Replace with your actual image path
            alt="Login Illustration"
            className="w-full h-screen object-cover p-2"
          />
        </div>
        {/* Right login form section */}

        <div className="lg:w-1/2 w-full flex items-center justify-center p-6 flex-col bg-white">
          <div className="w-full flex justify-start mb-4 pl-24">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white bg-primary hover:bg-primary/80 px-4 py-2 rounded-md transition duration-300 ease-in-out shadow"
            >
              ← Back
            </Link>
          </div>

          <Card className="w-full max-w-md ">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <div className="pt-2 w-full">
                  <Button
                    type="submit"
                    className="w-full pt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                        Logging in...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
