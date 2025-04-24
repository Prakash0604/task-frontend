import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

// Zod schema for form validation
const formSchema = z.object({
  label: z.string().min(1, "Label is required"),
  assignees: z.array(z.string()).min(1, "At least one assignee is required"),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  description: z.string().min(1, "Description is required"),
  comment: z.string().min(1, "Comment is required"),
});

// User list for assignees and mentions
const users = [
  { id: "1", name: "Candice Wu", username: "CandiceWu" },
  { id: "2", name: "Camilla Cindy", username: "CamillaCindy" },
  { id: "3", name: "Carter Reece", username: "CarterReece" },
  { id: "4", name: "Carter Reece", username: "Car" },
  { id: "5", name: "Carter Reece", username: "CarterR" },
];

type FormValues = z.infer<typeof formSchema>;

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionPosition, setMentionPosition] = useState(0);
  const [open, setOpen] = useState(false); // For assignee dropdown

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      assignees: [],
      status: "",
      priority: "",
      description: "",
      comment: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setComments((prev) => [...prev, values.comment]);
    form.reset();
    onClose();
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (value: string) => void
  ) => {
    const value = e.target.value;
    onChange(value);

    if (value.slice(-1) === "@") {
      setShowMentionDropdown(true);
      setMentionPosition(value.length);
    } else {
      setShowMentionDropdown(false);
    }
  };

  const handleMentionSelect = (
    username: string,
    onChange: (value: string) => void,
    currentValue: string
  ) => {
    const newValue = currentValue.slice(0, mentionPosition) + username + " ";
    onChange(newValue);
    setShowMentionDropdown(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Label and Assignee in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Label */}
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700 dark:text-gray-200">
                    Label
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter label"
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Assignee */}
            <FormField
              control={form.control}
              name="assignees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700 dark:text-gray-200">
                    Assignee
                  </FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full h-auto min-h-[38px] justify-between bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                        >
                          <div className="flex flex-col gap-1 truncate">
                            {field.value.length > 0 ? (
                              field.value.map((username) => {
                                const user = users.find(
                                  (user) => user.username === username
                                );
                                return (
                                  <span key={username} className="truncate">
                                    {user?.name || username}
                                  </span>
                                );
                              })
                            ) : (
                              <span>Select assignees</span>
                            )}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <Command>
                          <CommandInput
                            placeholder="Search users..."
                            className="dark:bg-gray-800 dark:text-gray-100"
                          />
                          <CommandEmpty className="text-gray-500 dark:text-gray-400">
                            No users found.
                          </CommandEmpty>
                          <CommandGroup>
                            {users.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.username}
                                onSelect={(currentValue) => {
                                  const newValue = field.value.includes(
                                    currentValue
                                  )
                                    ? field.value.filter(
                                        (val) => val !== currentValue
                                      )
                                    : [...field.value, currentValue];
                                  field.onChange(newValue);
                                }}
                                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(user.username)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {user.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Status and Priority in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700 dark:text-gray-200">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600",
                          field.value === "Next Up" &&
                            "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        )}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="In Review">In Review</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Backlog">Backlog</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700 dark:text-gray-200">
                    Priority
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={cn(
                          "w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600",
                          field.value === "High" &&
                            "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        )}
                      >
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700 dark:text-gray-200">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    rows={2}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />

          {/* Comments */}
          <div>
            <FormLabel className="font-bold text-gray-700 dark:text-gray-200">
              Comments ({comments.length})
            </FormLabel>
            <div className="relative mt-2">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                        rows={2}
                        onChange={(e) => handleCommentChange(e, field.onChange)}
                      />
                    </FormControl>
                    {showMentionDropdown && (
                      <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100"
                            onClick={() =>
                              handleMentionSelect(
                                `@${user.username}`,
                                field.onChange,
                                field.value
                              )
                            }
                          >
                            {user.name}
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Previous Comments */}
            {comments.length > 0 && (
              <div className="mt-4 space-y-2">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100"
                  >
                    {comment}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                Publish
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
