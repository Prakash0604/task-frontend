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
                                        <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                        onClick={() => navigator.clipboard.writeText(user.id.toString())}
                                                >
                                                        Copy User ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => console.log("Edit", user.id)}>
                                                        Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                        onClick={() => console.log("Delete", user.id)}
                                                        className="text-red-500"
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
                <div className="w-full bg-white">
                        <div className="flex items-center py-4">
                                <Input
                                        placeholder="Filter by name..."
                                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                        onChange={(e) =>
                                                table.getColumn("name")?.setFilterValue(e.target.value)
                                        }
                                        className="max-w-sm"
                                />
                                <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="ml-auto">
                                                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
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
                        </div>
                        <div className="rounded-md border">
                                <Table>
                                        <TableHeader>
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
                                                {table.getRowModel().rows.length ? (
                                                        table.getRowModel().rows.map((row) => (
                                                                <TableRow key={row.id}>
                                                                        {row.getVisibleCells().map((cell) => (
                                                                                <TableCell key={cell.id}>
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
                                                                <TableCell colSpan={columns.length} className="text-center py-8">
                                                                        No results.
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
                </div>
        )
}
