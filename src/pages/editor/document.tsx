/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getDocumentById, updateDocument } from "@/api/functions/documents";
import EditorFn from "@/components/ui/editor";
import { ToC } from "@/components/ui/EditorElements/Contents";
import DocNavbar from "@/components/ui/EditorElements/Navbar";
import LoadingState from "@/components/ui/loadingState";
import { useToast } from "@/components/ui/use-toast";
import { myExtensions } from "@/lib/editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// import { Spinner } from "@/components/ui/spinner";

// const MemorizedToC = memo(ToC);

export default function DocumentEditorScreen() {
  const { projectId, id } = useParams();
  const { toast } = useToast();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["get", "document", id],
    queryFn: async () => {
      const res = await getDocumentById({ projectId, documentId: id });
      return res?.data;
    },
  });
  const debounceTimeoutRef = useRef(null);
  const [isDirty, setIsDirty] = useState(false); // Tracks if there are unsaved changes

  const {
    mutateAsync,
    isPending,
    isError: isErrorSaving,
  } = useMutation({
    mutationKey: ["update", "document", id],
    mutationFn: async ({
      content,
      title,
    }: {
      content: string;
      title: string;
    }) => {
      const res = await updateDocument({
        projectId,
        documentId: id,
        title: title,
        content: content,
      });
      return res?.data;
    },
  });
  useEffect(() => {
    if (isError && error)
      //@ts-ignore
      throw new Error(error?.response?.data?.message || error);
  }, [isError, error]);

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
    onUpdate: ({ editor }) => {
      setIsDirty(true);

      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        let title = "";
        try {
          title = editor.getJSON().content[0].content[0].text;
        } catch (e) {
          console.log(e);
        }
        if (title !== "") {
          setIsDirty(false);
          mutateAsync({ content: editor.getHTML(), title });
        }
      }, 1500);
    },

    // content: mkdown,
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        // Standard message used by most browsers
        const message =
          "You have unsaved changes. Wait for a second to save your changes.";
        event.preventDefault(); // Cancel the event
        event.returnValue = message; // Legacy method for some browsers
        return message; // Modern browsers
      }
    };

    // Attach event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    if (isErrorSaving) {
      toast({
        title: "Failed to save document",
        description: "There was an error saving the document.",
        variant: "destructive",
      });
    }
  }, [isErrorSaving]);

  useEffect(() => {
    //console.log(data);
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
        <div className="p-0 z-[10000]  ">
          <DocNavbar saving={isPending} editor={editor} />
        </div>

        <div className="flex gap-2 max-w-[1280px]  mx-auto">
          <ToC editor={editor} />
          <EditorFn editor={editor} />
        </div>
      </div>
    </div>
  );
}
