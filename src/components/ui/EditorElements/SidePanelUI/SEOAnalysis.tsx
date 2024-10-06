/* eslint-disable @typescript-eslint/no-unused-vars */
import { capitalizeFirstCharacter, cn } from "@/lib/utils";
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
  Info,
  Laugh,
  LucideClock2,
  Sigma,
  Smile,
  Sparkles,
  TrendingDown,
  WholeWord,
  Zap,
} from "lucide-react";
import { useToast } from "../../use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function SEOAnalysis() {
  const { toast } = useToast();
  const text = "Some meta description for the page. Use it to improve SEO";
  const readingGrade: number = 8;
  const keywords = [
    {
      keyword: "Japan",
      frequency: 5,
      density: 0.99,
    },
    {
      keyword: "tradition",
      frequency: 3,
      density: 0.59,
    },
    {
      keyword: "modernity",
      frequency: 3,
      density: 0.59,
    },
    {
      keyword: "Tokyo",
      frequency: 4,
      density: 0.79,
    },
    {
      keyword: "Kyoto",
      frequency: 3,
      density: 0.59,
    },
    {
      keyword: "food",
      frequency: 2,
      density: 0.39,
    },
    {
      keyword: "temples",
      frequency: 3,
      density: 0.59,
    },
    {
      keyword: "experience",
      frequency: 2,
      density: 0.39,
    },
    {
      keyword: "journey",
      frequency: 2,
      density: 0.39,
    },
  ];
  const people = [];
  const places = [
    "Japan",
    "Tokyo",
    "Kyoto",
    "Shibuya",
    "Meiji Shrine",
    "Gion",
    "Kinkaku-ji",
    "Fushimi Inari Shrine",
    "Tsukiji Market",
  ];
  const tone: TextTone = TextTone.URGENT;

  const externalLinkSuggestions = [
    "https://www.japan.travel/en/",
    "https://www.japan-guide.com/",
    "https://www.japan.travel/en/uk/",
    "https://www.japanican.com/",
    "https://www.lonelyplanet.com/japan",
  ];
  return (
    <div className="w-full">
      <div>
        <button className="flex px-1 flex-col w-full  mx-auto py-10 rounded-md items-center bg-slate-100 border gap-3 hover:bg-slate-200">
          <Sparkles size={18} className="text-slate-700" />
          <span className=" font-mono">Perform SEO & content analysis</span>
        </button>
      </div>
      <div className=" my-5 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className="flex  gap-1  border shadow-lg  p-2 rounded-lg items-center">
                  <WholeWord size={14} className=" text-gray-600" />
                  <span className=" text-gray-600">Words:</span> 124
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
            <Sigma size={14} className=" text-gray-600" />
            <span className=" text-gray-600">Sentences:</span>5
          </p>

          <p className="flex  gap-1  border shadow-lg  p-2 rounded-lg  items-center">
            {generateToneIcon(tone)}
            <span className=" text-gray-600">Tone: </span>
            {capitalizeFirstCharacter(tone)}
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
                      readingGrade < 6 && "bg-green-200 text-green-600",
                      (readingGrade == 7 || readingGrade == 8) &&
                        "bg-yellow-200 text-yellow-600"
                    )}
                  >
                    {readingGrade}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="md:max-w-[60vw] bg-white">
                <p className="bg-white md:max-w-[20vw]">
                  Lower levels of readability grades are recommended. <br />{" "}
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
            {text}
            <div
              onClick={() => {
                navigator.clipboard.writeText(text);

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
        <div className=" space-y-2  group">
          <p className=" text-gray-600">Keyword density:</p>

          <TooltipProvider>
            <div className="flex flex-wrap gap-2">
              {keywords.map((item, i) => {
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
                      Density as a percentage of the total text: {item.density}%
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
        <div className=" space-y-2  group">
          <div className=" flex justify-between items-center">
            <p className=" text-gray-600">External link suggestions:</p>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={16} className=" text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent className="md:max-w-[60vw] bg-white">
                    <div className="bg-white md:max-w-[20vw] px-2">
                      Try including these external links to reputable sources to
                      improve the credibility & SEO of your content.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {externalLinkSuggestions.map((item, i) => {
              return (
                <div className="flex   gap-1 items-center relative w-full border rounded-lg p-2">
                  <div className=" text-gray-700 ">
                    {item}
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(item);

                        toast({
                          title: "✨ Copied to clipboard!",
                          description: "You’ve copied the title!",
                        });
                      }}
                      className="hidden absolute top-0 right-0 z-20 bg-slate-50 hover:bg-slate-100 p-2 rounded-lg cursor-pointer group-hover:flex"
                    >
                      <Copy size={18} className=" text-slate-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" space-y-2  group">
          <p className=" text-gray-600">People recognised:</p>
          <div className="flex flex-wrap gap-2">
            {people.map((item, i) => {
              return (
                <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                  <p className=" text-gray-900">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" space-y-2  group">
          <p className=" text-gray-600">Organisations recognised:</p>
          <div className="flex flex-wrap gap-2">
            {people.map((item, i) => {
              return (
                <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                  <p className=" text-gray-900">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" space-y-2  group">
          <p className=" text-gray-600">Dates mentioned:</p>
          <div className="flex flex-wrap gap-2">
            {people.map((item, i) => {
              return (
                <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                  <p className=" text-gray-900">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" space-y-2  group">
          <p className=" text-gray-600">Places mentioned:</p>
          <div className="flex flex-wrap gap-2">
            {places.map((item, i) => {
              return (
                <div className="flex   gap-1 items-center border shadow-lg rounded-lg p-2">
                  <p className=" text-gray-900">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
