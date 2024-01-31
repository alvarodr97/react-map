import { ChangeEvent, ElementRef, useRef } from "react";
import { useBoundStore } from "@/store/store";
import { Input } from "../ui/input";
import { Loader2, Search, X } from "lucide-react";
import { TooltipWrap } from "../TooltipWrap";

export const InputSearch = () => {
  const isLoadingPlaces = useBoundStore((state) => state.isLoadingPlaces);
  const searchPlacesByQuery = useBoundStore((state) => state.searchPlacesByQuery);
  const clearPlaces = useBoundStore((state) => state.clearPlaces);
  
  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<ElementRef<"input">>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery(e.target.value);
    }, 400);
  };

  const onClick = () => {
    clearPlaces();
    (document.getElementById("search-input") as HTMLInputElement).value = "";
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex flex-row">
      <Input
        ref={inputRef}
        id="search-input"
        type="text"
        onChange={onChange}
        placeholder={`"Parque de El Retiro"`}
        className="rounded-lg rounded-r-none focus:placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      />
      <div className="flex h-10 w-10 justify-center self-center rounded-md rounded-l-none border border-l-0">
        {!isLoadingPlaces && !inputRef.current?.value.length ? (
          <TooltipWrap side="right" tooltipText="Search">
            <Search
              onClick={() => inputRef.current?.focus()}
              className="h-full w-full cursor-pointer p-2 hover:bg-slate-200"
            />
          </TooltipWrap>
        ) : isLoadingPlaces ? (
          <Loader2 className="h-full w-full animate-spin p-2" />
        ) : (
          <TooltipWrap side="right" tooltipText="Close">
            <X
              onClick={onClick}
              className="h-full w-full cursor-pointer p-1 hover:bg-slate-200"
            />
          </TooltipWrap>
        )}
      </div>
    </div>
  );
};
