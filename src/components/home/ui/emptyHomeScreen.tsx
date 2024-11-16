import { Plus } from "lucide-react";
import { CreateNewDocumentPopup } from "../../ui/createNewDocumentPopup";

export default function EmptyHomescreen() {
  return (
    <div className=" flex flex-col w-full  md:flex-row gap-10 md:min-w-[85vw] items-center justify-center pl-2 pb-2 overflow-scroll h-screen bg-white">
      <CreateNewDocumentPopup
        trigger={
          <div className=" space-y-4 border cursor-pointer p-20 group justify-center flex flex-col items-center hover:border-black rounded-xl border-dashed">
            <Plus
              size={64}
              className=" text-slate-700 group-hover:text-black"
            />
            <h1 className=" text-2xl font-sans text-center">Create document</h1>
            <p className=" text-slate-500 text-center">
              Create documents effortlessly with AI
            </p>
          </div>
        }
      />
    </div>
  );
}
