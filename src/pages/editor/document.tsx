import { getDocumentById } from "@/api/functions/documents";
import EditorFn from "@/components/ui/editor";
import { ToC } from "@/components/ui/EditorElements/Contents";
import DocNavbar from "@/components/ui/EditorElements/Navbar";
import LoadingState from "@/components/ui/loadingState";
import { myExtensions } from "@/lib/editor";
import { useQuery } from "@tanstack/react-query";
import { useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// import { Spinner } from "@/components/ui/spinner";

// const MemorizedToC = memo(ToC);

export default function DocumentEditorScreen() {
  const { projectId, id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["get", "document", id],
    queryFn: async () => {
      const res = await getDocumentById({ projectId, documentId: id });
      return res?.data;
    },
  });

  const editor = useEditor({
    extensions: [
      ...myExtensions,
      // SlashCommandExtension.configure({
      //   onSlashEnter: () => {
      //     // Logic to show your input field
      //     // alert("Slash command activated!");
      //     const { from, to } = editor.state.selection;
      //     console.log(from, to);
      //     editor.chain().focus().setAISuggestion({
      //       previousText: "This is a previous text",
      //       newText: "this is a new text",
      //     });
      //   },
      // }),
    ],
    // content: mkdown,
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      editor.commands.setContent(data?.content?.content);
    }
  }, [data, editor]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className=" bg-slate-50">
      <div className=" flex flex-col  md:px-2">
        <DocNavbar editor={editor} />

        <div className="flex gap-2 max-w-[1280px] mx-auto">
          <ToC editor={editor} />
          <EditorFn editor={editor} />
        </div>
      </div>
    </div>
  );
}
