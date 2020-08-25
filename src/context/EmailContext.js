import React, { createContext, useState } from 'react';

export const EmailContext = createContext();
const EmailContextProvider = (props) => {
  const [registrationEmail, setRegistrationEmail] = useState('');

  const handleChange = (e) => {
    setRegistrationEmail(e.target.value);
  };
  const resetRegistrationEmail = () => {
    setRegistrationEmail('');
  };
  return (
    <EmailContext.Provider
      value={{ registrationEmail, handleChange, resetRegistrationEmail }}>
      {props.children}
    </EmailContext.Provider>
  );
};

export default EmailContextProvider;
