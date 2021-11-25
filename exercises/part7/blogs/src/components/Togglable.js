import React, { useState } from "react";
const Togglable = ({ children, label }) => {
    const [visible, setvisible] = useState(false);
    const toggleVisible = () => setvisible(!visible);
    const show = { display: visible ? "none" : "" };
    const hide = { display: !visible ? "none" : "" };
    return (
        <div>
            <div style={show}>
                <button onClick={toggleVisible} id="createBtn">
                    {label}
                </button>
            </div>
            <div style={hide}>
                {children} <button onClick={toggleVisible}>Cancel</button>
            </div>
        </div>
    );
};
export default Togglable;
