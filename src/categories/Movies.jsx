import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Categories from './Categories';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;
const baseURL = 'https://api.themoviedb.org/3';

const Movies = () => {
  const { user } = useContext(AuthContext);
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [commedy, setCommedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [isLargeRow] = useState(true);
  const [trailerURL, setTrailerURL] = useState('');

  const history = useHistory();

  // Fetch Netflix original
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(`${baseURL}/discover/tv?api_key=${API_KEY}&with_networks=213`);
        setNetflixOriginals(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Fetch Trending now movies and series
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(`${baseURL}/trending/all/week?api_key=${API_KEY}`);
        setTrending(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Fetch Action Movies
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(`${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
        setAction(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Fetch Commedy Movies
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(`${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=35`);
        setCommedy(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Fetch Horror Movies
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(`${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
        setHorror(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Fetch Romance
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(
          `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
        );
        setRomance(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Get Top rated movies, series and dramas
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios(
          `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        setTopRated(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  // Youtube options
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // Play trailer
  const playTrailer = (name) => {
    // if (!user?.emailVerified) {
    //   history.push('/verify-email');
    // }
    if (trailerURL) {
      setTrailerURL('');
    } else {
      movieTrailer(name || 'breaking bad')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get('v'));
          window.scrollTo(0, 0);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <React.Fragment>
      <Styles>
        {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        <div className='main-container'>
          {/* Trending Now */}
          <div className='trending mb-5'>
            <h2 className='text-white'>Trending Now</h2>
            <div className='trending-now'>
              {trending.map((movie) => {
                return (
                  <Categories
                    playTrailer={playTrailer}
                    key={movie.id}
                    movie={movie}
                    isLargeRow={isLargeRow}
                  />
                );
              })}
            </div>
          </div>
          {/* Netflix Originals */}
          <div className='netflix mb-5'>
            <h2 className='text-white'>Netflix Originals</h2>
            <div className='netflix-originals'>
              {netflixOriginals.map((movie) => {
                return <Categories key={movie.id} movie={movie} playTrailer={playTrailer} />;
              })}
            </div>
          </div>
          {/* Top Rated */}
          <div className='top-rated mb-5'>
            <h2 className='text-white'>Top Rated</h2>
            <div className='top'>
              {topRated.map((movie) => {
                return <Categories key={movie.id} movie={movie} playTrailer={playTrailer} />;
              })}
            </div>
          </div>
          {/* Action Movies */}
          <div className='action-movies mb-5'>
            <h2 className='text-white'>Action Movies</h2>
            <div className='top'>
              {action.map((movie) => {
                return <Categories key={movie.id} movie={movie} playTrailer={playTrailer} />;
              })}
            </div>
          </div>
          {/* Commedy movies */}
          <div className='comedy-movies mb-5'>
            <h2 className='text-white'>Commedy</h2>
            <div className='top'>
              {commedy.map((movie) => {
                return <Categories key={movie.id} movie={movie} playTrailer={playTrailer} />;
              })}
            </div>
          </div>
          {/* Horror */}
          <div className='Horror-movies mb-5'>
            <h2 className='text-white'>Horror</h2>
            <div className='top'>
              {horror.map((movie) => {
                return <Categories key={movie.id} movie={movie} playTrailer={playTrailer} />;
              })}
            </div>
          </div>
          {/* Romance */}
          <div className='romance-movies mb-5'>
            <h2 className='text-white'>Romance</h2>
            <div className='top'>
              {romance.map((movie) => {
                return <Categories key={movie.id} movie={movie} playTrailer={playTrailer} />;
              })}
            </div>
          </div>
        </div>
      </Styles>
    </React.Fragment>
  );
};

export default Movies;

// Component style using styled-components
const Styles = styled.div`
  background: var(--movies);
  .netflix-originals,
  .trending-now,
  .top {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .main-container {
    padding: 30px;
  }
  @media (max-width: 600px) {
    .main-container {
      padding: 0px;
      h2 {
        padding-left: 20px;
        font-size: 1.4rem;
      }
    }
  }
`;
