import { Editor } from "@tiptap/core";
// import { TextSelection } from "@tiptap/pm/state";
import { useEffect, useState } from "react";

export const ToCItem = ({ item, onItemClick }) => {
  return (
    <div>
      <a
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.class)}
        data-item-index={item.itemIndex}
      >
        {item.content}
      </a>
    </div>
  );
};

export const ToCEmptyState = () => {
  return (
    <div className="empty-state">
      <p>Start editing your document to see the outline.</p>
    </div>
  );
};

export const ToC = ({ editor }: { editor: Editor }) => {
  const [items, setItems] = useState([]);
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
  }, [editor]);
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
        console.error(`Element with ID "${id}" not found.`);
      }
      return;
    }
  };

  return (
    <div className="hidden md:block  top-0  max-h-fit  gap-3 max-w-[12rem]">
      <div className="bg-white p-2 sticky top-3 space-y-4 border rounded-lg">
        {items.map((item, i) => (
          <ToCItem onItemClick={onItemClick} key={i} item={item} />
        ))}
      </div>
    </div>
  );
};
