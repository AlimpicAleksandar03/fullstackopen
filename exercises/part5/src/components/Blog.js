import React, { useState } from "react";
const Blog = ({ blog, addLike, user, deleteBlog }) => {
    const [details, setDetails] = useState(false);
    const label = !details ? "show" : "hide";
    const toggleDetails = () => setDetails(!details);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };
    return (
        <div style={blogStyle} className="blog">
            {!details ? (
                <>
                    <span>{blog.title} -</span>
                    <span>{blog.author}</span>
                </>
            ) : (
                <>
                    <div>{blog.title}</div>
                    <div>{blog.url}</div>
                    <div>
                        likes: {blog.likes}
                        <button
                            className="likeBtn"
                            onClick={() => {
                                blog.likes++;
                                addLike({
                                    likes: blog.likes,
                                    author: blog.author,
                                    title: blog.title,
                                    url: blog.url,
                                    id: blog.id,
                                });
                            }}>
                            Like
                        </button>
                    </div>
                    <div>{blog.author}</div>
                    {user.username === blog.user.username ? (
                        <button className="deleteBtn"
                            onClick={() => {
                                deleteBlog(blog);
                            }}>
                            delete
                        </button>
                    ) : (
                        ""
                    )}
                </>
            )}
            <button onClick={toggleDetails} className="show">
                {label}
            </button>
        </div>
    );
};

export default Blog;
