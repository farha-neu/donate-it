import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";

const SearchResult = props => {
    return (
      <ul className="list-group">
        {props.results.map(item => (
          <li className="list-group-item" key={item._id}>
            <Link to={`/view-item/${item._id}`}>{item.name}</Link> 
            {item.zipcode}
            <img src={item.image} alt="name"/>
          </li>
        ))}
      </ul>
    );
  };
  
export default SearchResult;