import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";
import RequestBtn from "./RequestBtn";
class SearchResult extends React.Component {

   render(){
    
    return (
     <div className="row">
          {this.props.results.map(item => (
            <div className="col-lg-3 col-md-4 float-left item-div text-center" key={item._id}>
                    <div className="d-block mb-2 h-100 img-div">
                        <Link to={`/view-item/${item._id}`} className="link">
                        <img src={item.img} alt={item.name} className="img-fluid img-thumbnail image"/>
                        <div className="item-name">{item.name}</div></Link>
                        <div className="address">{item.user.city}, {item.user.zipcode}</div>
                        {this.props.user?
                        this.props.user._id === item.user._id? 
                        <div className="interested">My Item</div>:
                        <RequestBtn item={item} user={this.props.user}/>
                        
                        :""}
                   </div>
            </div>
          ))}
     </div>
    );
  }
}
   
  
export default SearchResult;