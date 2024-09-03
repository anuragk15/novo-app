import { Editor } from "@tiptap/core";
// import { TextSelection } from "@tiptap/pm/state";
import { useEffect, useState } from "react";

export const ToCItem = ({ item, onItemClick }) => {
  console.log("item", item);
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
    console.log(headings);
    headings.forEach((heading) => {
      classNames.push({
        tagName: heading.tagName.toLowerCase(),
        id: heading.id,
        content: heading.textContent.trim(),
        class: heading.className,
      });
    });
    console.log(classNames);
    setItems(classNames);
  }, [editor]);
  if (items.length === 0) {
    return <ToCEmptyState />;
  }

  const onItemClick = (e, id) => {
    e.preventDefault();

    if (editor) {
      const element = document.getElementsByClassName(id);
      console.log("element", element);
      if (element?.length > 0) {
        element[0].scrollIntoView({ behavior: "smooth" });
      } else {
        console.error(`Element with ID "${id}" not found.`);
      }
      return;
    }
  };

  return (
    <>
      {items.map((item, i) => (
        <ToCItem onItemClick={onItemClick} key={i} item={item} />
      ))}
    </>
  );
};
