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
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// const data: Competitors[] = [
//   {
//     id: 1,
//     name: "Webflow",
//     size: "Large",
//     link: "https://webflow.com",
//   },
//   {
//     id: 2,
//     name: "Wix",
//     size: "Medium",
//     link: "https://wix.com",
//   },
//   {
//     id: 3,
//     name: "Carrd",
//     size: "Small",
//     link: "https://carrd.com",
//   },
// ];

export type Competitors = {
  id: number;
  url: string;
  size: string;
  name: string;
};

export const columns: ColumnDef<Competitors>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        defaultChecked={true}
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : true
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        defaultChecked={true}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => (
      <div className="text-left font-sans  ">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "size",
    header: () => (
      <div className="text-center hidden md:block">Audience Size</div>
    ),
    cell: ({ row }) => {
      const v: string = row.getValue("size");

      return (
        <div
          className={cn(
            "text-center hidden md:block font-sans p-2 bg-slate-100 max-w-fit mx-auto border rounded-lg"
          )}
        >
          {v}
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: () => <div className="text-right">Website</div>,
    cell: ({ row }) => {
      return (
        <div className=" flex justify-end">
          <Button
            variant="ghost"
            onClick={() => {
              window.open(row.getValue("url"), "_blank");
            }}
          >
            Visit
          </Button>
        </div>
      );
    },
  },
];

export function CompetitorsTable({
  data,
  setCompetitors,
}: {
  data: Competitors[];
  setCompetitors: (data) => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState(
    data.reduce((acc, obj) => {
      acc[obj.id] = true;
      return acc;
    }, {})
  );

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

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    console.log(rowSelection);
    const t = table.getFilteredSelectedRowModel().rows.map((row) => {
      return row.original.url;
    });

    console.log(t);
    setCompetitors(t);
  }, [rowSelection]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="space-x-2">
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
      </div> */}

      <div className="flex items-center w-full justify-end space-x-2 py-4 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
