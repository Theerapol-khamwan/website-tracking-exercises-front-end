import React from 'react';
import { Button } from '@mui/material';

const ButtonForgotPass = () => {
  return (
    <Button
      class='bg-transparent w-64 mt-1
      text-[#67D47F] text-lg font-semibold rounded-md
      border-2 border-[#67D47F]
     hover:text-white 
    hover:bg-green-300 
      hover:border-transparent '
      variant='contained'
    >
      Forgot Password?
    </Button>
  );
};

export default ButtonForgotPass;
