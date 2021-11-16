import React from "react";

const Notification = ({ message }) => {
    if (!message) return null;
    const styles = {
        color: "green",
        fontStyle: "italic",
        fontSize: 16,
        padding: 20,
        border: "4px solid green",
        borderRadius: 10,
        margin: 10,
        textTransform: "uppercase",
    };
    return <div style={styles}>{message}</div>;
};

export default Notification;
