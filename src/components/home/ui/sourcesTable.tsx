import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
const files = [
  {
    name: "Marketing copy of Tap to pay",
    createdAt: new Date(),
    createdBy: "John Doe",
  },
  {
    name: "PRD of Tap to pay",
    createdAt: new Date(),
    createdBy: "John Doe",
  },
  {
    name: "Validation documentation",
    createdAt: new Date(),
    createdBy: "John Doe",
  },
];

export function SourcesTable() {
  return (
    <Table>
      <TableBody>
        {files.map((item) => (
          <TableRow className=" cursor-pointer" key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell className="font-normal">{item.createdBy}</TableCell>
            <TableCell className="font-light text-right">
              {item.createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2">
                  <EllipsisVertical size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
