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
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from Shadcn
import useProjectsStore from "@/store/projects-store/get-projects-stores";
import ProjectDetailsModal from "./projectDetailsModal";
import EditProjectModal from "./edit-project-modal";
import { Project } from "@/lib/type";

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "serial",
    header: "S.N",
    cell: ({ row }) => <div>{row.index + 1}</div>,
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
        Project Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Create Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("createDate")
          ? new Date(row.getValue("createDate")).toLocaleDateString()
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue("description")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const project = row.original;
      const { handleEdit, handleDelete } = table.options.meta as {
        handleEdit: (id: number, e: React.MouseEvent) => void;
        handleDelete: (id: number, e: React.MouseEvent) => void;
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:bg-gray-950 dark:text-white"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={(e) => handleEdit(project.id, e)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => handleDelete(project.id, e)}
              className="text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ProjectsDataTable() {
  const { fetchProjects, deleteProject } = useProjectsStore();
  const [data, setData] = React.useState<Project[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [projectToEdit, setProjectToEdit] = React.useState<Project | null>(
    null
  );

  // Fetch projects from API
  React.useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProjects();
        if (response.success) {
          const transformed: Project[] = response.data.map((item) => ({
            id: item.id,
            name: item.title,
            createDate: item.created_at,
            description: item.description || "No description available",
          }));
          setData(transformed);
        } else {
          alert("Failed to fetch projects");
        }
      } catch {
        alert("An error occurred while fetching projects");
      }
      setIsLoading(false);
    };
    loadProjects();
  }, [fetchProjects]);

  // Handle row click to open details modal
  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle edit action
  const handleEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const project = data.find((p) => p.id === id);
    if (project) {
      setProjectToEdit(project);
      setEditModalOpen(true);
    }
  };

  // Handle delete action
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const success = await deleteProject(id);
    if (success) {
      setData((prev) => prev.filter((project) => project.id !== id));
    } else {
      alert("Failed to delete project");
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      handleEdit,
      handleDelete,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">Projects Management</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter project names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="dark:text-white dark:bg-gray-950"
          >
            <Button
              variant="outline"
              className="ml-auto bg-white dark:bg-gray-800"
            >
              Hide Columns
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:bg-gray-950 dark:text-white"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize dark:text-white dark:bg-gray-950"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border-r text-center">
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
            {isLoading ? (
              // Skeleton loader for loading state
              Array(5) // Show 5 skeleton rows
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="border-r">
                      <Skeleton className="h-6 w-6" />
                    </TableCell>
                    <TableCell className="border-r">
                      <Skeleton className="h-6 w-12" />
                    </TableCell>
                    <TableCell className="border-r">
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell className="border-r">
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell className="border-r">
                      <Skeleton className="h-6 w-48" />
                    </TableCell>
                    <TableCell className="border-r">
                      <Skeleton className="h-6 w-8" />
                    </TableCell>
                  </TableRow>
                ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditProjectModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={projectToEdit}
        onUpdateSuccess={() => {
          setEditModalOpen(false);
          const loadProjects = async () => {
            setIsLoading(true);
            try {
              const response = await fetchProjects();
              if (response.success) {
                const transformed: Project[] = response.data.map((item) => ({
                  id: item.id,
                  name: item.title,
                  createDate: item.created_at,
                  description: item.description || "No description available",
                }));
                setData(transformed);
              }
            } catch {
              alert("An error occurred while fetching projects");
            }
            setIsLoading(false);
          };
          loadProjects();
        }}
      />
    </div>
  );
}
