// Buttons1.js

import React from 'react';
import './styles.css';

function MoviePickerButtons({ onMovieMeClick, onSaveClick }) {
  return (
    <div>
      <button className="movie-me-button" onClick={onMovieMeClick}>Movie Me</button>
      <button className="save-picks-button" onClick={onSaveClick}>Save Picks</button>
    </div>
  );
}

function SavedPicksButtons({ onUpdateClick, onDeleteClick }) {
  return (
    <div>
      <button className="update-button" onClick={onUpdateClick}>Update</button>
      <button className="delete-button" onClick={onDeleteClick}>Delete</button>
    </div>
  );
}

export { MoviePickerButtons, SavedPicksButtons };
