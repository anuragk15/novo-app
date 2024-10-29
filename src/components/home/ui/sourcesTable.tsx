/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { deleteSource } from "@/api/functions/sources";
import { useParams } from "react-router-dom";
type Source = {
  id: string;
  title: string;
  url: string;
  type: string;
  createdAt: string;
  projectId: string;
};

export function SourcesTable({ sources }: { sources: Source[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState<Source | null>(null);
  const { projectId } = useParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { mutateAsync } = useMutation({
    mutationKey: ["delete", "source"],
    mutationFn: deleteSource,
    onMutate: () => {
      toast({
        title: "Deleting source...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "sources"] });
      toast({
        title: "Source deleted",
        description: "The source has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description:
          "Something went wrong. Please try again later or reach out to support via the chat button.",
      });
    },
  });
  const columns: ColumnDef<Source>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
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
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Created on</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {formatDate(new Date(row.getValue("createdAt")))}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button
                  onClick={() => setShowDetails(row.original)}
                  variant="ghost"
                  className="px-4"
                >
                  View
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this training document and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => performDelete([row.original.id])}
                      className="bg-red-500 text-white hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable<Source>({
    data: sources,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row, relativeIndex, parent) => {
      // In row object you have access to data.
      // You can choose parameter. In this example I used uniqueId
      return parent ? [parent.id, row.id].join(".") : row.id;
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  async function performDelete(ids: string[]) {
    await mutateAsync({
      sourceId: ids,
      projectId: projectId,
    });
    setRowSelection({});
  }

  return (
    <>
      <Dialog
        open={showDetails != null}
        onOpenChange={() => setShowDetails(null)}
      >
        <DialogContent>
          <div className="space-y-4">
            <p>Name: {showDetails?.title}</p>
            <p>Source: {showDetails?.url}</p>
            <p>
              Created at: {new Date(showDetails?.createdAt).toLocaleString()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between py-4 w-full">
        <Input
          placeholder="Search..."
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm focus-visible:border focus-visible:border-slate-50"
        />

        {Object.entries(rowSelection)?.length > 0 ? (
          <Button
            onClick={() => performDelete(Object.keys(rowSelection))}
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-600 hover:text-white"
          >
            <p>Delete</p>
          </Button>
        ) : null}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
