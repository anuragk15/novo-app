import { Editor } from "@tiptap/core";
import html2pdf from "html-to-pdf-js";
import jsPDF from "jspdf";
import { CloudDownload, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Spinner } from "../spinner";
import { useToast } from "../use-toast";
export default function DocNavbar({
  editor,
  saving,
  name,
}: {
  editor: Editor;
  name: string;
  saving: boolean;
}) {
  const { projectId, id } = useParams();
  const { toast } = useToast();
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([editor.getText()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const downloadHtmlFile = () => {
    const element = document.createElement("a");
    const file = new Blob([editor.getHTML()], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.html`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const downloadJSONFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(editor.getJSON())], {
      type: "text/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const downloadPDFFile = () => {
    const element = document.createElement("body");
    element.innerHTML = editor.getHTML();
    const hrElements = element.querySelectorAll("hr");

    // Loop through the NodeList and remove each <hr>
    hrElements.forEach((hr) => hr.remove());
    html2pdf({ name: name }).from(element).save();
    const doc = new jsPDF("p", "pt", "a4");
    element.style.width = "768px";
    doc.html(element, {
      callback: (res) => {
        res.save(`${name}.pdf`);
      },
      autoPaging: "text", // Crucial for handling text flow across pages
      html2canvas: {
        allowTaint: true,
        letterRendering: true,
        logging: false,
        scale: 0.5, // Adjust the scale to fit content
      },
    });
  };
  return (
    <div className="flex items-center gap-1">
      {saving ? (
        <div className="text-sm flex items-center gap-1 px-2">
          <Spinner size="small" className="text-slate-500" />
          <p className="text-sm text-slate-600">Saving...</p>
        </div>
      ) : (
        <div className="text-sm text-slate-500 px-2">Saved</div>
      )}
      {/* <SettingsPopup /> */}

      <div
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}/document/editor/${projectId}/${id}`
          );
          toast({
            title: "✨  Link copied!",
            description:
              "You’ve got the magic link—now go inspire some readers!",
          });
        }}
        className="  p-3  cursor-pointer rounded-lg  hover:bg-slate-200 flex gap-2 items-center"
      >
        <Share2 size={16} className="text-slate-600" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            className="text-xs flex hover:bg-slate-200 text-slate-600 gap-2 items-center"
          >
            <CloudDownload size={16} />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-100">
          <DropdownMenuLabel asChild>
            <div
              onClick={downloadHtmlFile}
              className="p-8  cursor-pointer  hover:bg-slate-200 rounded-lg"
            >
              <p className=" text-md font-normal">HTML</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel asChild>
            <div
              onClick={downloadTxtFile}
              className="p-8  cursor-pointer  hover:bg-slate-200 rounded-lg"
            >
              <p className=" text-md font-normal">Text</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel asChild>
            <div
              onClick={downloadPDFFile}
              className="p-8  cursor-pointer  hover:bg-slate-200 rounded-lg"
            >
              <p className=" text-md font-normal">PDF</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel asChild>
            <div
              onClick={downloadJSONFile}
              className="p-8  cursor-pointer  hover:bg-slate-200 rounded-lg"
            >
              <p className=" text-md font-normal">JSON</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
