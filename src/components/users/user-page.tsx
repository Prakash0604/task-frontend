import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import useUsersStore from "@/store/user-store/get-user-store";
import { Skeleton } from "../ui/skeleton";
import { formatDateToReadable } from "@/utlis";
import NoDataExample from "../no-data/no-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import UserDetailsModal from "./user-details-modal";
import EditUserModal from "./edit-modal";
import DeleteUserModal from "./delete-modal";
import { toast } from "sonner";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  profile: string | null;
  contact: string;
  address: string;
  created_at: string;
  updated_at: string;
  is_verified: string;
  office_status: string | null;
  status: string;
}

const bucketUrl: string = process.env.NEXT_PUBLIC_API_URL || "";

export default function UserList() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [editUser, setEditUser] = React.useState<User | null>(null);
  const [deleteUser, setDeleteUser] = React.useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const { users, fetchUsers, isLoading } = useUsersStore();

  React.useEffect(() => {
    if (!users || users.length === 0) {
      fetchUsers();
    }
  }, [users, fetchUsers]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "profile",
      header: "Profile Image",
      cell: ({ row }) => {
        const profilePath = row.getValue("profile") as string;
        const fullProfileUrl = profilePath?.startsWith("http")
          ? profilePath
          : `${bucketUrl}/${profilePath}`;
        return (
          <div className="flex justify-center">
            {profilePath ? (
              <Image
                height={20}
                width={20}
                src={fullProfileUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">N/A</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => row.getValue("contact") || "N/A",
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="truncate max-w-[200px]">
          {row.getValue("address") || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Registered On",
      cell: ({ row }) =>
        row.getValue("created_at")
          ? formatDateToReadable(row.getValue("created_at"))
          : "N/A",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => row.getValue("status") || "N/A",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="border-none hover:border-none"
              >
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[var(--taskmandu-background)] dark:bg-gray-900 shadow-md dark:shadow-blue-400 border border-gray-400/80 dark:border-gray-700"
              >
                <DropdownMenuLabel className="font-semibold text-gray-800 dark:text-gray-300">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setEditUser(user);
                    setIsEditModalOpen(true);
                  }}
                  className="text-green-600"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setDeleteUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditUser(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteUser(null);
  };

  if (isLoading) return <Skeleton className="h-screen w-full" />;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      }}
      className="w-full lg:px-12 px-8"
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, y: 0 } }}
        className="flex items-center py-4"
      >
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm border border-gray-400/80 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-300 text-gray-600 dark:text-gray-200 focus:ring-0 focus:ring-[var(--taskmandu-primary)]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200 text-sm font-semibold "
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-400/80 dark:border-gray-700 "
          >
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(v) => col.toggleVisibility(!!v)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.98 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" },
          },
        }}
        className="rounded-sm border border-gray-400/50 dark:border-gray-700"
      >
        <Table>
          <TableHeader className="text-gray-600 dark:text-gray-300 border-b border-gray-400/50 dark:border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-400/50 dark:border-gray-700"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <AnimatePresence mode="wait">
            <motion.tbody
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05 } },
              }}
              initial="hidden"
              animate="show"
              key={
                table.getRowModel().rows.length +
                sorting.length +
                JSON.stringify(columnFilters)
              }
            >
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    className="text-gray-600 dark:text-gray-300 font-normal cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    custom={index}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <motion.td
                        key={cell.id}
                        className="py-4 px-4 border-b border-gray-400/50 dark:border-gray-700"
                        whileHover={{
                          backgroundColor: "rgba(0,0,0,0.02)",
                          transition: { duration: 0.1 },
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </motion.td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.td
                    colSpan={columns.length}
                    className="text-center text-white py-8 shadow-lg dark:shadow-blue-400"
                  >
                    <NoDataExample />
                  </motion.td>
                </motion.tr>
              )}
            </motion.tbody>
          </AnimatePresence>
        </Table>
      </motion.div>
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
      <EditUserModal
        user={editUser}
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
      <DeleteUserModal
        user={deleteUser}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDeleteSuccess={() => {
          fetchUsers();
          toast.success("User deleted successfully");
        }}
      />
    </motion.div>
  );
}
