import { InputSearch } from "./InputSearch";
import { SearchResults } from "./SearchResults";

export const SearchContainer = () => {
  return (
    <div className="fixed left-4 top-4 flex w-[400px] flex-col gap-y-2 rounded-lg border border-black bg-white p-2">
      <InputSearch />
      <SearchResults />
    </div>
  );
};
