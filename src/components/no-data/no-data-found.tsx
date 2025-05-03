import { FileX } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoDataFoundProps {
        title?: string;
        message?: string;
        icon?: React.ReactNode;
        className?: string;
}

const NoDataFound = ({
        title = "No Data Found",
        message = "We couldn't find any data to display at this moment.",
        icon,
        className,
}: NoDataFoundProps) => {
        return (
                <div
                        className={cn(
                                "flex flex-col items-center justify-center w-full p-8 rounded-lg border border-gray-400  dark:border-gray-500 border-dashed ",
                                "bg-muted/30 text-center min-h-[200px] space-y-4",
                                className
                        )}
                >
                        <div className="rounded-full  bg-muted p-4 w-16 h-16 flex items-center justify-center">
                                {icon || <FileX className="h-8 w-8 text-muted-foreground" />}
                        </div>

                        <div className="space-y-2 max-w-md">
                                <h3 className="text-xl font-medium dark:text-gray-300 text-gray-500">{title}</h3>
                                <p className="text-muted-foreground dark:text-gray-300 text-gray-500 text-sm sm:text-base">{message}</p>
                        </div>
                </div>
        );
};

export default NoDataFound;