import usePlacesStore from "@/zustand/placeStore";
import { ChangeEvent, ElementRef, useRef } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export const InputSearch = () => {
  const { searchPlacesByQuery } = usePlacesStore();

  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<ElementRef<"input">>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery(e.target.value);
    }, 400);
  };

  return (
    <div className="relative flex flex-row items-center">
      <Input
        ref={inputRef}
        type="text"
        onChange={onChange}
        placeholder={`"Madrid"`}
        className="rounded-lg focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
      />
      <Search className="absolute right-3" />
    </div>
  );
};
