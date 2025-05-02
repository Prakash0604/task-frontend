export function formatDateToReadable(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
                month: "short",   // "Jun"
                day: "numeric",   // "2"
                year: "numeric",  // "2025"
        });
}
