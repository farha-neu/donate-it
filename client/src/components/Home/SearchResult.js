import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";



class SearchResult extends React.Component {

   render(){
    
    return (
      <ul className="list-group">
        {this.props.results.map(item => (
          <li className="list-group-item" key={item._id}>
            <Link to={`/view-item/${item._id}`}>{item.name}</Link> 
            {item.zipcode}
            <img src={item.image} alt="name"/>
            {item.img?<img src={item.img} alt="pic" />:""}
          </li>
        ))}
      </ul>
    );
  }
}
   
  
export default SearchResult;