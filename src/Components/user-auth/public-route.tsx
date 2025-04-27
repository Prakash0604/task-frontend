import { getUser } from "@/utlis";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface PublicRouteProps {
        children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
        const router = useRouter();
        const [checked, setChecked] = useState<boolean>(false);
        const token = getUser();
        if (token && !checked) {
                router.push("/dashboard");
                setChecked(true);
                return null;
        }
        return <>{children}</>;
};

export default PublicRoute;