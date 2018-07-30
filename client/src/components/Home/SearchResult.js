import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";

class SearchResult extends React.Component {

   render(){
    
    return (
      <section className="recentPost"> 
          {this.props.results.map(item => (
                 <div key={item._id}>
                    <Link to={`/view-item/${item._id}`}>
                        <img src={item.img} alt={item.name} />
                        <h3 className="recentFont">{item.name}</h3>
                        <h3 className="recentFont">Zip Code: {item.user.zipcode}</h3>
                    </Link> 
                 </div>
          ))}
      </section>
    );
  }
}
   
  
export default SearchResult;