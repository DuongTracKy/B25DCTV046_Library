import React, { useState } from "react";

function AddBookForm({ onAddBook, genres }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: genres[0] || "Văn học",
    year: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";
    const currentYear = new Date().getFullYear();

    if (name === "title") {
      if (!value.trim()) {
        errorMsg = "Tên sách không được để trống";
      } else if (value.trim().length < 3) {
        errorMsg = "Tên sách phải có ít nhất 3 ký tự";
      }
    }

    if (name === "author") {
      if (!value.trim()) {
        errorMsg = "Tác giả không được để trống";
      }
    }

    if (name === "year") {
      const yearNum = Number(value);
      if (!value) {
        errorMsg = "Năm xuất bản không được để trống";
      } else if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
        errorMsg = `Năm xuất bản phải từ 1900 đến ${currentYear}`;
      }
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate trực tiếp khi người dùng gõ
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: validateField("title", formData.title),
      author: validateField("author", formData.author),
      year: validateField("year", formData.year),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    onAddBook({
      ...formData,
      year: Number(formData.year),
    });

    setFormData({
      title: "",
      author: "",
      genre: genres[0] || "Văn học",
      year: new Date().getFullYear(),
    });
    setErrors({});
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Tên sách:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nhập tên sách..."
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Tác giả:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Nhập tên tác giả..."
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="genre">Thể loại:</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="year">Năm xuất bản:</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
        {errors.year && <span className="error-message">{errors.year}</span>}
      </div>

      <button type="submit" className="btn-submit">
        ➕ Thêm sách
      </button>
    </form>
  );
}

export default AddBookForm;