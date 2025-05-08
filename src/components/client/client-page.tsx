"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useClientsStore from "@/store/clients-store/get-clients-store";
import useDeleteClientStore from "@/store/clients-store/delete-client";
import useProjectsStore from "@/store/projects-store/get-projects-stores";
import { motion, AnimatePresence } from "framer-motion";
import ClientDetailsModal from "./details-modal";
import EditClientModal from "./edit-modal";
import DeleteClientModal from "./delete-modal";
import { toast } from "sonner";
import AddClientModal from "./client-add";

export type Client = {
  id: number;
  name: string;
  email: string;
  address: string;
  contact: string;
  contact_person: string;
  contact_number_person: string;
  project_id: { [key: string]: number };
  created_at: string;
};

export function ClientTable() {
  const { clients, isLoading, error, fetchClients } = useClientsStore();
  const { deleteClient } = useDeleteClientStore();
  const {
    projects,
    isLoading: projectsLoading,
    error: projectsError,
    fetchProjects,
  } = useProjectsStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [hasFetched, setHasFetched] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState<Client | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [pageIndex, setPageIndex] = React.useState(0); // Manage pageIndex
  const [pageSize, setPageSize] = React.useState(10); // Manage pageSize

  // Fetch clients and projects on mount
  React.useEffect(() => {
    if (!hasFetched && !isLoading && !clients) {
      fetchClients().then(() => {
        setHasFetched(true);
      });
    }
    if (!projects && !projectsLoading && !projectsError) {
      fetchProjects().catch(() => {
        toast.error("Failed to fetch projects");
      });
    }
  }, [
    fetchClients,
    hasFetched,
    isLoading,
    clients,
    fetchProjects,
    projects,
    projectsLoading,
    projectsError,
  ]);

  // Debug clients data
  React.useEffect(() => {
    console.log("Clients data:", clients, "Length:", clients?.length);
  }, [clients]);

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleSaveClient = (updatedClient: Client) => {
    toast.success("Saving client:", updatedClient);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (clientToDelete && clientToDelete.id) {
      try {
        const response = await deleteClient(clientToDelete.id);
        if (response.success) {
          toast.success(response.message || "Client deleted successfully");
          await fetchClients(); // Refresh the client list
          setIsDeleteModalOpen(false);
          setClientToDelete(null);
          setPageIndex(0); // Reset to first page after deletion
        } else {
          toast.error(response.message || "Failed to delete client");
        }
      } catch (err) {
        toast.error(`Error deleting client: ${err}`);
      }
    } else {
      toast.error("Invalid client ID");
    }
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const columns: ColumnDef<Client>[] = [
    {
      id: "serial",
      header: "S.N.",
      cell: ({ row }) => <div>{row.index + 1 + pageIndex * pageSize}</div>, // Adjust serial number for pagination
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const value = (row.getValue("name") as string) || "N/A";
        if (value.includes(" ")) {
          const parts = value.split(" ");
          return (
            <div className="flex flex-col gap-1">
              {parts.map((part, index) => (
                <div key={index} className="text-sm">
                  {part}
                </div>
              ))}
            </div>
          );
        }
        return <div>{value}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const value = (row.getValue("email") as string) || "N/A";
        if (value.includes(" ")) {
          const parts = value.split(" ");
          return (
            <div className="flex flex-col gap-1 lowercase">
              {parts.map((part, index) => (
                <div key={index} className="text-sm">
                  {part}
                </div>
              ))}
            </div>
          );
        }
        return <div className="lowercase">{value}</div>;
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const value = (row.getValue("address") as string) || "N/A";
        if (value.includes(" ")) {
          const parts = value.split(" ");
          return (
            <div className="flex flex-col gap-1">
              {parts.map((part, index) => (
                <div key={index} className="text-sm">
                  {part}
                </div>
              ))}
            </div>
          );
        }
        return <div>{value}</div>;
      },
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => {
        const value = (row.getValue("contact") as string) || "N/A";
        if (value.includes(" ")) {
          const parts = value.split(" ");
          return (
            <div className="flex flex-col gap-1">
              {parts.map((part, index) => (
                <div key={index} className="text-sm">
                  {part}
                </div>
              ))}
            </div>
          );
        }
        return <div>{value}</div>;
      },
    },
    {
      accessorKey: "contact_person",
      header: "Contact Person",
      cell: ({ row }) => {
        const value = (row.getValue("contact_person") as string) || "N/A";
        if (value.includes(" ")) {
          const parts = value.split(" ");
          return (
            <div className="flex flex-col gap-1">
              {parts.map((part, index) => (
                <div key={index} className="text-sm">
                  {part}
                </div>
              ))}
            </div>
          );
        }
        return <div>{value}</div>;
      },
    },
    {
      accessorKey: "contact_number_person",
      header: "Person Number",
      cell: ({ row }) => {
        const value =
          (row.getValue("contact_number_person") as string) || "N/A";
        if (value.includes(" ")) {
          const parts = value.split(" ");
          return (
            <div className="flex flex-col gap-1">
              {parts.map((part, index) => (
                <div key={index} className="text-sm">
                  {part}
                </div>
              ))}
            </div>
          );
        }
        return <div>{value}</div>;
      },
    },
    {
      accessorKey: "project_id",
      header: "Projects",
      cell: ({ row }) => {
        const projectIds = row.getValue("project_id") as {
          [key: string]: number;
        };
        if (projectsLoading) {
          return <div>Loading projects...</div>;
        }
        if (projectsError) {
          return <div className="text-red-500">Error loading projects</div>;
        }
        if (!projects || projects.length === 0) {
          return <div>No projects available</div>;
        }
        const projectNames = Object.values(projectIds).map(
          (id) =>
            projects.find((p: { id: number; title: string }) => p.id === id)
              ?.title || id.toString()
        );
        return (
          <div className="flex flex-col gap-1">
            {projectNames.length > 0
              ? projectNames.map((name, index) => (
                  <div key={index} className="text-sm">
                    {name}
                  </div>
                ))
              : "None"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dark:bg-gray-950 dark:text-white focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
              >
                <DropdownMenuLabel className="font-semibold text-gray-800 dark:text-gray-300">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleEditClient(row.original)}
                  className="text-green-600 cursor-pointer"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteClick(row.original)}
                  className="text-red-600 cursor-pointer"
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
    data: clients || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    rowCount: clients?.length || 0, // Provide total row count
  });

  const handleRowClick = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedClient(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="w-full max-w-full p-4 flex flex-col dark:text-white overflow-x-hidden box-sizing-border">
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex mb-4">
        <Button onClick={() => setIsAddModalOpen(true)}>Add Client</Button>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto max-w-sm pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:bg-gray-950 dark:text-white focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative max-h-[calc(100vh-200px)] overflow-x-auto overflow-y-auto rounded-md border focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm shadow-md dark:shadow-blue-400 text-gray-600 dark:text-gray-300 border-b border-gray-400/50 dark:border-gray-700">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
          <TableBody>
            <AnimatePresence mode="wait">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: -10 }}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {clients?.length || 0}{" "}
          rows
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              table.setPageSize(Number(e.target.value));
              setPageIndex(0); // Reset to first page when pageSize changes
            }}
            className="border rounded p-1"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <ClientDetailsModal
        client={selectedClient}
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
      />
      <EditClientModal
        client={selectedClient}
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSave={handleSaveClient}
        onUpdateSuccess={() => fetchClients()}
      />
      <DeleteClientModal
        client={clientToDelete}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
      />
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSuccess={() => fetchClients()}
      />
    </div>
  );
}
