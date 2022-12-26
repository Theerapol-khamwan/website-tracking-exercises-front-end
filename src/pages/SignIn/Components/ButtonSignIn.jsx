import React from 'react'
import { Button } from '@mui/material';

const ButtonSignIn = () => {
  return (
     <Button 
      class='bg-[#67D47F] w-64
      text-white text-lg font-semibold rounded-md
     hover:text-white 
    hover:bg-green-300 
      hover:border-transparent '
      variant='contained'
     >
       Sign In
     </Button>
  )
}

export default ButtonSignIn