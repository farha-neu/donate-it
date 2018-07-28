import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css"

class NavBar extends React.Component{
 
  
  
    render(){
      return (
        <header className="mb-4">
           <Link className="linkColor" to="/">HoME  </Link>
           {"|"}
          {!this.props.user? 
          <span>
          <Link className="linkColor" to="/login">  login  </Link> {"|"}
          <Link className="linkColor" to="/signup">  SigN-uP</Link> 
          </span>
          :
          <span>
          <Link className="linkColor" to="/create-item">  DoNATE iTEM  </Link> {"|"}
          <Link className="linkColor" to="/profile">  {this.props.user.username}  </Link> {"|"}
          <Link className="linkColor" to="/logout">  logout  </Link> {"|"}
          </span>
          }
        </header>
      );
    };
}
  

export default NavBar;