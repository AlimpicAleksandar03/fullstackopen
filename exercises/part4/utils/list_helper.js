const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};
const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) =>
    favorite.likes > blog.likes ? favorite : blog,
  );
};
const mostBlogs = (blogs) => {
  const result = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) acc[blog.author] = 1;
    else acc[blog.author]++;
    return acc;
  }, {});
  const author = Object.keys(result).find(
    (key) => result[key] === Math.max(...Object.values(result)),
  );
  return {
    author,
    blogs: result[author],
  };
};
const mostLikes = (blogs) => {
  const result = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) acc[blog.author] = blog.likes;
    else acc[blog.author] += blog.likes;
    return acc;
  }, {});
  const author = Object.keys(result).find(
    (key) => result[key] === Math.max(...Object.values(result)),
  );
  return {
    author,
    likes: result[author],
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
