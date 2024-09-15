import { Editor } from "@tiptap/core";
import { ChevronLeftIcon, CloudDownload, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../button";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Spinner } from "../spinner";
import html2pdf from "html-to-pdf-js";
import jsPDF from "jspdf";
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
  const navigate = useNavigate();
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
    <div className=" flex justify-between items-center py-2 w-full max-w-[1280px] mx-auto">
      <div>
        <Button
          variant="ghost"
          onClick={() => {
            navigate(`/project/${projectId}`);
          }}
          className="flex gap-2 items-center "
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {saving ? (
          <div className="text-sm flex gap-2">
            <Spinner size="small" />
            <p className="text-sm">Saving...</p>
          </div>
        ) : (
          <div className="text-sm text-slate-500">Saved</div>
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
          className="  p-3  cursor-pointer rounded-lg  hover:bg-slate-100 flex gap-2 items-center"
        >
          <Share2 size={16} />
        </div>

        <Dialog>
          <DialogTrigger>
            <Button className=" font-mono flex gap-2 items-center">
              <CloudDownload size={14} />
              Export
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="bg-white">
              <h1 className="pb-5 font-medium">
                Download it in a format you prefer:
              </h1>
              <div className="flex items-center gap-2 justify-evenly rounded-lg ">
                <div
                  onClick={downloadHtmlFile}
                  className="p-8 border cursor-pointer bg-slate-50 hover:bg-slate-200 rounded-xl"
                >
                  <p>HTML</p>
                </div>
                <div
                  onClick={downloadPDFFile}
                  className="p-8 border cursor-pointer bg-slate-50 hover:bg-slate-200 rounded-xl"
                >
                  <p>PDF</p>
                </div>
                <div
                  onClick={downloadJSONFile}
                  className="p-8 border cursor-pointer bg-slate-50 hover:bg-slate-200 rounded-xl"
                >
                  <p>JSON</p>
                </div>
                <div
                  onClick={downloadTxtFile}
                  className="p-8 border cursor-pointer bg-slate-50 hover:bg-slate-200 rounded-xl"
                >
                  <p>Text</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
