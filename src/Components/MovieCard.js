// MovieCard.js

import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

function MovieCard({ movieData }) {
  const [hovered, setHovered] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch additional movie details on hover
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get(`/?i=${movieData.imdbID}&apikey=9a54d3a`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (hovered && movieData) {
      fetchMovieDetails();
    }

    return () => {
      // Cleanup: clear movie details when not hovered
      setMovieDetails(null);
    };
  }, [hovered, movieData]);

  return (
    <div
      className="day-movie-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {movieData && (
        <>
          <img
            className="movie-thumbnail"
            src={movieData.Poster}
            alt={movieData.Title}
          />
          {hovered && (
            <div className="movie-details">
              <h4>{movieData.Title}</h4>
              <p>{movieData.Year}</p>
              {movieDetails && (
                <div>
                  <p>Genre: {movieDetails.Genre}</p>
                  <p>Director: {movieDetails.Director}</p>
                  <p>Plot: {movieDetails.Plot}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieCard;
