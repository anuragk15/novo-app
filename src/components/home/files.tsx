import { useDebounce } from "@/hooks/useDebounce";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CreateNewDocumentPopup } from "../ui/createNewDocumentPopup";
import EmptyHomescreen from "./ui/emptyHomeScreen";
import { FilesTable } from "./ui/filesTable";
import SearchBar from "./ui/search";

export default function HomeScreen({ data, projectId }) {
  const [documents, setDocuments] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedInputValue = useDebounce(searchQuery, 200); // 500ms debounce delay

  useEffect(() => {
    if (debouncedInputValue && debouncedInputValue.length > 0) {
      setDocuments(
        data.filter((item) =>
          item?.title?.toLowerCase().includes(debouncedInputValue.toLowerCase())
        )
      );
    }
    if (debouncedInputValue === "") {
      setDocuments(data);
    }
  }, [debouncedInputValue, searchQuery, data]);
  if (data?.length === 0) {
    return <EmptyHomescreen projectId={projectId} />;
  }
  return (
    <div className=" flex-col w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <SearchBar
        placeholder={"Search documents..."}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[93vh] bg-white">
        {/* {data?.length > 4 ? (
          <div className="flex w-full items-center  justify-between">
            <p className="text-2xl font-sans font-extralight ">Recent</p>
          </div>
        ) : null} */}
        {/* {data?.length > 4 ? (
          <div className="flex flex-wrap gap-4">
            <RecentFileItem />
            <RecentFileItem /
            <RecentFileItem />
          </div>
        ) : null} */}

        <div className="flex w-full items-center  justify-between ">
          <p className="text-xl font-sans font-extralight">All files</p>
          <CreateNewDocumentPopup
            trigger={
              <Button className="flex gap-1 items-center" variant="default">
                <Sparkles size={14} /> Create
              </Button>
            }
          />
        </div>

        <FilesTable files={documents} />
      </div>
    </div>
  );
}
