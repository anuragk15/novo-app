import { FileChartLine } from "lucide-react";

export default function RecentFileItem() {
  return (
    <div className="p-2 shadow-sm hover:bg-slate-50 cursor-pointer min-w-[20vw] space-y-4  border rounded-lg">
      <div className="flex gap-2 items-center">
        <FileChartLine size={26}  className="text-slate-600" />
        <p className="text-lg font-light">Japan tour</p>
      </div>
      <div className="flex w-full">
        <p className="text-sm text-slate-500">5 days ago</p>
      </div>
    </div>
  );
}
