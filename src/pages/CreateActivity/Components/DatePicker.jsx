import React from 'react';

const DatePicker = (props) => {
  const { value, onChange } = props;

  return (
    <div className='my-3'>
      <label
        htmlFor='date'
        className='block text-sm font-medium text-slate-700'
      >
      Data Activity
      </label>
      <input
        type='date'
        id='data-activity'
        name='data-activity'
        value={value}
        onChange={onChange}
        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-900'
        placeholder='Select date'
      />
    </div>
  );
};

export default DatePicker;
