import React from "react";

function Search({ value, onChange, onSubmit, children }) {
  return (
    <form onSubmit={onSubmit}>
      <input value={value} type="text" onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default Search;
