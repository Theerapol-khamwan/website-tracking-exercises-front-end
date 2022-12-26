export default function TimepickerStart(props) {
  const { value, onChange } = props;
  return (
    <div className="my-3">
      <label
        htmlFor="timeInput"
        className="block text-sm font-medium text-slate-700"
      >
        Time Start
      </label>
      <input
        id="start-tiem"
        name="start-tiem"
        type="time"
        value={value}
        onChange={onChange}
        className="mt-1 block w-56 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-900"
      />
    </div>
  );
}
