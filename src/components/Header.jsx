import React from "react";

function Header({ favoriteCount }) {
  return (
    <header className="header">
      <h1>📚 Quản Lý Thư Viện</h1>
      <div className="favorite-badge">
        ❤️ Yêu thích: {favoriteCount}
      </div>
    </header>
  );
}

export default Header;