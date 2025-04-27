import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button'; // Assuming you are using ShadCN components
import { Input } from '../ui/input';
import { loginSchema } from '@/utlis';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import useLoginStore from '@/store/login-store/login-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Container from '../containers/main-container';
type LoginFormInputs = z.infer<typeof loginSchema>;
const LoginForm = () => {
        const [showPassword, setShowPassword] = useState<boolean>(false);
        const { login, isLoading, error: errMessage } = useLoginStore()
        const router = useRouter()
        const {
                register,
                handleSubmit,
                formState: { errors },
                reset,
        } = useForm<LoginFormInputs>({
                resolver: zodResolver(loginSchema),
        });
        const onSubmit = async (data: LoginFormInputs) => {
                try {
                        const response = await login(data.email, data.password);
                        if (response.status) {
                                toast.success("Login successful", {
                                        description: `Welcome, ${response.data.name || 'User'}!`,
                                        style: { backgroundColor: "#ffffff", color: "#4CAF50" },
                                        descriptionClassName: "text-green-600 font-medium",
                                });
                                router.push('/dashboard');
                                reset();
                        } else {
                                toast.error("Login failed", {
                                        description: response.message || "Invalid email or password",
                                        style: { backgroundColor: "#ffffff", color: "red" },
                                });
                        }
                } catch (error) {
                        toast.error("Error!", {
                                description: "Login failed.",
                                style: { backgroundColor: "#fffff", color: "red" },
                        });
                        throw new Error("Failed to login", error as Error)

                }
        };

        return (
                <Container className="flex min-h-screen md:w-[35%] w-[100%] items-center  bg-gray-100   px-8">
                        <Container className="flex items-center justify-center p-8 bg-white shadow-lg rounded-lg w-full border  border-gray-200">
                                <Container className="w-full space-y-6">
                                        <h2 className="text-2xl font-bold text-center text-[var(--taskmandu-primary)]">Welcome to Taskmandu</h2>
                                        <p className='text-red-600'>{errMessage}</p>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                                {/* Email Input */}
                                                <Container>
                                                        <label htmlFor="email" className="block text-sm font-medium text-taskmandu-primary-text">
                                                                Email
                                                        </label>
                                                        <Input
                                                                id="email"
                                                                type="email"
                                                                placeholder="Enter your email"
                                                                {...register('email')}
                                                                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                                        />
                                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                                </Container>

                                                {/* Password Input */}
                                                <Container>
                                                        <label htmlFor="password" className="block text-sm font-medium text-[var(--taskmandu-primary-text)]">
                                                                Password
                                                        </label>
                                                        <Container className="relative">
                                                                <Input
                                                                        id="password"
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        placeholder="Enter your password"
                                                                        {...register('password')}
                                                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                                                                />
                                                                <Button
                                                                        type="button"
                                                                        variant={'trans'}
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                                                                >
                                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                                </Button>
                                                        </Container>
                                                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                                </Container>

                                                {/* Submit Button */}
                                                <Container>
                                                        <Button type="submit" className="w-full bg-[var(--taskmandu-primary)] text-white hover:bg-[var(--taskmandu-primary)]">
                                                                {isLoading ? <Loader2 /> : "Login"}
                                                        </Button>
                                                </Container>
                                        </form>
                                </Container>
                        </Container>
                </Container>
        );
};

export default LoginForm;
