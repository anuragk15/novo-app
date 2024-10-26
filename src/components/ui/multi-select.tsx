"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "./use-toast";

export function MultipleSelector({
  frameworks = [],
  maxLength = 100,
  totalList,
  setFrameworks,
  placeholder,
  noItemsFoundPlaceholder,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>(frameworks || []);
  const { toast } = useToast();
  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
      setFrameworks(value.filter((item) => item !== val));
    } else {
      if (maxLength && value.length >= maxLength) {
        toast({
          title: `You can only select upto ${maxLength}`,
          variant: "destructive",
        });
        return;
      }
      setValue((prevValue) => [...prevValue, val]);
      setFrameworks((prevValue) => [...prevValue, val]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {
                      totalList.find((framework) => framework.label === val)
                        ?.label
                    }
                  </div>
                ))
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] md:w-[730px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{noItemsFoundPlaceholder}</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {totalList.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    handleSetValue(framework.label);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(framework.label)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
