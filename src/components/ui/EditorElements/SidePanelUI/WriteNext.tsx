/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sparkles } from "lucide-react";
import { useToast } from "../../use-toast";
import { Editor } from "@tiptap/core";

export default function WriteNext({
  editor,
  projectId,
}: {
  editor: Editor;
  projectId: string;
}) {
  const { toast } = useToast();

  const text = "How Novo can help you write better content";
  return (
    <div className="w-full">
      <div>
        <button className="flex px-1  w-full   flex-col  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200">
          <Sparkles size={18} className="text-slate-700" />
          <span className=" font-mono">
            Having a writer's block? Let Novo suggest next topics!
          </span>
        </button>
      </div>
      <div className="my-5 flex flex-col gap-2">
        <p className="text-slate-600 text-sm">
          Click any of the topics & Novo will write it for you
        </p>

        {Array.from({ length: 5 }, (item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                // scroll to bottom
                window.scrollTo(0, document?.body?.scrollHeight);

                editor.chain().writeNextWithAI({
                  topic: "start",
                  content: editor.getText().substring(0, 20000),
                  projectId: projectId,
                });
              }}
              className="flex gap-2 flex-col  cursor-pointer  group "
            >
              <div className="flex gap-2">
                <p className=" text-slate-500">#{i + 1}</p>
                <div className="p-2 font-sans pr-3  border bg-slate-50 relative group-hover:bg-white border-slate-300 rounded-md ">
                  {text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
