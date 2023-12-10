// MovieDetailsModal.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MovieDetailsModal({ show, onHide, movieData }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movieData.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display other movie details here */}
        <p>{movieData.Year}</p>
        {/* Add more details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieDetailsModal;
