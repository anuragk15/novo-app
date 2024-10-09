import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
// import { TextSelection } from "@tiptap/pm/state";
import { useEffect, useState } from "react";

export const ToCItem = ({ item, onItemClick }) => {
  if (item?.id == "") return;
  return (
    <div
      className={cn(
        "cursor-pointer group",
        item.tagName === "h1"
          ? "pl-0"
          : item.tagName === "h2"
          ? "pl-3"
          : item.tagName === "h3"
          ? " pl-6"
          : item.tagName === "h4"
          ? "pl-8"
          : item.tagName === "h5"
          ? "pl-10"
          : item.tagName === "h6"
          ? "pl-12"
          : "pl-0"
      )}
    >
      <a
        className={"text-slate-600 group-hover:text-black text-sm leading-3"}
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.class)}
        data-item-index={item.itemIndex}
      >
        {item.content}
      </a>
    </div>
  );
};

const ToCEmptyState = () => {
  return (
    <div className="empty-state">
      <p>Start editing your document to see the outline.</p>
    </div>
  );
};

export const SidePanelContents = ({ editor }: { editor: Editor }) => {
  const [items, setItems] = useState([]);

  const val = editor?.getText();
  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const classNames = [];

    headings.forEach((heading) => {
      classNames.push({
        tagName: heading.tagName.toLowerCase(),
        id: heading.id,
        content: heading.textContent.trim(),
        class: heading.className,
      });
    });
    setItems(classNames);
  }, [val]);
  if (items.length === 0) {
    return <ToCEmptyState />;
  }

  const onItemClick = (e, id) => {
    e.preventDefault();

    if (editor) {
      const element = document.getElementsByClassName(id);

      if (element?.length > 0) {
        element[0].scrollIntoView({ behavior: "smooth" });
      } else {
        //console.error(`Element with ID "${id}" not found.`);
      }
      return;
    }
  };

  if (items?.length < 2) {
    return null;
  }

  return (
    <div className="">
      <div className=" px-2 space-y-4 rounded-lg">
        <div className=" space-y-2">
          {items.map((item, i) => (
            <ToCItem onItemClick={onItemClick} key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
