import React, { useState } from "react";
import PropTypes from "prop-types";
const Togglable = ({ children, label }) => {
    const [visible, setvisible] = useState(false);
    const toggleVisible = () => setvisible(!visible);
    const show = { display: visible ? "none" : "" };
    const hide = { display: !visible ? "none" : "" };
    return (
        <div>
            <div style={show}>
                <button onClick={toggleVisible}>{label}</button>
            </div>
            <div style={hide}>
                {children} <button onClick={toggleVisible}>Cancel</button>
            </div>
        </div>
    );
};
Togglable.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Togglable;
