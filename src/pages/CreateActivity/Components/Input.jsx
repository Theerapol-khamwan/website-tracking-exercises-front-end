export default function Input(props) {
  const { value, onChange } = props;

  return (
    <div className='my-3'>
      <label
        htmlFor='title'
        className='block text-sm font-medium text-slate-700'
      >
        Activty Name
      </label>
      <input
        type='text'
        id='input-name'
        naem='input-name'
        value={value}
        onChange={onChange}
        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-900'
      />
    </div>
  );
}
