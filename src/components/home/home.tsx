import { Plus, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";
import SearchBar from "./search";
import { FilesTable } from "./ui/filesTable";

export default function HomeScreen({ data }) {
 console.log(data);

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
        {/* {data?.length > 4 ? (
          <div className="flex w-full items-center  justify-between">
            <p className="text-2xl font-sans font-extralight ">Recent</p>
          </div>
        ) : null} */}
        {/* {data?.length > 4 ? (
          <div className="flex flex-wrap gap-4">
            <RecentFileItem />
            <RecentFileItem />
            <RecentFileItem />
          </div>
        ) : null} */}
        <div className="flex w-full items-center  justify-between ">
          <p className="text-2xl font-sans font-extralight">All files</p>
          <CreateNewDocumentPopup
            trigger={
              <Button className="flex gap-1 items-center" variant="outline">
                <Sparkles size={14} /> Create
              </Button>
            }
          />
        </div>

        <FilesTable files={data} />
      </div>
    </div>
  );
}
