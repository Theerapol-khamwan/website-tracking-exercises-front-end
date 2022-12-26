export default function UploadPhoto(props) {
  return (
    <div className='App'>
      <label htmlFor='title' className='block text-sm font-medium text-white'>
        Upload Photo
      </label>

      <input
        type='file'
        onChange={props.onChange}
        className='block w-full text-sm text-slate-700
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-green-200 file:text-green-700
        hover:file:bg-green-800 hover:file:text-white'
      />
    </div>
  );
}
