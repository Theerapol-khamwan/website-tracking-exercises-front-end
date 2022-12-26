import { useState } from 'react';

const useFormValidation = (validateValue) => {
  // Input Name
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Check Name Input นั้นถูกต้องหรือไม่
  const valueIsValid = validateValue(enteredValue); // ถูกต้อง
  const hasError = !valueIsValid && isTouched; // ไม่ถูกต้อง

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: inputBlurHandler,
    reset: reset,
  };
};

export default useFormValidation;
