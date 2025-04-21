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
    setComments((prev) => [...prev, values.comment]); // Store comments locally for display
    form.reset(); // Reset the form
    onClose(); // Close the modal
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">UI Animation</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Label */}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-24 font-bold">Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter label"
                    className="flex-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assignee */}
          <FormField
            control={form.control}
            name="assignees"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-24 font-bold">Assignee</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="flex-1 justify-between"
                      >
                        {field.value.length > 0
                          ? field.value
                              .map(
                                (username) =>
                                  users.find(
                                    (user) => user.username === username
                                  )?.name
                              )
                              .join(", ")
                          : "Select assignees"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandEmpty>No users found.</CommandEmpty>
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
                                // Do not close the dropdown to allow multiple selections
                              }}
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-24 font-bold">Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`flex-1 ${
                        field.value === "Next Up"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="In Review">In Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Backlog">Backlog</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-24 font-bold">Priority</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`flex-1 ${
                        field.value === "High" ? "bg-red-100 text-red-800" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
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
              <FormItem className="flex items-start space-x-4">
                <FormLabel className="w-24 font-bold pt-2">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="flex-1" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comments */}
          <div>
            <div className="flex items-center space-x-4">
              <FormLabel className="w-24 font-bold">
                Comments ({comments.length})
              </FormLabel>
              <div className="flex-1 relative">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="flex-1"
                          rows={2}
                          onChange={(e) =>
                            handleCommentChange(e, field.onChange)
                          }
                        />
                      </FormControl>
                      {showMentionDropdown && (
                        <div className="absolute bg-white border rounded shadow-md mt-1 max-h-40 overflow-y-auto">
                          {users.map((user) => (
                            <div
                              key={user.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Previous Comments */}
            {comments.length > 0 && (
              <div className="mt-4 space-y-2">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-sm"
                  >
                    {comment}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button type="submit">Publish</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
