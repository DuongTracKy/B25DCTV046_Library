import React from "react";

function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter-group">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`filter-btn ${selectedGenre === genre ? "active" : ""}`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;