import React, { useState } from "react";
import { logIn } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ setUser }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.user);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logIn({ username, password }));
        setUser(user);
    };

    return (
        <form onSubmit={handleSubmit}>
            Username:
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            Password:
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button type="submit">Login</button>
        </form>
    );
};
export default Login;
