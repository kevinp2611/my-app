import React from 'react';

function SaveButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>Save</button>
    </div>
  );
}

export default SaveButton;