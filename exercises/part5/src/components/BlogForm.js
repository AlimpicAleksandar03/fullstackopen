import React, { useState } from "react";

const BlogForm = ({ addBlog }) => {
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const createBlog = (e) => {
        e.preventDefault();
        const blog = { url, author, title };
        addBlog(blog);
        setTitle("");
        setAuthor("");
        setUrl("");
    };
    return (
        <form onSubmit={createBlog}>
            <div>
                title
                <input
                    id="title"
                    value={title}
                    type="text"
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                    id="author"
                    value={author}
                    type="text"
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                    id="url"
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
export default BlogForm;
