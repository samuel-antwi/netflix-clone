import React, { useState } from 'react';
import styled from 'styled-components';
import homebg from '../assests/images/homebg.png';
import { Container, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import useInput from '../useInput';
import { auth } from '../services/firebase';
import NavBar from '../components/NavBar';

const Login = () => {
  const history = useHistory();
  const [email, emailInputOption, resetEmail] = useInput('');
  const [password, passwordInputOption, resetPassword] = useInput('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          const user = auth().currentUser;
          if (user.emailVerified) {
            history.push('/movies');
            resetEmail();
            resetPassword();
          } else {
            history.push('/verify-email');
          }
        });
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <Styles>
        <div className='login'>
          <div className='overlay'>
            <Container>
              <div className='signin-form'>
                <Form onSubmit={handleLogin}>
                  <h1 className='my-4'>Sign In</h1>
                  {error && <Alert variant='danger'>{error}</Alert>}
                  <Form.Group>
                    <Form.Control
                      {...emailInputOption}
                      placeholder='Your email'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      {...passwordInputOption}
                      type='password'
                      placeholder='Password'
                    />
                  </Form.Group>
                  <button
                    type='submit'
                    className='btn btn-block'
                    disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                  <div className='d-flex justify-content-between'>
                    <div className='form-check'>
                      <input type='checkbox' className='form-check-input' />
                      <label className='form-check-label pt-4 text-muted'>
                        Remember me
                      </label>
                    </div>
                    <div className='pt-4'>
                      <Link className='text-light' to='LoginHelp'>
                        Need Help?
                      </Link>
                    </div>
                  </div>
                  <div className='py-3'>
                    <p className='lead text-muted'>
                      New to Netlifix?
                      <Link
                        className='text-white ml-2 font-weight-bold'
                        to='register'>
                        Sign up now
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      </Styles>
    </React.Fragment>
  );
};

export default Login;

const Styles = styled.div`
  .login {
    background: url(${homebg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding-top: 150px;
  }

  .signin-form {
    background: rgba(0, 0, 0, 0.8);
    max-width: 600px;
    height: auto;
    margin: auto;
    input {
      background: white !important;
      padding: 20px;
      height: 65px;
      &:focus {
        outline: none;
        box-shadow: none !important;
      }
    }
  }
  form {
    padding: 40px;
    h1 {
      color: var(--text-light);
    }
  }
  form .btn {
    background: var(--color-red);
    color: var(--text-light);
    font-size: 20px;
    height: 65px;
  }

  @media (max-width: 600px) {
    form {
      padding: 30px;
    }
  }
`;
