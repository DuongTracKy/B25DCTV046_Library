import React from "react";

function Section({ title, children }) {
  return (
    <section className="section-container">
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
}

export default Section;