import React, { useState } from "react";
import "./App.css";

import { initialBooks } from "./data/books.js";

import useFetch from "./hooks/useFetch.js";
import Header from "./components/Header.jsx";
import Section from "./components/Section.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import BookList from "./components/BookList.jsx";
import AddBookForm from "./components/AddBookForm.jsx";

const USE_API_MODE = true;
const MOCK_API_URL = "https://6ad9770cf89c5702ed9a9986.mockapi.io/thu-vien";

function App() {
  const [staticBooks, setStaticBooks] = useState(initialBooks);

  const {
    data: apiBooks,
    setData: setApiBooks,
    loading,
    error,
  } = useFetch(USE_API_MODE ? MOCK_API_URL : null);

  const books = USE_API_MODE ? apiBooks : staticBooks;
  const setBooks = USE_API_MODE ? setApiBooks : setStaticBooks;

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");

  const availableGenres = Array.from(new Set((books || []).map((b) => b.genre)));
  const filterGenres = ["Tất cả", ...availableGenres];

  const filteredBooks = (books || []).filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      book.author.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesGenre =
      selectedGenre === "Tất cả" || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const handleToggleFavorite = (id) => {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favId) => favId !== id)
        : [...prevIds, id]
    );
  };

  const handleDeleteBook = async (id) => {
    if (USE_API_MODE) {
      try {
        await fetch(`${MOCK_API_URL}/${id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Lỗi khi xóa trên API:", err);
      }
    }
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    setFavoriteIds((prevIds) => prevIds.filter((favId) => favId !== id));
  };

  const handleAddBook = async (newBookData) => {
    if (USE_API_MODE) {
      try {
        const response = await fetch(MOCK_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBookData),
        });
        const createdBook = await response.json();
        setBooks((prevBooks) => [createdBook, ...prevBooks]);
        return;
      } catch (err) {
        console.error("Lỗi khi thêm lên API:", err);
      }
    }

    const newBook = { ...newBookData, id: Date.now().toString() };
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  return (
    <div className="app-container">
      <Header favoriteCount={favoriteIds.length} />

      <Section>
        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Tìm kiếm theo tên sách hoặc tác giả..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <GenreFilter
            genres={filterGenres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </div>
      </Section>

      <Section title="Danh Sách Sách">
        {USE_API_MODE && loading && (
          <p className="status-bar">⏳ Đang tải dữ liệu từ MockAPI...</p>
        )}
        {USE_API_MODE && error && (
          <p className="error-message">❌ Lỗi: {error}</p>
        )}

        {(!USE_API_MODE || (!loading && !error)) && (
          <>
            <p className="status-bar">
              Đang hiển thị {filteredBooks.length} / {books.length} cuốn sách
              {USE_API_MODE ? " (Nguồn: MockAPI)" : " (Nguồn: Dữ liệu tĩnh)"}
            </p>
            <BookList
              books={filteredBooks}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onDeleteBook={handleDeleteBook}
            />
          </>
        )}
      </Section>

      <Section title="Thêm Sách Mới">
        <AddBookForm
          onAddBook={handleAddBook}
          genres={availableGenres.length > 0 ? availableGenres : ["Văn học"]}
        />
      </Section>
    </div>
  );
}

export default App;