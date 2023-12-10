// MoviePicker.js

import React, { useState, useEffect, useRef } from 'react';
import DayMovieCard from './DayMovieCard';
import { MoviePickerButtons, SavedPicksButtons } from './Buttons';
import axiosInstance from './axiosInstance';
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function MoviePicker() {
  const [selectedDay, setSelectedDay] = useState('');
  const [movieData, setMovieData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [savedPicks, setSavedPicks] = useState([]);
  const countdownIntervalRef = useRef(null);
  const [countdown, setCountdown] = useState();
  

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  const handleMovieMeClick = async () => {
    setCountdown(2);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    try {
      setTimeout(async () => {
        clearInterval(countdownIntervalRef.current);

        const newMovieData = {};

        for (const day of daysOfWeek) {
          const searchTerm = 'movie';
          const randomPage = Math.floor(Math.random() * 100) + 1;
          const response = await axiosInstance.get(`/?s=${searchTerm}&type=movie&r=json&page=${randomPage}`);

          console.log(`API Response for ${day}:`, response);

          if (response.data && response.data.Response === 'True') {
            const randomMovie = response.data.Search[Math.floor(Math.random() * response.data.Search.length)];

            console.log(`Random Movie for ${day}:`, randomMovie);

            if (randomMovie) {
              preloadImage(randomMovie.Poster);
              newMovieData[day] = randomMovie;
            } else {
              console.error(`No movies found for ${day}.`);
            }
          } else {
            console.error(`Invalid response from the movie search API for ${day}:`, response);
          }
        }

        setMovieData(newMovieData);
      }, 2000);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleSaveClick = () => {
    if (selectedDay && movieData[selectedDay]) {
      const updatedPicks = [...savedPicks];
      const updatedMovie = movieData[selectedDay];

      const indexToUpdate = updatedPicks.findIndex((movie) => movie.imdbID === updatedMovie.imdbID);

      if (indexToUpdate !== -1) {
        updatedPicks[indexToUpdate] = updatedMovie;
      } else {
        updatedPicks.push(updatedMovie);
      }

      setSavedPicks(updatedPicks);
    }
  };

  const handleUpdateClick = () => {
    if (selectedDay && savedPicks.length > 0) {
      const updatedPicks = [...savedPicks];
      const updatedMovie = movieData[selectedDay];

      const indexToUpdate = updatedPicks.findIndex((movie) => movie.imdbID === updatedMovie.imdbID);

      if (indexToUpdate !== -1) {
        updatedPicks[indexToUpdate] = updatedMovie;
        setSavedPicks(updatedPicks);
      }
    }
  };

  const handleDeleteClick = () => {
    if (selectedDay && savedPicks.length > 0) {
      const updatedPicks = savedPicks.filter((movie) => movie.imdbID !== movieData[selectedDay].imdbID);
      setSavedPicks(updatedPicks);
      handleHideModal(); // Close the modal after deletion
    }
  };

  const handleSavedPicksMouseEnter = (day) => {
    setSelectedDay(day);
    handleShowModal(); // Call handleShowModal instead of setting showModal directly
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const fetchAdditionalData = async () => {
    try {
      const additionalDataResponse = await axiosInstance.get(
        `/?i=${movieData[selectedDay]?.imdbID}&plot=full&r=json`
      );
      setAdditionalData(additionalDataResponse.data);
    } catch (error) {
      console.error('Error fetching additional movie data:', error);
    }
  };

  useEffect(() => {
    if (movieData && selectedDay) {
      fetchAdditionalData();
    }
  }, [movieData, selectedDay]);

  return (
    <Container fluid>
      <h3 className="mt-4 mb-3">Movie Picker</h3>
      <MoviePickerButtons onMovieMeClick={handleMovieMeClick} onSaveClick={handleSaveClick} />
      <Row>
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>
          {countdown > 0 && <p className="text-muted">Movie Me countdown: {countdown}s</p>}
        </Col>
      </Row>
      <Row className="days-container">
        {daysOfWeek.map((day) => (
          <Col key={day} xs={12} sm={6} md={4} lg={3} xl={2}>
            <DayMovieCard day={day} movieData={movieData} setMovieData={setMovieData} />
          </Col>
        ))}
      </Row>
      {movieData[selectedDay] && (
        <div>
          <img
            id="movieImage"
            src={movieData[selectedDay].Poster}
            alt={movieData[selectedDay].Title}
            className="img-fluid mt-3 mb-3"
            onMouseEnter={handleSavedPicksMouseEnter}
          />
          <Modal show={showModal} onHide={handleHideModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{movieData[selectedDay].Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {additionalData && (
                <>
                  <p>Genre: {additionalData.Genre}</p>
                  <p>Director: {additionalData.Director}</p>
                  <p>Plot: {additionalData.Plot}</p>
                  {/* Add more details as needed */}
                </>
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
      <div className="saved-picks mt-4">
        {/* ... (existing code) */}
      </div>
    </Container>
  );
}

export default MoviePicker;