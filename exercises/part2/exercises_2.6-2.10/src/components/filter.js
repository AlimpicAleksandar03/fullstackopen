import React from "react";
const Filter = ({ updateFilter }) => {
    return (
        <label>
            Filter: <input onChange={updateFilter} />
        </label>
    );
};
export default Filter;
