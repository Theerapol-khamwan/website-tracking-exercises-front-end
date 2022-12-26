import React from 'react';

const SelectSport = (props) => {
  const { value, onChange } = props;

  return (
    <div>
      <label
        htmlFor='countries'
        className='block text-sm font-medium text-slate-700'
      >
        Activity type
      </label>

      <select
        id='activity-type'
        name='activity-type'
        value={value}
        onChange={onChange}
        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-900'
      >
        <option value=''>Activity type</option>
        <option value='Run'>Run</option>
        <option value='Bicycle ride'>Bicycle ride</option>
        <option value='Swim'>Swim</option>
        <option value='Walk'>Walk</option>
        <option value='Hike'>Hike</option>
      </select>
    </div>
  );
};

export default SelectSport;
