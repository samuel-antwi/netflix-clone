import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Styles>
      <div className='main-nav py-4'>
        <div className='main-nav-items'>
          <a className='app-logo ' href={user ? 'movies' : '/'}>
            NETFLIX
          </a>
          {!user && (
            <Link className='btn' to='/login'>
              Login
            </Link>
          )}
        </div>
      </div>
    </Styles>
  );
};

export default NavBar;

const Styles = styled.div`
  .main-nav {
    background: transparent;
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;
  }
  .main-nav-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90%;
    margin: 0px auto;
  }
  .app-logo {
    color: red;
    font-size: 2rem;
    letter-spacing: 1.2px;
    &:hover {
      text-decoration: none;
    }
  }

  .btn {
    border: none;
    background: var(--color-red);
    color: var(--text-light);
    padding: 8px 24px;
    font-size: 20px;
    &:focus {
      outline: none;
      box-shadow: none;
    }

    a {
      color: #fff;
      &:hover {
        text-decoration: none;
      }
    }
  }

  @media (max-width: 768px) {
    .btn {
      font-size: 18px;
      padding: 4px 12px;
    }
    .app-logo {
      font-size: 1.4rem;
    }
  }
`;
