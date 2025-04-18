import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
// import { Task } from "@/lib/validations/type";

// Define Zod schema for form validation
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  status: z.enum(["To Do", "In Progress", "In Review", "Completed", "Backlog"]),
  assignedUsers: z
    .array(z.string())
    .min(1, "At least one user must be assigned"),
  priority: z.enum(["Low", "Medium", "High", "Delayed"]),
});

// Mock list of users (replace with your actual user data)
const availableUsers = [
  "Alice Smith",
  "Bob Johnson",
  "Charlie Brown",
  "Diana Prince",
  "Evan Davis",
];

interface AddTaskFormProps {
  onClose: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose }) => {
  // Initialize react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      assignedUsers: [],
      priority: "Medium",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would dispatch an action or call an API to save the task
    console.log(values);
    onClose(); // Close the modal after submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description"
                  {...field}
                  className="w-full"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Assigned Users (Multi-select) */}
        <FormField
          control={form.control}
          name="assignedUsers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Users</FormLabel>
              <Select
                onValueChange={(value) => {
                  // Handle multi-select by updating the array
                  const currentUsers = field.value;
                  if (currentUsers.includes(value)) {
                    field.onChange(
                      currentUsers.filter((user) => user !== value)
                    );
                  } else {
                    field.onChange([...currentUsers, value]);
                  }
                }}
                value={""} // Reset value to allow multiple selections
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select users" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user} {field.value.includes(user) ? "✓" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 flex flex-wrap gap-2">
                {field.value.map((user) => (
                  <span
                    key={user}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {user}
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange(field.value.filter((u) => u !== user))
                      }
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Add Task
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTaskForm;
