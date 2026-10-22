import BookCard from "./BookCard.jsx";

function BookList({ books, favoriteIds, onToggleFavorite, onDeleteBook }) {
  if (books.length === 0) {
    return <p className="status-bar">Không tìm thấy cuốn sách nào phù hợp.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favoriteIds.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDeleteBook}
        />
      ))}
    </div>
  );
}

export default BookList;