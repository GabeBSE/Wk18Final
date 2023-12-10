// DayMovieCard.js

import React, { useState } from 'react';
import MovieDetailsModal from './MovieDetailsModal'; // Import the new modal component

function DayMovieCard({ day, movieData, setMovieData }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="day-movie-card" onClick={handleShowModal}>
      <h5>{day}</h5>
      {movieData[day] && (
        <>
          <img
            className="movie-thumbnail"
            src={movieData[day]?.Poster}
            alt={movieData[day]?.Title}
          />
          {/* MovieDetailsModal component for displaying movie details */}
          <MovieDetailsModal
            show={showModal}
            onHide={handleCloseModal}
            movieData={movieData[day]}
          />
        </>
      )}
    </div>
  );
}

export default DayMovieCard;
