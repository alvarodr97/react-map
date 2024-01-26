import { InputSearch } from "./InputSearch";
import { SearchResults } from "./SearchResults";

export const SearchContainer = () => {
  return (
    <div className="fixed w-[400px] top-5 left-4 flex flex-col gap-y-3 bg-white p-2 border border-black rounded-lg">
      <InputSearch />
      <SearchResults />
    </div>
  );
};
