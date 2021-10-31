import React from "react";
const Notification = ({ message }) => {
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
    if (message === null) {
        return null;
    }
    return (
        <div className="message" style={styles}>
            {message}
        </div>
    );
};
export default Notification;
