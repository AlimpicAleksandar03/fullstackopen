import React, { useState } from "react";
import { me } from "../queries";
import { useQuery } from "@apollo/client";
const Recommended = ({ show, books }) => {
  const response = useQuery(me);
  if (response.loading) return <p>loading...</p>;
  const recommendedBooks = books.filter((b) =>
    b.genres.includes(response.data.me.favoriteGenre)
  );
  console.log(books, response);
  if (!show) return null;
  return (
    <div>
      <h2>Recommended</h2>
      <p>
        Books in your favorite genre {" "}
        <strong>{response.data.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
