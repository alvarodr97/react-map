import { useState } from "react";
import { InputSearch } from "./InputSearch";
import { SearchResults } from "./SearchResults";

export const SearchContainer = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="fixed flex w-full flex-col gap-y-2 bg-white p-2 sm:left-4 sm:top-4 sm:w-[400px] sm:rounded-lg sm:border sm:border-black">
      <InputSearch setIsInputFocused={setIsInputFocused} />
      <SearchResults isInputFocused={isInputFocused} />
    </div>
  );
};
