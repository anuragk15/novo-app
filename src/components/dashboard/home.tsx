import { useUser } from "@clerk/clerk-react";
// import EmptyHomescreen from "../home/ui/emptyHomeScreen";
import { Plus, Settings, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";
import FilesCard from "./filesCard";
import KnowledgeCard from "./knowledgeCard";
import RecommendationCard from "./recommendationCard";
import { UsageCard } from "./usageCard";

export default function DashboardHomeContents({ projectId }) {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className=" flex-col px-8 w-full pl-4 pb-2 overflow-scroll h-screen bg-slate-100">
      <div className="flex flex-col ">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-col md:flex-row pb-2 md:items-center">
            <p className="text-3xl font-sans font-medium py-4">
              {user?.firstName
                ? `How can Novo assist you today, ${user.firstName}?`
                : "How can Novo assist you today?"}
            </p>
            <div
              onClick={() => navigate(`/project/${projectId}/ideas`)}
              className="border gap-1 p-2  max-h-fit cursor-pointer group justify-center flex  items-center border-slate-300 hover:bg-slate-200 rounded-lg border-dashed"
            >
              <Wand2
                size={16}
                className=" text-slate-700 group-hover:text-black"
              />
              <h1 className="hover:text-black text-slate-700  font-sans text-center">
                Ideas
              </h1>
            </div>
            <CreateNewDocumentPopup
              trigger={
                <div className="border gap-1 p-2  max-h-fit cursor-pointer group justify-center flex  items-center border-slate-300 hover:bg-slate-200 rounded-lg border-dashed">
                  <Plus
                    size={16}
                    className=" text-slate-700 group-hover:text-black"
                  />
                  <h1 className="hover:text-black text-slate-700  font-sans text-center">
                    Create
                  </h1>
                </div>
              }
            />
          </div>
          <Settings
            onClick={() => navigate(`/project/${projectId}/settings`)}
            className="text-slate-600 transition-transform cursor-pointer hover:rotate-180 hover:text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2   lg:grid-cols-4 w-full min-h-[90vh] gap-4 ">
          <div className=" md:col-span-3">
            <RecommendationCard />
          </div>
          <div className="  md:col-span-1">
            <div className="bg-white border flex items-center rounded-lg h-full">
              <UsageCard />
            </div>
          </div>
          <div className="  md:col-span-2">
            <FilesCard />
          </div>
          <div className="  md:col-span-2">
            <KnowledgeCard />
          </div>
        </div>
      </div>
    </div>
  );
}
