/* eslint-disable @typescript-eslint/no-unused-vars */
import { promptsCopilotContentAnalysis } from "@/api/functions/prompts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalizeFirstCharacter, cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Annoyed,
  BicepsFlexed,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clover,
  Copy,
  GraduationCap,
  Handshake,
  Heart,
  Laugh,
  LucideClock2,
  Smile,
  Sparkles,
  TrendingDown,
  WholeWord,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BorderTrail } from "../../border-trail";
import { useToast } from "../../use-toast";
export default function SEOAnalysis({ copilot }) {
  const { toast } = useToast();
  const { projectId, id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(copilot || null);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["update", "document", id],
    mutationFn: async () => {
      const res = await promptsCopilotContentAnalysis({
        projectId,
        documentId: id,
      });
      //console.log(res);
      setData(res?.content);
      return res?.content;
    },
  });

  useEffect(() => {
    if (isError) {
      console.error(isError);
      toast({
        title: "Error",
        description: "An error occurred while fetching the data",
        variant: "destructive",
      });
    }
  }, [isError, toast]);
  return (
    <div className="w-full">
      {data == null ? (
        <div>
          <button
            disabled={isPending}
            onClick={async () => await mutateAsync()}
            className="flex relative px-1 flex-col w-full  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
            <BorderTrail
              className={cn(
                "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
                isPending && "opacity-100"
              )}
              size={70}
              transition={{
                ease: [0, 0.5, 0.8, 0.5],
                duration: 4,
                repeat: 20,
              }}
            />
            <Sparkles size={18} className="text-slate-700" />
            <span className=" font-mono">Perform SEO & content analysis</span>
          </button>
        </div>
      ) : (
        <div className=" my-5 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="flex  gap-1  border shadow-lg  p-2 rounded-lg items-center">
                    <WholeWord size={14} className=" text-gray-600" />
                    <span className=" text-gray-600">Words:</span>{" "}
                    {data?.wordCount}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="md:max-w-[60vw] bg-white">
                  <div className="bg-white md:max-w-[20vw] px-2">
                    <ol className="space-y-4">
                      <li>
                        1,000 - 1,500 words: Suitable for general topics or blog
                        posts that provide concise yet valuable information.
                      </li>
                      <li>
                        1,500 - 2,000 words: Suitable for in-depth articles or
                        guides that provide detailed information.
                      </li>
                      <li>
                        2000+ words: Ideal for long-form content, which tend to
                        perform better in search results for competitive or
                        complex topics.
                      </li>
                    </ol>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="flex  gap-1  border shadow-lg  p-2 rounded-lg  items-center">
              {generateToneIcon(data?.tone)}
              <span className=" text-gray-600">Tone: </span>
              {capitalizeFirstCharacter(data?.tone)}
            </p>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex  gap-1 items-center border shadow-lg rounded-lg p-2">
                    <GraduationCap size={14} className=" text-gray-600" />
                    <p className=" text-gray-600">Level:</p>
                    <span
                      className={cn(
                        "px-2 rounded-lg bg-red-200 text-red-600",
                        data?.readingGrade <= 6 &&
                          "bg-green-200 text-green-600",
                        data?.readingGrade <= 8 &&
                          data?.readingGrade > 6 &&
                          "bg-yellow-200 text-yellow-600"
                      )}
                    >
                      {data?.readingGrade}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="md:max-w-[60vw] bg-white">
                  <p className="bg-white md:max-w-[20vw]">
                    Lower levels of readability grades are recommended. <br />
                    <br />
                    The reading grade of an article measures the education level
                    needed to understand the text. A higher grade indicates more
                    complex content.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className=" space-y-2  group">
            <p className=" text-gray-600">Meta description:</p>
            <div className="p-2 relative w-full font-sans pr-3 border bg-slate-50 group-hover:bg-white border-slate-300 rounded-md ">
              {data?.metaDescriptionSuggestions}
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    data?.metaDescriptionSuggestions
                  );

                  toast({
                    title: "✨ Copied to clipboard!",
                    description: "You’ve copied the title!",
                  });
                }}
                className="hidden absolute top-0 right-0 hover:bg-slate-100 p-2 rounded-lg cursor-pointer group-hover:flex"
              >
                <Copy size={18} className=" text-slate-500" />
              </div>
            </div>
          </div>
          {data?.keywordDensity?.length > 0 && (
            <div className=" space-y-2  group">
              <p className=" text-gray-600">Keyword density:</p>

              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  {data?.keywordDensity?.map((item, i) => {
                    return (
                      <Tooltip key={i}>
                        <TooltipTrigger>
                          <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                            <p className=" text-gray-900">
                              {item.keyword} ({item.frequency})
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="md:max-w-[60vw] bg-white">
                          Density as a percentage of the total text:{" "}
                          {item.density}%
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          )}

          {data?.people?.length > 0 && (
            <div className=" space-y-2  group">
              <p className=" text-gray-600">People recognised:</p>
              <div className="flex flex-wrap gap-2">
                {data?.people?.map((item, i) => {
                  return (
                    <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                      <p className=" text-gray-900">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {data?.organizations?.length > 0 && (
            <div className=" space-y-2  group">
              <p className=" text-gray-600">Organisations recognised:</p>
              <div className="flex flex-wrap gap-2">
                {data?.organizations?.map((item, i) => {
                  return (
                    <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                      <p className=" text-gray-900">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {data?.dates?.length > 0 && (
            <div className=" space-y-2  group">
              <p className=" text-gray-600">Dates mentioned:</p>
              <div className="flex flex-wrap gap-2">
                {data?.dates?.map((item, i) => {
                  return (
                    <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                      <p className=" text-gray-900">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {data?.places?.length > 0 && (
            <div className=" space-y-2  group">
              <p className=" text-gray-600">Places mentioned:</p>
              <div className="flex flex-wrap gap-2">
                {data?.places.map((item, i) => {
                  return (
                    <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                      <p className=" text-gray-900">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <button
            disabled={isPending}
            onClick={async () => {
              await mutateAsync().then(() => {
                queryClient.invalidateQueries({
                  queryKey: ["get", "document", id],
                });
              });
            }}
            className="flex relative px-1 justify-center  w-full  mx-auto py-2 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200"
          >
            <BorderTrail
              className={cn(
                "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
                isPending && "opacity-100"
              )}
              size={30}
              transition={{
                ease: [0, 0.5, 0.8, 0.5],
                duration: 4,
                repeat: 20,
              }}
            />
            <Sparkles size={18} className="text-slate-700" />
            <span className=" font-mono">Regenerate</span>
          </button>
        </div>
      )}
    </div>
  );
}
function generateToneIcon(tone: TextTone) {
  return tone == "formal" ? (
    <BriefcaseBusiness size={14} className=" text-gray-600" />
  ) : tone == "informal" ? (
    <Smile />
  ) : tone == "optimistic" ? (
    <ChartNoAxesCombined size={14} className=" text-gray-600" />
  ) : tone == "pessimistic" ? (
    <TrendingDown size={14} className=" text-gray-600" />
  ) : tone == "serious" ? (
    <Annoyed size={14} className=" text-gray-600" />
  ) : tone == "humorous" ? (
    <Laugh size={14} className=" text-gray-600" />
  ) : tone == "friendly" ? (
    <Handshake size={14} className=" text-gray-600" />
  ) : tone == "sarcastic" ? (
    <Laugh size={14} className=" text-gray-600" />
  ) : tone == "inspirational" ? (
    <BicepsFlexed size={14} className=" text-gray-600" />
  ) : tone == "passionate" ? (
    <Clover size={14} className=" text-gray-600" />
  ) : tone == "neutral" ? (
    <Annoyed size={14} className=" text-gray-600" />
  ) : tone == "authoritative" ? (
    <Zap size={14} className=" text-gray-600" />
  ) : tone == "urgent" ? (
    <LucideClock2 size={14} className=" text-gray-600" />
  ) : tone == "sympathetic" ? (
    <Heart size={14} className=" text-gray-600" />
  ) : (
    <Smile size={14} className=" text-gray-600" />
  );
}

export enum TextTone {
  FORMAL = "formal",
  INFORMAL = "informal",
  OPTIMISTIC = "optimistic",
  PESSIMISTIC = "pessimistic",
  SERIOUS = "serious",
  HUMOROUS = "humorous",
  FRIENDLY = "friendly",
  SARCASTIC = "sarcastic",
  INSPIRATIONAL = "inspirational",
  PASSIONATE = "passionate",
  NEUTRAL = "neutral",
  AUTHORITATIVE = "authoritative",
  URGENT = "urgent",
  SYMPATHETIC = "sympathetic",
}
