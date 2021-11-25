const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };
    return (
        <div style={blogStyle}>
            <p>{blog.title}</p>
            <p>By: {blog.author}</p>
            <p>Likes: {blog.likes}</p>
        </div>
    );
};

export default Blog;
