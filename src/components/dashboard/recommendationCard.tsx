import { getRecommendations } from "@/api/functions/recommendations";
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/animated-dialog";
import { Recommendation } from "@/lib/types";
import { cn, generateColorsFromInitial } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Flame, PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatedGroup } from "../ui/animated-group";
import { BorderTrail } from "../ui/border-trail";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

export default function RecommendationCard() {
  const { projectId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations", projectId],
    queryFn: () => getRecommendations({ projectId }),
  });
  const navigate = useNavigate();

  return (
    <div className="relative  flex flex-col gap-4 items-start border  h-full w-full rounded-lg p-4 bg-white">
      <BorderTrail
        className={cn(
          "bg-gradient-to-l from-black-300 via-black-500 to-black-300 transition-opacity duration-300 dark:from-green-700/30 dark:via-white-500 dark:to-white-700/30 opacity-0",
          isLoading && "opacity-100"
        )}
        size={200}
        transition={{
          ease: [0, 0.5, 0.8, 0.5],
          duration: 4,
          repeat: 20,
        }}
      />
      <div className="flex relative w-full items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 rounded-full p-2 ">
            <motion.div
              animate={{ scale: [0.6, 1] }} // 0.6 * 20px = 12px and 1 * 20px = 20px
              transition={{
                repeat: Infinity,
                duration: 1,
                repeatType: "mirror",
              }}
              style={{ fontSize: 24 }}
            >
              <Flame className="text-orange-600" />
            </motion.div>
          </div>

          <p className="text-xl font-sans font-medium">Inspiration</p>
        </div>
        <div className="hidden md:block">
          <Button
            onClick={() => navigate(`/project/${projectId}/ideas`)}
            variant="link"
          >
            Explore all
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-full w-full flex-col justify-center items-center">
         <Loader />
        </div>
      ) : (
        <AnimatedGroup className="grid grid-cols-1 h-full flex-col w-full gap-2 md:grid-cols-2 lg:grid-cols-4">
          {data?.data?.slice(0, 4).map((idea) => (
            <SingleIdea key={idea.id} item={idea} />
          ))}
        </AnimatedGroup>
      )}
    </div>
  );
}
export const SingleIdea = ({ item }: { item: Recommendation }) => {
  const funnelColors = generateColorsFromInitial(item.marketingFunnel);

  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className="flex  w-full h-full justify-between pb-3  flex-col overflow-hidden border border-zinc-950/10 bg-white hover:bg-slate-50 dark:border-zinc-50/10 dark:bg-zinc-900"
      >
        <div>
          <div className="flex flex-grow flex-row  justify-between p-2">
            <div>
              <DialogTitle className="text-zinc-950 line-clamp-3 leading-6 text-lg font-semibold font-sans dark:text-zinc-50">
                {item.title}
              </DialogTitle>
              <DialogSubtitle className="py-5 text-zinc-700 dark:text-zinc-400">
                <div className="line-clamp-2">{item.description}</div>
              </DialogSubtitle>
            </div>
            <button
              type="button"
              className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
              aria-label="Open dialog"
            >
              <PlusIcon size={12} />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end items-center px-2  ">
          <div className="bg-slate-100   p-1  rounded-lg ">
            <span className="">{item.type}</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
        >
          <div className="p-6">
            <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50 pr-4">
              {item.title}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-600 py-2 dark:text-zinc-400">
              <div className="flex  gap-2 items-center ">
                <div>
                  <span className="p-1 rounded-lg  bg-slate-100">
                    {item.type}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: funnelColors.background,
                    color: funnelColors.text,
                  }}
                  className="p-1 rounded-lg"
                >
                  Level: {item.marketingFunnel}
                </span>
              </div>
              <div className="pb-4 pt-2">
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="italic">Keywords: </span>
                  <span className="underline">
                    {item.keywords.map((item) => item.keyword).join(",")}
                  </span>
                </p>
              </div>
            </DialogSubtitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              {item.description}

              <div className="mt-20 flex items-end justify-end">
                <Button>Generate</Button>
              </div>
            </DialogDescription>
          </div>
          <DialogClose className="text-slate-700" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
