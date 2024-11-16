import { getRecommendations } from "@/api/functions/recommendations";
import { SingleIdea } from "@/components/dashboard/recommendationCard";
import MobileSideBar from "@/components/home/mobileSidebar";
import Sidebar from "@/components/home/sidebar";
import SearchBar from "@/components/home/ui/search";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Ideas() {
  const { projectId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations", projectId],
    queryFn: () => getRecommendations({ projectId }),
  });
  const [ideas, setIdeas] = useState(data?.data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedInputValue = useDebounce(searchQuery, 200);
  const navigate = useNavigate();
  useEffect(() => {
    if (debouncedInputValue && debouncedInputValue.length > 0) {
      setIdeas(
        ideas.filter(
          (item) =>
            item?.title?.toLowerCase().includes(debouncedInputValue.toLowerCase()) ||
            item?.type?.toLowerCase().includes(debouncedInputValue.toLowerCase())
        )
      );
    } else if (debouncedInputValue === "") {
      setIdeas(data?.data || []);
    }
  }, [debouncedInputValue, searchQuery, ideas]);

  return (
    <div className="flex bg-slate-100 ">
      <div className="hidden md:block">
        <Sidebar projectId={projectId} />
      </div>

      <div className="flex-col w-full md:w-full pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
        <MobileSideBar projectId={projectId} />
        <SearchBar
          placeholder={"Search ideas"}
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[93vh] bg-white">
          <div className="flex flex-col md:flex-row justify-between w-full items-center">
            <div>
              <h2 className="text-2xl">Brainstorm Board</h2>
              <p className="text-slate-500">
                Your collection of ideas and inspiration updated every week.
              </p>
            </div>
            <div
              onClick={() => navigate(`/project/${projectId}/customise-ideas`)}
              className="cursor-pointer transition-transform hover:rotate-180 group"
            >
              <Settings className="text-slate-600 group-hover:text-black" size={24} />
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-[70vh] w-full flex-col justify-center items-center">
              <Spinner />
            </div>
          ) : ideas?.length > 0 ? (
            <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ideas.map((item) => (
                <SingleIdea key={item.id} item={item} />
              ))}
            </AnimatedGroup>
          ) : (
            <div className="flex h-[70vh] w-full flex-col justify-center items-center">
              <img
                src={"/EmptyState.svg"}
                style={{
                  width: "15rem",
                  height: "15rem",
                }}
              />
              <p className="text-center font-sans text-2xl">No ideas found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
