import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');

  const history = useHistory();

  // Setting a user
  useEffect(() => {
    const getUser = async () => {
      await auth().onAuthStateChanged((userAuth) => {
        if (userAuth) {
          setUser(userAuth);
        } else {
          setUser(null);
        }
      });
    };
    getUser();
  }, []);

  // Setting username
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (user) {
              setUserName(doc.data().userName);
            }
          });
      }
    });
  });

  // User Logout
  const signOut = () => {
    auth().signOut();
    history.push('/');
  };

  const resendEmailVerificationLink = async () => {
    const user = await auth().currentUser;
    user.sendEmailVerification();
    history.push('/success');
  };

  return (
    <AuthContext.Provider
      value={{
        resendEmailVerificationLink,
        user,
        signOut,
        userName,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
