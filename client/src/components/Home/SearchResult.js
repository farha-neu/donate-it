import React from "react";
import "./Home.css";

const SearchResult = props => {
    return (
      <ul className="list-group">
        {props.results.map(item => (
          <li className="list-group-item" key={item._id}>
            {item.name} {item.zipcode}
            <img src={item.image} alt="name"/>
          </li>
        ))}
      </ul>
    );
  };
  
export default SearchResult;