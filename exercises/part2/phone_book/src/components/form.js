import React from "react";
const PersonForm = ({ name, number, updateName, updateNumber, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <label>
                Name: <input value={name} onChange={updateName} />
            </label>
            <label>
                Number: <input value={number} onChange={updateNumber} />
            </label>
            <button type="submit">Add</button>
        </form>
    );
};

export default PersonForm;
