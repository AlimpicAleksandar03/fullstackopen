import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);
    console.log(user)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const user = await loginService.login({ username, password });
            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(user)
            );
            setUser(user);
            setPassword("");
            setUsername("");
        } catch (exception) {
            setError("Wrong username or password");
            setTimeout(() => {
                setError(null);
            }, 2500);
        }
    };
    const loginForm = () => {
        return (
            <>
                <h2>Login to the application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </>
        );
    };
    const blogList = () => {
        return (
            <div>
                <h2>Blogs</h2>
                {blogs.map((blog) => (
                    <Blog blog={blog} key={blog.id} />
                ))}
            </div>
        );
    };
    const addBlog = async (e) => {
        e.preventDefault();

        const blog = await blogService.createBlog(
            { title, author, url },
            { headers: { Authorization: `bearer ${user.token}` } }
        );
        setBlogs([blog].concat(blogs));
        setNotification(`a new blog: ${blog.title} by ${blog.author} is added`);
        setTimeout(() => {
            setNotification(null);
        }, 2500);
    };
    const blogForm = () => {
        return (
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        value={title}
                        type="text"
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        type="text"
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        value={url}
                        type="text"
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        );
    };
    const logOut = () => {
        return (
            <button
                onClick={(e) => {
                    window.localStorage.removeItem("loggedNoteappUser");
                    setUser(null);
                }}
            >
                Log out
            </button>
        );
    };
    return (
        <div>
            {!user ? (
                loginForm()
            ) : (
                <div>
                    <p style={{ display: "inline", marginRight: 10 }}>
                        {user.username} logged-in
                    </p>
                    {logOut()}
                    {blogForm()}
                    {blogList()}
                </div>
            )}
            <Notification message={notification} />
            <Error message={error} />
        </div>
    );
};

export default App;
