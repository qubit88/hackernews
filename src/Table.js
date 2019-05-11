import React from "react";
import Button from "./Button";

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

function Table({ list, pattern, onDismiss }) {
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item => {
        return (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
