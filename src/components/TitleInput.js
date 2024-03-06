// components/TitleInput.js

import React from 'react';

function TitleInput({ value, onChange }) {
  return (
    <div>
      <h3>Title of Your Plan</h3>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default TitleInput;
