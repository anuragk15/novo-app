import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <Table>
      <TableBody>
        {files.map((invoice,id) => (
          <TableRow
            onClick={() => {
              navigate("/document/editor/2");
            }}
            className=" cursor-pointer"
            key={id}
          >
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
                        description:
                          "You’ve got the magic link—now go inspire some readers!",
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
