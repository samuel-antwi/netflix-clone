import React, { useContext } from 'react';
import { Container, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import Navbar from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';

const VerifyEmail = () => {
  const { resendEmailVerificationLink } = useContext(AuthContext);
  return (
    <Styles>
      <Navbar />
      <Container>
        <div className='verify-email'>
          <div className='content'>
            <Alert variant='danger'>
              <p className='lead'>Email not verified</p>
              <p>
                A verification link has been sent to your Email. You will need
                to verify your email before you can start watching movies.
              </p>
            </Alert>
            <button
              onClick={resendEmailVerificationLink}
              className='btn btn-danger'
              href='/login'>
              Resend email link
            </button>
          </div>
        </div>
      </Container>
    </Styles>
  );
};

export default VerifyEmail;

const Styles = styled.div`
  .verify-email {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
`;
