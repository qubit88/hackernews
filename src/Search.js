import React from "react";

function Search(props) {
  return (
    <form>
      <input
        value={props.searchTerm}
        type="text"
        onChange={props.onSearchChange}
      />
    </form>
  );
}

export default Search;
