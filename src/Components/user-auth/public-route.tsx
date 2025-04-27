import { getUser } from "@/utlis";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface PublicRouteProps {
        children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
        const router = useRouter();
        const token = getUser();

        useEffect(() => {
                if (token) {
                        router.push("/dashboard");
                }
        }, [token, router]);

        if (token) {
                return null;
        }

        return <>{children}</>;
};

export default PublicRoute;