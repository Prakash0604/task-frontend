import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/Form/login-form";
const LoginPage: React.FC = () => {
  return (
    <div className="flex max-h-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <Image
          src="/task.jpg"
          alt="Login background"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
