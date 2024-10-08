import { promptsCopilotChat } from "@/api/functions/prompts";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ArrowUp, Bot, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../border-trail";
import { Input } from "../input";
import { useToast } from "../use-toast";

interface MessageType {
  from: string;
  message: string;
  id: string | number;
}
export default function SideChat({
  defaultMessages,
}: {
  defaultMessages?: MessageType[];
}) {
  const messageContainerRef = useRef(null);

  const { projectId, id } = useParams();
  const [hidePanel, setHidePanel] = useState(true);
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(defaultMessages || []);
  const { mutateAsync, isPending, data } = useMutation({
    mutationKey: ["chat", "document", id],
    mutationFn: async (message: string) => {
      const res = await promptsCopilotChat({
        projectId,
        documentId: id,
        message: message,
      });
      //console.log(res);
      const m = [...messages];
      m.push(res?.content);

      setMessages(m);

      return res?.content;
    },
  });
  useEffect(() => {
    scrollToBottom();
  }, [hidePanel, messages, data]);
  //insert user message in the message array
  function insertMessage() {
    const m = [...messages];
    m.push({
      from: "user",
      message: inputValue,
      id: Date.now(),
    });
    setMessages(m);

    setInputValue("");
  }
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };
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
          <BorderTrail
            className={cn(
              "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
              isPending && "opacity-100"
            )}
            size={200}
            transition={{
              ease: [0, 0.5, 0.8, 0.5],
              duration: 4,
              repeat: 2,
            }}
          />
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
          <div
            onLoad={() => scrollToBottom()}
            ref={messageContainerRef}
            className="flex flex-1 justify-between flex-col w-full overflow-scroll"
          >
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
                {isPending ? (
                  <div
                    className={cn(
                      " max-w-[80%] self-end cursor-pointer  p-2 rounded-lg",
                      "bg-slate-200 self-start text-black"
                    )}
                  >
                    <p className=" italic text-md text-slate-500">
                      Thinking...
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className="flex w-full items-center px-2 bg-white border">
            <Input
              disabled={isPending}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  insertMessage();
                  mutateAsync(e.currentTarget.value);
                } else if (e.code === "Escape") {
                  setHidePanel(true);
                  return;
                }
              }}
              value={inputValue}
              maxLength={240}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-none  border-slate-300 bg-white  py-6 focus-visible:ring-0 focus-visible:ring-offset-0 font-sans "
              placeholder="What do you think about the introduction?"
            />

            <div
              onClick={() => {
                if (inputValue != "") {
                  insertMessage();
                  mutateAsync(inputValue);
                }
              }}
              className="bg-slate-900 cursor-pointer opacity-40 rounded-full p-1"
            >
              <ArrowUp size={18} color="white" />
            </div>
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
