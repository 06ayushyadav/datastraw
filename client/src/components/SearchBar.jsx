import { Search, X } from "lucide-react";

function SearchBar({
  value,
  onChange,
  onClear
}) {
  return (
    <div className="relative w-full">

      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search tickets, customers, emails..."
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={17} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;