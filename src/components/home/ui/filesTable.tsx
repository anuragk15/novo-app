import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

export function FilesTable() {
  const { toast } = useToast();

  return (
    <Table>
      <TableBody>
        {files.map((invoice) => (
          <TableRow className=" cursor-pointer" key={invoice.name}>
            <TableCell>{invoice.name}</TableCell>
            <TableCell className="font-normal">{invoice.createdBy}</TableCell>
            <TableCell className="font-light text-right">
              Edited{" "}
              {invoice.createdAt.toLocaleDateString() +
                " " +
                invoice.createdAt.toLocaleTimeString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2">
                  <EllipsisVertical size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      toast({
                        title: "✨  Link copied!",
                        description: "You’ve got the magic link—now go inspire some readers!",
                      });
                    }}
                  >
                    Share
                  </DropdownMenuItem>
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
