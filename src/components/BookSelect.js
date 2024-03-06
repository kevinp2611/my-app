import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Book from "../Book";

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function BookSelect({ value, onChange }) {
  const theme = useTheme();


  const [totalWords,setTotalWords] = useState(0)

  const handleAddBook = () => {
    onChange((prevBooks) => [
      ...prevBooks,
      { book_id: '', chapters_id: [] },
    ]);
  };

  const handleBookChange = (e, index) => {
    const bookId = e.target.value;
    onChange((prevBooks) => {
      const updatedBooks = [...prevBooks];
      updatedBooks[index] = { ...updatedBooks[index], book_id: bookId, chapters_id: [] };
      return updatedBooks;
    });
  };

  const handleChapterChange = (e, bookIndex) => {
    let chapterIds;
    if (Array.isArray(e.target.value)) {
      // If the value is already an array (e.g., from multi-select), use it directly
      chapterIds = e.target.value.map(id => id.toString().trim());
    } else {
      // Otherwise, split the value by comma
      chapterIds = e.target.value.split(',').map(id => id.toString().trim());
    }

    setTotalWords(totalWords);
    onChange((prevBooks) => {
      const updatedBooks = [...prevBooks];
      updatedBooks[bookIndex].chapters_id = chapterIds; // Assign the array of chapter IDs
      return updatedBooks;
    });
  };
  
  

  return (
    <div>
      <h3>Select Books</h3>
      {value.map((selectedBook, index) => (
        <div key={index}>
          <label>Name: </label>
          <select name="selectedBook" onChange={(e) => handleBookChange(e, index)}>
            <option value="">Select a book</option>
            {Object.values(Book).map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
          {selectedBook.book_id && (
            <div>
              <label>Chapter: </label>
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id={`chapter-label-${index}`}>Chapter</InputLabel>
                <Select
                  labelId={`chapter-label-${index}`}
                  id={`chapter-select-${index}`}
                  multiple
                  value={selectedBook.chapters_id}
                  onChange={(e) => handleChapterChange(e, index)}
                  input={<OutlinedInput label="Chapter" />}
                  MenuProps={MenuProps}
                >
                  {Book[selectedBook.book_id]?.chapters.map((chapter) => (
                    <MenuItem
                      key={chapter.id}
                      value={chapter.id}
                      style={getStyles(chapter.name, selectedBook.chapters_id, theme)}
                    >
                      {chapter.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <br />
        </div>
      ))}
      <button onClick={handleAddBook}>Add Book</button>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}

export default BookSelect;
