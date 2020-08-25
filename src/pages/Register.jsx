import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Container, Form, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useInput from '../useInput';
import { auth, db } from '../services/firebase';
import { EmailContext } from '../context/EmailContext';
import NavBar from '../components/NavBar';

const Register = () => {
  const {
    registrationEmail,
    handleChange,
    resetRegistrationEmail,
  } = useContext(EmailContext);
  const history = useHistory();
  const [username, usernameInputOption, resetUserName] = useInput('');
  const [password, passwordInputOption, resetPassword] = useInput('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (username) {
      setIsLoading(true);
      try {
        await auth()
          .createUserWithEmailAndPassword(registrationEmail, password)
          .then((cre) => {
            return db
              .collection('users')
              .doc(cre.user.uid)
              .set({
                userName: username,
              })
              .then(() => {
                const user = auth().currentUser;
                user.sendEmailVerification();
                history.push('/movies');
                resetRegistrationEmail();
                resetPassword('');
                resetUserName('');
              });
          });
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } else {
      setError('username is required!');
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <Styles>
        <Container>
          <div className='register'>
            <Form onSubmit={handleRegistration}>
              {registrationEmail ? (
                <div>
                  <h3>Final Step</h3>
                  <p>
                    You are almost there, just choose a username and password to
                    start watching.
                  </p>
                </div>
              ) : (
                <div>
                  <h3>Create an Account.</h3>
                  <p>
                    Creating an account is very simple. Just fill in the form
                    below to start watching.
                  </p>
                </div>
              )}
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form.Group>
                <Form.Control
                  {...usernameInputOption}
                  className='p-4'
                  type='text'
                  placeholder='Username'
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  //   This input field uses Email context hook which receives the user input from the home page.
                  value={registrationEmail}
                  onChange={handleChange}
                  className='p-4'
                  placeholder='Email address'
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  {...passwordInputOption}
                  className='p-4'
                  type='password'
                  placeholder='Password'
                />
              </Form.Group>
              <button
                className='btn btn-block p-3'
                type='submit'
                disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </Form>
          </div>
        </Container>
      </Styles>
    </React.Fragment>
  );
};

export default Register;

const Styles = styled.div`
  .register {
    padding-top: 150px;
  }

  form {
    max-width: 500px;
    margin: auto;
    box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.4);
    padding: 30px;
  }

  .btn {
    background: var(--color-red);
    color: #fff;
  }

  input {
    padding: 10px;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  @media (max-width: 768px) {
    .register {
      padding-top: 80px;
    }
  }
`;
