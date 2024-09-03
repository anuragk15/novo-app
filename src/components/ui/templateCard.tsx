import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";

export default function TemplateCard({ index }) {
  const Tag = ({ text }) => {
    return (
      <p className="px-2 font-mono py-0 rounded-lg text-xs lg:text-sm text-slate-600 shadow-sm bg-slate-200">
        {text}
      </p>
    );
  };
  return (
    <div className="relative">
      <Bookmark
        className=" cursor-pointer absolute top-5 right-5 z-50"
        onClick={() => {
          alert("ss");
        }}
        size={18}
      />

      <div
        onClick={() => {
          alert("aa");
        }}
        className={cn(
          "   md:border-r relative cursor-pointer px-4 space-y-5 py-4 hover:bg-slate-100",
          index % 3 == 0 && "md:border-none"
        )}
      >
        <div className="space-y-2">
          <div className=" font-mono text-xl"># Blog template</div>

          <div className=" font-sans text-slate-600">
            Rapidly create blogs that match your brand, tone, and engage with
            your users
          </div>
        </div>
        <div className="flex py-2 flex-wrap gap-2">
          <Tag text="Blog" />
          <Tag text="Marketing" />
          <Tag text="SEO" />
        </div>
      </div>
    </div>
  );
}
