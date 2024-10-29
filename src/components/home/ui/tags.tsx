/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateColorsFromInitial } from "@/lib/utils";
import {
  addTagToDocument,
  removeTagFromDocument,
} from "@/api/functions/documents";

export default function TagsDropdown({
  addNewTag,
  documentId,
  projectId,
  appliedTags,
  fileCard = false,
  tags,
}) {
  const [selectedItems, setSelectedItems] = React.useState<any>(
    appliedTags ?? []
  );
  const handleItemToggle = async (itemId: string) => {
    const itemsArray = [...selectedItems];
    const itemIndex = itemsArray.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      await removeTagFromDocument({ tagId: itemId, projectId, documentId });
      // If the item exists, remove it from the array
      itemsArray.splice(itemIndex, 1);
      // //console.log(`Item with id ${itemId} removed.`);
    } else {
      await addTagToDocument({ tagId: itemId, projectId, documentId });
      // If it doesn't exist, add the new object to the array
      itemsArray.push(tags.find((item) => item.id === itemId));
      //  //console.log(`Item with id ${itemId} added.`);
    }

    setSelectedItems(itemsArray);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {selectedItems?.length == 0 ? (
            fileCard ? (
              <Button variant="ghost" className="p-0 m-0 text-xs text-slate-700 hover:text-black justify-between">
                Add tag
              </Button>
            ) : (
              <Button variant="ghost" className="p-0 m-0 justify-between">
                Select
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            )
          ) : (
            <div className=" flex gap-2">
              {selectedItems?.map((item, i) => {
                const { background, text } = generateColorsFromInitial(
                  item?.tag
                );

                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: background,
                      color: text,
                    }}
                    className="p-1 rounded-lg"
                  >
                    {item?.tag}
                  </div>
                );
              })}
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px] z-30">
          <DropdownMenuLabel className="px-2">Tags</DropdownMenuLabel>

          <DropdownMenuSeparator />
          {tags?.length > 0 &&
            tags?.map((item) => {
              const { background, text } = generateColorsFromInitial(item.tag);

              return (
                <DropdownMenuCheckboxItem
                  key={item.id}
                  checked={
                    selectedItems.findIndex((v) => v.id === item.id) != -1
                  }
                  onCheckedChange={() => handleItemToggle(item.id)}
                  className="px-2 cursor-pointer"
                >
                  <Checkbox
                    checked={
                      selectedItems.findIndex((v) => v.id === item.id) != -1
                    }
                    onCheckedChange={() => handleItemToggle(item.id)}
                    className="mr-2 h-4 w-4"
                  />
                  <div
                    style={{
                      backgroundColor: background,
                      color: text,
                    }}
                    className="p-1 rounded-lg"
                  >
                    {item.tag}
                  </div>
                </DropdownMenuCheckboxItem>
              );
            })}
          <DropdownMenuCheckboxItem
            key={"new"}
            onClick={() => addNewTag(true)}
            className="px-2 flex gap-2 cursor-pointer"
          >
            <Plus size={14} />
            <p>Add new tag</p>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
