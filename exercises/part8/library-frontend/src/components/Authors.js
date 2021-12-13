import React, { useState } from "react";
import { authorMutation } from "../queries";
import { useMutation } from "@apollo/client";
import { authorsAndBooks } from "../queries";

const Authors = ({ show, authors, token }) => {
  const [name, setName] = useState("");
  const [setBornTo, setYear] = useState("");
  const [changeAuthor] = useMutation(authorMutation, {
    refetchQueries: [{ query: authorsAndBooks }],
  });
  const editAuthor = async (e) => {
    e.preventDefault();
    await changeAuthor({ variables: { name, setBornTo } });
    setName("");
    setYear("");
  };
  console.log(name);
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!token ? null : (
        <form onSubmit={editAuthor}>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setYear(Number(target.value))}
          />
          <button type="submit">Change</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
