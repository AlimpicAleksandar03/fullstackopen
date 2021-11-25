import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import { createBlog } from "./reducers/blogReducer";
import { logOut } from "./reducers/userReducer";
import { logIn } from "./reducers/userReducer";
const App = () => {
    const [user, setUser] = useState(useSelector((state) => state.user));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initialBlogs());
    }, [dispatch]);
    const blogs = useSelector((state) => state.blogs);
    console.log(user);
    return (
        <div>
            {!user ? (
                <Login setUser={setUser} />
            ) : (
                <>
                    <BlogList blogs={blogs} />
                    <BlogForm addBlog={createBlog} />
                    <button
                        onClick={() => {
                            dispatch(logOut());
                        }}>
                        Log out
                    </button>
                </>
            )}
        </div>
    );
};

export default App;
