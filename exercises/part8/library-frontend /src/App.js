import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from "@apollo/client";
import { authorsAndBooks } from "./queries";
import LoginForm from "./components/Login";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);
  const response = useQuery(authorsAndBooks);
  console.log(token, localStorage.getItem("books-user-token"));
  if (response.loading) {
    return <p>loading...</p>;
  }
  const authors = response.data.allAuthors;
  const books = response.data.allBooks;

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors show={page === "authors"} authors={authors} />

        <Books show={page === "books"} books={books} />
        <LoginForm
          setToken={setToken}
          show={page === "login"}
          setPage={setPage}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommendations</button>
        <button
          onClick={() => {
            setToken(null);
            setPage("login");
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </div>

      <Authors show={page === "authors"} authors={authors} token={token} />
      <Recommended show={page === "recommended"} books={books} />

      <Books show={page === "books"} books={books} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
