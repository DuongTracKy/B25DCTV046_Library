import React from "react";

function BookCard({ book, isFavorite, onToggleFavorite, onDelete }) {
  return (
    <div className="book-card">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p><strong>Mã sách:</strong> {book.id}</p>
        <p><strong>Tác giả:</strong> {book.author}</p>
        <p><strong>Năm XB:</strong> {book.year}</p>
        <span className="book-tag">{book.genre}</span>
      </div>

      <div className="card-actions">
        <button
          className={`btn-favorite ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? "❤️ Đã thích" : "🤍 Yêu thích"}
        </button>
        
        <button
          className="btn-delete"
          onClick={() => onDelete(book.id)}
        >
          🗑️ Xóa
        </button>
      </div>
    </div>
  );
}

export default BookCard;