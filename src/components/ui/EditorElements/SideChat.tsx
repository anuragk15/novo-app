import { Bot, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../input";
import { useUserStore } from "@/store/user";
import { cn } from "@/lib/utils";
import { useToast } from "../use-toast";

export default function SideChat() {
  const { projectId, id } = useParams();
  const [hidePanel, setHidePanel] = useState(true);
  const { user } = useUserStore();
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: "1",
      message: "Hello, how can I help",
      from: "bot",
    },
    {
      id: "2",
      message: "Tell me about the introduction",
      from: user?.id,
    },
    {
      id: "3",
      message:
        "The introduction is the first part of the document. it gives a brief overview of the document and what to expect from it. It is usually the first thing the reader sees when they open the document.",
      from: "bot",
    },
  ]);
  if (hidePanel) {
    return (
      <div className="fixed  bottom-5 right-5 mdright-20 flex max-h-fit  md:m-5 gap-5">
        <div
          onClick={() => {
            setHidePanel(false);
          }}
          className=" border border-slate-300 bg-slate-100 p-3 group rounded-xl  max-h-fit hover:bg-slate-200 cursor-pointer"
        >
          <Bot
            className=" text-slate-700   group:hover:text-slate-800"
            size={30}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className=" fixed  bottom-24 flex flex-col rounded-lg items-end gap-2 right-5  md:right-[6.25rem]">
        <div className=" rounded-lg items-center  bg-slate-50  h-[60vh] border flex flex-col   md:w-[30vw] border-slate-200  md:min-w-[25rem]">
          <div className="flex w-full justify-between rounded-t-lg items-center p-2 bg-black">
            <p className="text-white text-xl font-sans">Chat with document</p>
            <div
              onClick={() => {
                setHidePanel(true);
              }}
              className="p-2 group  rounded-xl hover:bg-slate-800 cursor-pointer"
            >
              <X
                className=" text-slate-300   group-hover:text-white"
                size={24}
              />
            </div>
          </div>
          <div className="flex flex-1 justify-between flex-col w-full">
            {messages?.length == 0 ? (
              <div className=" flex-1 flex items-center justify-center">
                <p className="text-slate-600 text-sm p-2 text-center">
                  You can chat and query the content of the documents here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4">
                {messages?.map((item) => (
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(item.message);
                      toast({
                        title: "Copied",
                        description: "Message copied to clipboard",
                      });
                    }}
                    className={cn(
                      "bg-black text-white max-w-[80%] self-end cursor-pointer  p-2 rounded-lg",
                      item.from == "bot" && "bg-slate-200 self-start text-black"
                    )}
                  >
                    {item.message}
                  </div>
                ))}
              </div>
            )}
            <Input
              className="border  border-slate-300 bg-white  py-6 focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
              placeholder="What do you think about the introduction?"
            />
          </div>
        </div>
      </div>
      <div className="fixed  bottom-5 right-5 mdright-20 flex max-h-fit  md:m-5 gap-5">
        <div
          onClick={() => {
            setHidePanel(true);
          }}
          className=" border border-slate-300 bg-slate-100 p-3 group rounded-xl  max-h-fit hover:bg-slate-200 cursor-pointer"
        >
          <Bot
            className=" text-slate-700   group:hover:text-slate-800"
            size={30}
          />
        </div>
      </div>
    </>
  );
}
