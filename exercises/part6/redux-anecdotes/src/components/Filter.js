import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (event) => {
    const value = event.target.value;
    props.filterChange(value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
const mapDispatchToProps = { filterChange };

export default connect(null, mapDispatchToProps)(Filter);
