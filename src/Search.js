import React from "react";

function Search({ value, onChange, children }) {
  return (
    <form>
      {children} <input value={value} type="text" onChange={onChange} />
    </form>
  );
}

export default Search;
