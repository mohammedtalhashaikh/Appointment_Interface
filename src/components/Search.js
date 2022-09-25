import { BiSearch, BiCaretDown } from "react-icons/bi";
import { DropDown } from "./Dropdown";
import { useState } from "react";

const Search = ({
  queryString,
  onQueryChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  const [toggleSort, setToggleSort] = useState(false);
  return (
    <div className="py-5">
      <BiSearch className="inline-block" />
      <div className="inline-block w-full mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          value={queryString}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="       Search"
          onChange={(e) => {
            onQueryChange(e.target.value);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              type="button"
              className="rounded-lg justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setToggleSort(!toggleSort)}
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleSort}
              sortBy={sortBy}
              onSortByChange={(mySort) => onSortByChange(mySort)}
              orderBy={orderBy}
              onOrderByChange={(myOrder) => onOrderByChange(myOrder)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
