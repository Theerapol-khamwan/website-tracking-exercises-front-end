import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';

const Description = (props) => {
  const { value, onChange } = props;

  return (
    <>
      <Stack className='my-3'>
        <span className='block text-sm font-medium text-slate-700'>
          Description
        </span>
        <TextField
          id='description'
          name='description'
          multiline
          rows={4}
          value={value}
          onChange={onChange}
          className='mt-1 w-full py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-900 hover:border-emerald-700'
        />
      </Stack>
    </>
  );
};

export default Description;
