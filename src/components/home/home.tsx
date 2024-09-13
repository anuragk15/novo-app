import { getDocuments } from "@/api/functions/documents";
import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Plus, Sparkles } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import RecentFileItem from "../ui/recentFileItem";
import { Spinner } from "../ui/spinner";
import SearchBar from "./search";
import { FilesTable } from "./ui/filesTable";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";

export default function HomeScreen() {
  const { projectId } = useParams(); // Extract the projectId from the URL
  const { data, isLoading } = useQuery({
    queryKey: ["get", "documents"],
    queryFn: async () => {
      const res = await getDocuments({ projectId });
      return res?.data;
    },
  });
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex flex-col w-[85vw] justify-center  pl-2 pb-2 overflow-scroll h-screen bg-white">
        <Spinner />
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className=" flex gap-10 w-[85vw] items-center justify-center pl-2 pb-2 overflow-scroll h-screen bg-white">
        <CreateNewDocumentPopup
          trigger={
            <div className=" space-y-4 border cursor-pointer p-20 group justify-center flex flex-col items-center hover:border-black rounded-xl border-dashed">
              <Plus
                size={64}
                className=" text-slate-700 group-hover:text-black"
              />
              <h1 className=" text-2xl font-sans">Create document</h1>
              <p className=" text-slate-500">
                Create documents effortlessly with AI
              </p>
            </div>
          }
        />
        <div className=" space-y-4 border cursor-pointer p-20 group justify-center flex flex-col items-center hover:border-black rounded-xl border-dashed">
          <Plus size={64} className=" text-slate-700 group-hover:text-black" />
          <h1 className=" text-2xl font-sans">Add a source</h1>
          <p className=" text-slate-500">
            Novo will use this to improve suggestions
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className=" flex-col w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <SearchBar />
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[91vh] bg-white">
        <div className="flex w-full items-center  justify-between">
          <p className="text-2xl font-sans font-extralight ">Recent</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <RecentFileItem />
          <RecentFileItem />
          <RecentFileItem />
        </div>
        <div className="flex w-full items-center  justify-between ">
          <p className="text-2xl font-sans font-extralight  ">All files</p>
          <Button
            onClick={async () => {
              const res = await axiosClient.get(
                "http://localhost:3000/sources",
                {
                  params: {
                    projectId: "2423",
                  },
                }
              );
              console.log(res);
            }}
            className="flex gap-1 items-center"
            variant="outline"
          >
            <Sparkles size={14} /> Create
          </Button>
        </div>
        <FilesTable />
      </div>
    </div>
  );
}
