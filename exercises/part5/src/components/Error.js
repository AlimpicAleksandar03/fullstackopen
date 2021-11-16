import React from "react";
const Error = ({ message }) => {
    const styles = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    if (message) return <div style={styles}>{message}</div>;
    return null;
};
export default Error;
