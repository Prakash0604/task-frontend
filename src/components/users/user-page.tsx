"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
        Table,
        TableHeader,
        TableBody,
        TableRow,
        TableHead,
        TableCell,
} from "@/components/ui/table"
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
        DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import useUsersStore from "@/store/user-store/get-user-store"
import { Skeleton } from "../ui/skeleton"
import { formatDateToReadable } from "@/utlis"
import Container from "../containers/main-container"
import NoDataExample from "../no-data/no-data"

type User = {
        id: number
        name: string
        email: string
        contact: string
        address: string
        created_at: string
        status: string
}

const columns: ColumnDef<User>[] = [
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
                cell: ({ row }) => row.getValue("contact"),
        },
        {
                accessorKey: "address",
                header: "Address",
                cell: ({ row }) => (
                        <div className="truncate max-w-[200px]">{row.getValue("address")}</div>
                ),
        },
        {
                accessorKey: "created_at",
                header: "Registered On",
                cell: ({ row }) =>
                        formatDateToReadable(row.getValue("created_at")),
        },
        {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => row.getValue("status"),
        },
        {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                        const user = row.original
                        return (
                                <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="border-none hover:border-none " >
                                                <Button variant="trans" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[var(--taskmandu-background)] dark:bg-gray-900 shadow-md dark:shadow-blue-400 border border-gray-400/80 dark:border-gray-700">
                                                <DropdownMenuLabel className="font-semibold text-gray-800 dark:text-gray-300">Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => console.log("Edit", user.id)} className="text-green-600">
                                                        Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                        onClick={() => console.log("Delete", user.id)}
                                                        className="text-red-600"
                                                >
                                                        Delete
                                                </DropdownMenuItem>
                                        </DropdownMenuContent>
                                </DropdownMenu>
                        )
                },
        },
]

export default function UserList() {
        const [sorting, setSorting] = React.useState<SortingState>([])
        const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
        const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
        const [rowSelection, setRowSelection] = React.useState({})
        const { users, fetchUsers, isLoading } = useUsersStore()

        React.useEffect(() => {
                if (!users || users.length === 0) {
                        fetchUsers()
                }
        }, [users, fetchUsers])

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
        })

        if (isLoading) return <Skeleton className="h-screen w-full" />

        return (
                <Container className="w-full  lg:px-12 px-8">
                        <Container className="flex items-center py-4">
                                <Input
                                        placeholder="Filter by name..."
                                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                        onChange={(e) =>
                                                table.getColumn("name")?.setFilterValue(e.target.value)
                                        }
                                        className="max-w-sm  border border-gray-400/80 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-300 text-gray-600 dark:text-gray-200 focus:ring-0 focus:ring-[var(--taskmandu-primary)] shadow-md dark:shadow-blue-400"
                                />
                                <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="ml-auto shadow-lg dark:shadow-blue-400 border border-gray-400/80 dark:border-gray-700 text-gray-600 dark:text-gray-200 text-sm font-semibold ">
                                                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-400/80 dark:border-gray-700 shadow-lg dark:shadow-blue-400">
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
                        </Container>
                        <Container className="rounded-sm border border-gray-400/50 dark:border-gray-700 shadow-lg dark:shadow-blue-400">
                                <Table>
                                        <TableHeader className="text-gray-600 dark:text-gray-300 border-b border-gray-400/50 dark:border-gray-700">
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                        <TableRow key={headerGroup.id} className="border-b border-gray-400/50 dark:border-gray-700">
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
                                                {table.getRowModel().rows.length ? (
                                                        table.getRowModel().rows.map((row) => (
                                                                <TableRow key={row.id} className="text-gray-600 dark:text-gray-300 font-normal">
                                                                        {row.getVisibleCells().map((cell) => (
                                                                                <TableCell key={cell.id} className="border-b border-gray-400/50 dark:border-gray-700">
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
                                                                <TableCell colSpan={columns.length} className="text-center text-white py-8 shadow-lg dark:shadow-blue-400">
                                                                        <NoDataExample />
                                                                </TableCell>
                                                        </TableRow>
                                                )}
                                        </TableBody>
                                </Table>
                        </Container>
                        <Container className="flex items-center justify-end space-x-2 py-4 rounded-b-md px-4 dark:shadow-lg dark:shadow-blue-400">
                                <Container className="space-x-4">
                                        <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                                className="border border-gray-400/80 shadow-lg dark:shadow-blue-400 dark:border-gray-700 text-gray-900 dark:text-gray-300 cursor-pointer"
                                        >
                                                Previous
                                        </Button>
                                        <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                                className="border border-gray-400/80 shadow-lg dark:shadow-blue-400 dark:border-gray-700 text-gray-900 dark:text-gray-300 cursor-pointer"
                                        >
                                                Next
                                        </Button>
                                </Container>
                        </Container>
                </Container>
        )
}
