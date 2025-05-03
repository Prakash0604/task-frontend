import { SearchX } from "lucide-react";
import NoDataFound from "./no-data-found";
import Container from "../containers/main-container";

const NoDataExample = () => {
        return (
                <Container className=" py-12 px-4">
                        <Container className="w-full">
                                <Container className=" flex gap-8 mb-8 w-full">
                                        <Container className="bg-card rounded-lg p-6  w-full">
                                                <NoDataFound
                                                        title="No Results"
                                                        message="Your search didn't return any results. Try adjusting your filters or search terms."
                                                        icon={<SearchX className="h-8 w-8 text-muted-foreground dark:text-gray-300 text-gray-500" />}
                                                />
                                        </Container>
                                </Container>


                        </Container>
                </Container>
        );
};

export default NoDataExample;