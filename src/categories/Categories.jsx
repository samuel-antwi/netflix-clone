import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const imageBaseURL = 'https://image.tmdb.org/t/p/original/';

const Categories = ({ isLargeRow, playTrailer, movie }) => {
  if (!Object.keys(movie).length) {
    return 'loading...';
  }

  return (
    <React.Fragment>
      <Styles>
        <Card onClick={() => playTrailer(movie.name)} className='mx-1'>
          <Card.Img
            variant='top'
            src={
              isLargeRow
                ? `${imageBaseURL}${movie.poster_path}`
                : `${imageBaseURL}${movie.backdrop_path}`
            }
          />
        </Card>
      </Styles>
    </React.Fragment>
  );
};

export default Categories;

const Styles = styled.div`
  .card {
    position: relative;
    cursor: pointer;
    width: 19rem;
    border: none !important;
    transition: all 0.3s ease-in-out;
    object-fit: contain;
    &:hover {
      transform: scale(1.08);
    }
  }

  .addTo-list {
    position: absolute;
    color: #fff;
    background: var(--color-red);
    border-radius: 50px;
    border: none;
    padding: 4px 10px;
    bottom: -100px;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  @media (max-width: 600px) {
    .card {
      width: 8rem;
    }
  }
`;
