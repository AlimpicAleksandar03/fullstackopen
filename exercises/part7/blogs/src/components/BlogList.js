import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs
                .sort((b1, b2) => b2.likes - b1.likes)
                .map((blog) => (
                    <Blog blog={blog} key={blog.id} />
                ))}
        </div>
    );
};
export default BlogList;
