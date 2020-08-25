import { useState } from 'react';

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);

  const inputOptions = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  const reset = () => {
    setValue(initialState);
  };

  return [value, inputOptions, reset];
};

export default useInput;
