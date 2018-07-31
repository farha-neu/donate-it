import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";

class SearchResult extends React.Component {

   render(){
    
    return (
      <div className="row">
          {this.props.results.map(item => (
                 <div className="col-md-4" key={item._id}>
                    <Link to={`/view-item/${item._id}`}>
                        <img src={item.img} alt={item.name} />
                        <h3 className="recentFont">{item.name}</h3>
                        <h3 className="recentFont">Category: {item.category.name}</h3>
                        <h3 className="recentFont">Zip Code: {item.user.zipcode}</h3>
                    </Link> 
                 </div>
          ))}
          </div>
    );
  }
}
   
  
export default SearchResult;