import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

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
                {blogs
                    .sort((b1, b2) => b2.likes - b1.likes)
                    .map((blog) => (
                        <Blog
                            blog={blog}
                            key={blog.id}
                            addLike={increaseLike}
                            user={user}
                            deleteBlog={removeBlog}
                        />
                    ))}
            </div>
        );
    };
    const addBlog = async (blog) => {
        const createdBlog = await blogService.createBlog(blog, {
            headers: { Authorization: `bearer ${user.token}` },
        });
        setBlogs([createdBlog].concat(blogs));
        window.location.reload(false);
        setNotification(
            `a new blog: ${createdBlog.title} by ${createdBlog.author} is added`
        );
        setTimeout(() => {
            setNotification(null);
        }, 2500);
    };
    const logOut = () => {
        return (
            <button
                onClick={() => {
                    window.localStorage.removeItem("loggedNoteappUser");
                    setUser(null);
                }}
            >
                Log out
            </button>
        );
    };
    const increaseLike = async (blog) => {
        const updatedBlog = await blogService.addLike(blog);
        setBlogs([updatedBlog].concat(blogs.filter((b) => b.id !== blog.id)));
    };
    const removeBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            await blogService.deleteBlog(blog, {
                headers: { Authorization: `bearer ${user.token}` },
            });
            setBlogs(blogs.filter((b) => b.id !== blog.id));
        }
        return;
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
                    {
                        <Togglable label="Create New Blog">
                            <BlogForm addBlog={addBlog} />
                        </Togglable>
                    }
                    {blogList()}
                </div>
            )}
            <Notification message={notification} />
            <Error message={error} />
        </div>
    );
};

export default App;
