import { addBookmark, deleteBookmark } from "@/api/functions/templates";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { useParams } from "react-router-dom";
import { useToast } from "./use-toast";

export default function TemplateCard({
  index,
  name,
  description,
  tags,
  id,
  fields,
  bookmarkId,
  setSelectedTemplate,
}) {
  const { projectId } = useParams();
  const { mutateAsync } = useMutation({
    mutationKey: ["create", "bookmark"],
    mutationFn: addBookmark,
  });
  const { toast } = useToast();

  const { mutateAsync: deleteBookmarkFn } = useMutation({
    mutationKey: ["delete", "bookmark"],
    mutationFn: deleteBookmark,
  });
  const client = useQueryClient();
  const Tag = ({ text }) => {
    return (
      <p className="px-2 font-mono py-0 rounded-lg text-xs lg:text-sm text-slate-600 shadow-sm bg-slate-200">
        {text}
      </p>
    );
  };
  return (
    <div className="relative h-full group ">
      <div
        onClick={() => {
          if (bookmarkId == null) {
            mutateAsync({ templateId: id, projectId }).then(() => {
              toast({
                title: "📌 Bookmark added!",
                description: "You’ve bookmarked this template.",
              });
              client.invalidateQueries({ queryKey: ["get", "templates"] });
              client.invalidateQueries({
                queryKey: ["get", "bookmarked", "templates"],
              });
            });
          } else {
            toast({
              title: "📌 Bookmark removed!",
              description: "You’ve removed this template from bookmarks.",
            });
            deleteBookmarkFn({ bookmarkId }).then(() => {
              client.invalidateQueries({ queryKey: ["get", "templates"] });
              client.invalidateQueries({
                queryKey: ["get", "bookmarked", "templates"],
              });
            });
          }
        }}
        className={cn(
          "p-2 bg-slate-100 rounded-full absolute top-2 right-2 z-50 group-hover:opacity-100 opacity-0 transition-all duration-300",
          bookmarkId && "opacity-100"
        )}
      >
        <Bookmark
          className=" cursor-pointer "
          fill={bookmarkId ? "black" : "none"}
          size={18}
        />
      </div>

      <div
        onClick={() => {
          setSelectedTemplate({ id, fields, name, description });
        }}
        className={cn(
          "md:border-r relative cursor-pointer flex flex-col justify-between h-full px-4 space-y-5 py-4 hover:bg-slate-100",
          index % 3 == 0 && "md:border-none"
        )}
      >
        <div className="space-y-2">
          <div className=" font-mono text-lg lg:text-xl"># {name}</div>

          <div className=" font-sans text-slate-600">{description}</div>
        </div>
        <div className="flex py-2 flex-wrap gap-2">
          {tags.map((tag, i) => (
            <Tag key={i} text={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
