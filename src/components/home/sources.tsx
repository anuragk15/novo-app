import { Button } from "../ui/button";
import SourceSearch from "./ui/sourceSearch";
import { SourcesTable } from "./ui/sourcesTable";

export default function SourcesScreen() {
  return (
    <div className=" flex-col w-[85vw] pl-2 pb-2 overflow-scroll h-screen bg-slate-100">
      <SourceSearch />
      <div className="flex flex-col gap-4 items-start border shadow-sm rounded-lg mr-2 p-8 min-h-[91vh] bg-white">
        <div className="flex justify-between w-full items-center">
          <div>
            <h2 className="text-2xl">Sources</h2>
            <p className="text-slate-500">
              Add relevant documents about your business to provide personalized knowledge to your AI.
            </p>
          </div>
          <Button className="font-mono">Add source</Button>
        </div>

        <SourcesTable />
      </div>
    </div>
  );
}
