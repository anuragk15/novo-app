/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getDocumentById, updateDocument } from "@/api/functions/documents";
import SideChat from "@/components/ui/EditorElements/SideChat";
import SidePanel from "@/components/ui/EditorElements/SidePanel";
import { SlashCommandExtension } from "@/components/ui/EditorExtensions/SlashCommand";
import EditorFn from "@/components/ui/editorWrapper";
import LoadingState from "@/components/ui/loadingState";
import { useToast } from "@/components/ui/use-toast";
import { myExtensions } from "@/lib/editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "@tiptap/extension-image";
import { Plugin } from "@tiptap/pm/state";
import { useEditor } from "@tiptap/react";
import { Crisp } from "crisp-sdk-web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DocumentEditorScreen() {
  const { projectId, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [docTitle, setTitle] = useState("");
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["get", "document", id],
    queryFn: async () => {
      const res = await getDocumentById({ projectId, documentId: id });
      return res?.data;
    },

    enabled: false,
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
        documentId: id == "new" ? undefined : id,
        title: title,
        content: content,
      });
      // //console.log(res);
      return res?.documentId;
    },
  });
  useEffect(() => {
    Crisp.chat.hide();
    if (id != "new") refetch();
    return () => {
      Crisp.chat.show();
    };
  }, []);
  useEffect(() => {
    if (isError && error)
      //@ts-ignore
      throw new Error(error?.response?.data?.message || error);
  }, [isError, error]);

  const editor = useEditor({
    extensions: [
      ...myExtensions,
      Image.extend({
        addProseMirrorPlugins() {
          const plugin = new Plugin({
            props: {
              handleDOMEvents: {
                paste(view, event) {
                  const url = event.clipboardData.getData("text/plain");
                  const isImage =
                    /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)(\?.*)?$)/i.test(
                      url
                    );

                  if (isImage) {
                    editor.chain().focus().setImage({ src: url }).run();
                  }
                },
              },
            },
          });
          return [plugin];
        },
      }),
      SlashCommandExtension.configure({
        onSlashEnter: () => {
          const { state } = editor;
          const { $from, to } = state.selection;

          // Get the text before the selection
          const textBefore = state.doc.textBetween(0, $from.pos, "\n", "\n");

          // Get the text after the selection
          const textAfter = state.doc.textBetween(
            to,
            state.doc.content.size,
            "\n",
            "\n"
          );

          // //console.log("Text before selection: ", textBefore);
          // //console.log("Text after selection: ", textAfter);
          // Logic to show your input field
          editor.chain().focus().insertAISuggestion({
            previousContent: textBefore,
            nextContent: textAfter,
            projectId: projectId,
          });
        },
      }),
    ],

    onUpdate: ({ editor }) => {
      setIsDirty(true);

      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(async () => {
        let title = "";
        try {
          title = editor.getJSON().content[0].content[0].text;
        } catch (e) {
          console.error(e);
        }
        if (title !== "") {
          if (title != docTitle) setTitle(title);
          const docId = await mutateAsync({ content: editor.getHTML(), title });

          if (docId) {
            setIsDirty(false);
            if (id != docId) {
              navigate(`/document/editor/${projectId}/${docId}`, {
                replace: true,
              });
            }
          }
        } else {
          toast({
            title: "Title is required",
            description: "Please add a title to save the document",
          });
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
    ////console.log(data);
    if (data) {
      editor.commands.setContent(data?.content?.content || "");
      setTitle(data?.content?.title || "");
    }
  }, [data, editor]);

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <div className=" bg-white">
      <div className=" flex flex-col  ">
        {/* <div className="p-0 z-[10000]  ">
          <DocNavbar name={docTitle} saving={isPending} editor={editor} />
        </div> */}

        <div className="flex">
          <SidePanel editor={editor} document={data} />
          <div className="bg-white   flex-1 py-5 md:py-20 flex justify-center">
            <EditorFn name={docTitle} saving={isPending} editor={editor} />
          </div>
          <SideChat defaultMessages={data?.content?.copilot?.messages} />
        </div>
      </div>
    </div>
  );
}
