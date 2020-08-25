import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import styled from 'styled-components';
import NavBar from '../components/NavBar';

const ResendEmailLinkSuccess = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Styles>
        <Container>
          <div className='email__success'>
            <Alert className='text-center lead' variant='success'>
              An email verification link has been sent to your email
            </Alert>
          </div>
        </Container>
      </Styles>
    </React.Fragment>
  );
};

export default ResendEmailLinkSuccess;

const Styles = styled.div`
  .email__success {
    padding-top: 200px;
    max-width: 400px;
    margin: auto;
  }
`;
