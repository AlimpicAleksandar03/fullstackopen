import React, { useState } from "react";
const Books = ({ show, books }) => {
  const [filterGenre, setFilter] = useState("");
  if (!show) {
    return null;
  }
  const booksToRender = !filterGenre
    ? books
    : books.filter((book) => book.genres.includes(filterGenre));
  const genres = books
    .reduce((acc, book) => acc.concat(book.genres), [])
    .reduce((acc, genre) => {
      if (!acc.includes(genre)) acc.push(genre); // remove all duplicates
      return acc;
    }, []);

  return (
    <div>
      <h2>books</h2>
      {!filterGenre ? null : (
        <p>
          in genre <strong>{filterGenre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToRender.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={generateId()} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter("")}>All</button>
      </div>
    </div>
  );
};

const generateId = () => {
  return Math.random() * 100000;
};

export default Books;
