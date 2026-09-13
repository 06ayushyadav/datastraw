function StatusFilter({
  value,
  onChange
}) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
    >
      <option value="">
        All Status
      </option>

      <option value="Open">
        Open
      </option>

      <option value="In Progress">
        In Progress
      </option>

      <option value="Closed">
        Closed
      </option>
    </select>
  );
}

export default StatusFilter;