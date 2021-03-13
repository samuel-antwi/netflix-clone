import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import userimage2 from '../assests/images/userimage2.png';
import { AuthContext } from '../context/AuthContext';
import Movies from '../categories/Movies';
import axios from 'axios';
import { Modal, Card } from 'react-bootstrap';

const API_KEY = process.env.REACT_APP_API_KEY;
const imageBaseURL = 'https://image.tmdb.org/t/p/original/';

const LandingPage = () => {
  const { user, userName } = useContext(AuthContext);
  const [banner, setBanner] = useState({});
  const [handleShow, setHandleShow] = useState('');
  const { name, poster_path, overview } = banner;
  const [signOutButton, setSignOutButton] = useState(false);
  const { signOut } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  // Background banner when logged in. This changes on every page refresh
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`
        );
        // Get a random background poster on every page refresh
        const getRandom = Math.floor(Math.random() * response.data.results.length);
        setBanner(response.data.results[getRandom]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // A function to create an elipsis for a movies description
  const description = (overview) => {
    if (overview?.length > 10) {
      return overview.substring(0, 90) + '...';
    } else {
      return overview;
    }
  };

  // Afunction to change the navbar background when the scroll position is greater than 100px
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setHandleShow(true);
      } else {
        setHandleShow(false);
      }
      return () => {
        window.removeEventListener('scroll');
      };
    });
  }, []);

  const showSignOutButton = () => {
    setSignOutButton((signOutButton) => (signOutButton = !signOutButton));
  };

  // Showing and hidding Modal
  const handleModalClose = () => setModal(false);
  const handleModalShow = () => setModal(true);

  return (
    <React.Fragment>
      <Styles>
        <div
          style={{
            backgroundImage: `url(${imageBaseURL}${poster_path})`,
          }}
          className='landing'>
          <div className='overlay'>
            <div style={{ background: handleShow ? 'black' : null }} className='page-nav py-3'>
              <div className='page-nav-items'>
                <div>
                  <Link className='app-logo ' to={user ? 'movies' : '/'}>
                    NETFLIX
                  </Link>
                </div>
                {user && (
                  <div className='d-flex text-light'>
                    <div className='user-info'>
                      <img
                        onClick={showSignOutButton}
                        style={{
                          width: '40px',
                          cursor: 'pointer',
                          marginRight: '10px',
                        }}
                        src={userimage2}
                        alt='User Profille'
                      />
                      {!signOutButton ? (
                        <p className='mb-0'>{userName}</p>
                      ) : (
                        <p
                          className='mb-0 signout__btn text-info font-weight-bold'
                          onClick={signOut}>
                          Sign Out
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='banner-content text-white mx-5'>
              <div className='modal-wrapper'>
                <Modal show={modal} onHide={handleModalClose}>
                  <Card className='py-5'>
                    <Card.Body>
                      <p className='lead'>{overview}</p>
                      <button onClick={handleModalClose} className='btn btn-outline-secondary'>
                        Close
                      </button>
                    </Card.Body>
                  </Card>
                </Modal>
              </div>
              <div>
                <h5>{name}</h5>
                <p className=' lead'>{description(overview)}</p>
                <button onClick={handleModalShow} className='btn'>
                  More Info
                </button>
                {/* <button className='btn'>Add to list</button> */}
              </div>
            </div>
          </div>
        </div>
        <Movies />
      </Styles>
    </React.Fragment>
  );
};

export default LandingPage;

// Component style using styled-components
const Styles = styled.div`
  .btn:focus {
    outline: none;
    box-shadow: none;
  }
  .landing {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 70vh;
    width: 100%;
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 70vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .banner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    max-width: 600px;
    h5 {
      font-size: 2rem;
    }
    p {
      color: var(--text-dark);
    }
    .btn {
      background: #fff;
      font-size: 1.6rem;
      width: 12rem;
      height: 4rem;
      margin: 10px;
    }
  }

  .page-nav {
    background: transparent;
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;
    position: fixed;
    top: 0;
  }
  .page-nav-items {
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

  .user-info {
    display: flex;
    align-items: center;
  }

  .signout__btn {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .landing,
    .overlay {
      height: 80vh;
    }
    .app-logo {
      font-size: 1.3rem;
    }

    .banner-content {
    }
    .banner-content .btn {
      font-size: 1rem;
      width: 100px;
      height: 40px;
    }
    .logout-btn {
      border: none;
      font-size: 14px;
    }
    .user-info {
      flex-direction: column;
    }
  }
`;
