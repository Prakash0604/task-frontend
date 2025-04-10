"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginSchema } from "@/utils"


type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
        const [isLoading, setIsLoading] = useState(false)
        const [error, setError] = useState<string | null>(null)
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
        })

        // Handle form submission
        const onSubmit = async (data: LoginFormValues) => {
                setIsLoading(true)
                setError(null)

                try {
                        // Simulate API call
                        await new Promise((resolve) => setTimeout(resolve, 1500))

                        // Here you would typically make an API call to authenticate the user
                        console.log("Form submitted:", data)

                        // For demo purposes, let's pretend authentication was successful
                        // In a real app, you would handle the response from your auth API
                } catch (err) {
                        setError("An error occurred during login. Please try again.")
                        console.log(err)
                } finally {
                        setIsLoading(false)
                }
        }

        return (
                <Card className="w-full">
                        <CardHeader>
                                <CardTitle className="text-2xl">Login</CardTitle>
                                <CardDescription>Enter your credentials to access your account</CardDescription>
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
                                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                        id="password"
                                                        type="password"
                                                        {...register("password")}
                                                        aria-invalid={errors.password ? "true" : "false"}
                                                />
                                                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                                        </div>
                                </CardContent>

                                <CardFooter>
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                                {isLoading ? (
                                                        <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Logging in...
                                                        </>
                                                ) : (
                                                        "Log in"
                                                )}
                                        </Button>
                                </CardFooter>
                        </form>
                </Card>
        )
}