export default function FolderItem() {
  const date = new Date();
  return (
    <div className="py-2 hover:bg-slate-50 min-w-[15vw] px-4 flex flex-col group gap-4 border rounded-lg shadow-sm cursor-pointer">
      <p className=" text-lg text-slate-800 font-light  ">Travel blog</p>
      <div className="flex gap-2 justify-between">
        <p className="text-sm  text-gray-400  ">12 files</p>
        <p className="text-sm text-gray-400 ">{date.toDateString()}</p>
      </div>
    </div>
  );
}
