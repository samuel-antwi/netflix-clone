import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import homebg from '../assests/images/homebg.png';
import { Container } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { EmailContext } from '../context/EmailContext';
import NavBar from '../components/NavBar';

const HomePage = () => {
  const { registrationEmail, handleChange } = useContext(EmailContext);
  const [error, setError] = useState('');

  const history = useHistory();

  // Check if email is valid whilst user is typing...

  window.addEventListener('keyup', () => {
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    if (registrationEmail.length >= 4 && !validateEmail(registrationEmail)) {
      setError('Enter a valid email');
    } else {
      setError('');
    }
  });

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateEmail(registrationEmail)) {
      history.push('/register');
    } else if (!registrationEmail) {
      setError('Email is equired');
    } else if (!validateEmail(registrationEmail)) {
      setError('Enter a valid email address');
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <Styles>
        <div className='home-page'>
          <div className='overlay'>
            <Container>
              <div className='home__page__wrapper'>
                <h1 className='display-2 font-weight-bold'>
                  Unlimited films, TV programmes and more.
                </h1>
                <p className=' mb-2 lead'>Watch anywhere. Cancel at anytime.</p>
                <form onSubmit={handleRegister}>
                  <div className='form__group'>
                    <input
                      //    This input field uses email context hook which passes the user input to the registration form
                      value={registrationEmail}
                      onChange={handleChange}
                      type='text'
                      placeholder='Email address'
                      className='form__group__input mt-3'
                    />
                    {error && (
                      <small className='error-message text-warning mb-1 d-block d-sm-none'>
                        {error}
                      </small>
                    )}
                    <button type='submit' className='mb-2 mt-3'>
                      GET STARTED <BsChevronRight size='1.4rem' />
                    </button>
                  </div>
                  {error && (
                    <small className='error-message mt-2 text-warning d-none d-sm-block'>
                      {error}
                    </small>
                  )}
                </form>
                <h4 className=' py-3'>
                  Ready to watch? Enter your email to get started.
                </h4>
              </div>
            </Container>
          </div>
        </div>
      </Styles>
    </React.Fragment>
  );
};

export default HomePage;
const Styles = styled.div`
  .home-page {
    background: url(${homebg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .home__page__wrapper {
    padding: 200px 0px;
    display: flex;
    flex-direction: column;
    color: #fff;
    justify-content: center;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .form__group {
    display: flex;
  }

  .form__group__input {
    padding: 0px 20px;
    height: 60px;
    border: none;
    color: black;
    font-size: 1.5rem;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  button {
    height: 60px;
    border: none;
    background: var(--color-red);
    color: var(--text-light);
    font-size: 1.5rem;
    &:focus {
      outline: none;
    }
  }
  .error-message {
    font-size: 16px;
  }

  @media (max-width: 600px) {
    .home__page__wrapper h1 {
      font-size: 2rem;
    }
    .form__group {
      flex-direction: column;
    }
    button,
    .form__group__input {
      height: 45px;
      font-size: 1rem;
    }
  }
`;
