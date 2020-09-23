import React, { createContext, useState } from 'react';

// This email context allows the registration email to be accessible in other component.
// For example when the user types in the email address and click Get started from the homepage, you will see
// the email address in registration form.
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
