// SavedPicks.js

import React, { useState } from 'react';
import { SavedPicksButtons } from './Buttons';
import axiosInstance from './axiosInstance';
import { Container, Row, Col, Card } from 'react-bootstrap';

function SavedPicks() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [updatedMovieData, setUpdatedMovieData] = useState(null);
  const [emailInput, setEmailInput] = useState('');

  const handleUpdateClick = async () => {
    // Add logic to update movie data for the selected day
    if (selectedDay && updatedMovieData) {
      // Update savedMovies array with the new movie data
      const updatedMovies = savedMovies.map((movie) =>
      movie.day === selectedDay ? { day: selectedDay, movieData: updatedMovieData } : movie
      );
      setSavedMovies(updatedMovies);
      // Clear selectedDay and updatedMovieData after update
      setSelectedDay('');
      setUpdatedMovieData(null);
    }
    };
    
    const handleDeleteClick = () => {
    // Add logic to delete movie data for the selected day
    if (selectedDay) {
      // Filter out the movie data for the selected day
      const updatedMovies = savedMovies.filter((movie) => movie.day !== selectedDay);
      setSavedMovies(updatedMovies);
      // Clear selectedDay and updatedMovieData after deletion
      setSelectedDay('');
      setUpdatedMovieData(null);
    }
    };
    
    const handleSendClick = () => {
    if (emailInput && savedMovies.length > 0) {
      // Add logic to send the movie picks to the specified email address
      const moviePicksMessage = savedMovies.map((movie) => `${movie.day}: ${movie.movieData.Title}`).join('\n');
    
      // Use axiosInstance to make an API request to send the data
      axiosInstance.post('/send-email', {
      to: emailInput,
      subject: 'My Movie Picks',
      body: moviePicksMessage,
      apikey: '9a54d3a',
      })
      .then((response) => {
        console.log('Email sent successfully:', response.data);
        // Clear emailInput after sending email
        setEmailInput('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
    }
    };
    
    return (
      <Container fluid>
        <h3 className="mt-4 mb-3">Saved Picks</h3>
        <Row>
          {savedMovies.map((movie, index) => (
            <Col key={index} xs={12} md={6} lg={4} xl={3}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{`${movie.day}: ${movie.movieData.Title}`}</Card.Title>
                  {/* Additional information about the movie can be displayed here */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xs={12} md={6} lg={4} xl={3}>
            <SavedPicksButtons onUpdateClick={handleUpdateClick} onDeleteClick={handleDeleteClick} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <form>
              {/* Include your form elements and logic here */}
              <label htmlFor="emailInput">Email:</label>
              <input
                type="email"
                id="emailInput"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button onClick={handleSendClick}>Send Email</button>
            </form>
          </Col>
        </Row>
      </Container>
    );
}
export default SavedPicks;
