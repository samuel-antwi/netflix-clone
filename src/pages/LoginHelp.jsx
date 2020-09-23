import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Form, Alert } from 'react-bootstrap';
import loginhelp from '../assests/images/loginhelp.jpg';
import useInput from '../useInput';
import { useHistory } from 'react-router-dom';
import { auth } from '../services/firebase';
import NavBar from '../components/NavBar';

const LoginHelp = () => {
  const history = useHistory();
  const [email, emailInputOption, resetemail] = useInput('');
  const [error, setError] = useState('');

  // Password reset
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resetemail();
          history.push('/login');
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Styles>
      <NavBar />
      <div className='login-help'>
        <Container>
          <Form onSubmit={resetPassword}>
            <h2>Forgot Email/Password</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <p>
              Enter your email adress below and if you have an acount with us,
              we will send you an instruction on how to reset your password
            </p>
            <Form.Group>
              <Form.Control
                {...emailInputOption}
                type='email'
                placeholder='name@example.com'
              />
            </Form.Group>
            <button
              className='btn btn-block btn-primary mt-4 text-light'
              type='submit'>
              Email me
            </button>
          </Form>
        </Container>
      </div>
    </Styles>
  );
};

export default LoginHelp;

// Component styles using styled-components
const Styles = styled.div`
  .login-help {
    background: url(${loginhelp});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
    padding-top: 150px;
  }

  form {
    max-width: 550px;
    background: #fff;
    margin: auto;
    padding: 30px;
  }
  h2 {
    color: var(--light-dark);
    letter-spacing: 1px;
  }

  .logo {
    font-size: 2rem;
    color: var(--color-red);
    letter-spacing: 0.8px;
    &:hover {
      text-decoration: none;
    }
  }
  .btn {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 1.4rem;
    }
  }
`;
