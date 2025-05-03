import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
        Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./file-upload";
import { userSchema } from "@/utlis";
import useCreateUserStore from "@/store/user-store/create-user-store";
import useUsersStore from "@/store/user-store/get-user-store";
import { toast } from "sonner";

type FormValues = z.infer<typeof userSchema>;

const CreateUser = () => {
        const { createUser, isCreating, error: errMsg, successMessage } = useCreateUserStore();
        const { fetchUsers } = useUsersStore();
        const [showPassword, setShowPassword] = React.useState<boolean>(false);
        const form = useForm({
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

        const onSubmit = async (data: FormValues) => {
                console.log("Profile value:", data.profile); // Debug: Should log File object or null
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("address", data.address);
                formData.append("contact", data.contact);
                formData.append("password", data.password);
                if (data.profile) {
                        console.log("Appending File:", data.profile.name, data.profile.size); // Debug: Log file details
                        formData.append("profile", data.profile);
                }

                // Debug: Inspect FormData contents
                for (const [key, value] of formData.entries()) {
                        console.log(`FormData ${key}:`, value);
                }

                try {
                        const response = await createUser(formData);
                        if (response.status) {
                                toast.success(successMessage || "User created successfully");
                                await fetchUsers();
                                form.reset();
                        } else {
                                toast.error(response.message);
                        }
                } catch (error) {
                        toast.error(errMsg || "Error creating user");
                }
        };

        return (
                <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                                <div className="space-y-4">
                                        <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Full Name</FormLabel>
                                                                <FormControl>
                                                                        <Input placeholder="John Doe" {...field} />
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
                                                                <FormLabel>Email</FormLabel>
                                                                <FormControl>
                                                                        <Input type="email" placeholder="you@example.com" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                        <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Address</FormLabel>
                                                                <FormControl>
                                                                        <Input placeholder="123 Main St, City" {...field} />
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
                                                                <FormLabel>Contact Number</FormLabel>
                                                                <FormControl>
                                                                        <Input placeholder="9800000000" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                        <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Password</FormLabel>
                                                                <FormControl>
                                                                        <div className="relative">
                                                                                <Input
                                                                                        type={showPassword ? "text" : "password"}
                                                                                        placeholder="********"
                                                                                        {...field}
                                                                                        className="pr-10"
                                                                                />
                                                                                <Button
                                                                                        type="button"
                                                                                        variant="ghost"
                                                                                        size="sm"
                                                                                        className={cn(
                                                                                                "absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground",
                                                                                                "hover:text-foreground"
                                                                                        )}
                                                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                                                >
                                                                                        {showPassword ? (
                                                                                                <EyeOff className="h-4 w-4" />
                                                                                        ) : (
                                                                                                <Eye className="h-4 w-4" />
                                                                                        )}
                                                                                        <span className="sr-only">
                                                                                                {showPassword ? "Hide password" : "Show password"}
                                                                                        </span>
                                                                                </Button>
                                                                        </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                        <FormField
                                                control={form.control}
                                                name="profile"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Profile Image</FormLabel>
                                                                <FormControl>
                                                                        <FileUpload
                                                                                value={field.value ?? null}
                                                                                onChange={field.onChange}
                                                                                error={form.formState.errors.profile?.message}
                                                                                className="h-32"
                                                                        />
                                                                </FormControl>
                                                                <FormMessage />
                                                        </FormItem>
                                                )}
                                        />
                                </div>
                                <Button variant="default" type="submit" className="w-full">
                                        {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create User"}
                                </Button>
                        </form>
                </Form>
        );
};

export default CreateUser;