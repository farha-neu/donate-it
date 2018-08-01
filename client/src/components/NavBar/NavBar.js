import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css"

class NavBar extends React.Component{
 
  
  
    render(){
      return (
        <header className="mb-4">
           <Link className={window.location.pathname === "/" ? "linkColor linkActive" : "linkColor"} 
           to="/">HoME  </Link>
           {"|"}
          {!this.props.user? 
          <span>
          <Link className={window.location.pathname === "/login" ? "linkColor linkActive" : "linkColor"} to="/login">  login  </Link> {"|"}
          <Link className={window.location.pathname === "/signup" ? "linkColor linkActive" : "linkColor"} to="/signup">  SigN-uP</Link> 
          </span>
          :
          <span>
          <Link className={window.location.pathname === "/create-item" ? "linkColor linkActive" : "linkColor"} to="/create-item">  DoNATE iTEM  </Link> {"|"}
          <Link className={window.location.pathname === `/profile/${this.props.user._id}` ? "linkColor linkActive" : "linkColor"} 
          to= {`/profile/${this.props.user._id}`}>  {this.props.user.username}  </Link> {"|"}
          <Link className={window.location.pathname === "/logout" ? "linkColor linkActive" : "linkColor"} to="/logout">  logout  </Link> {"|"}
          </span>
          }
        </header>
      );
    };
}
  

export default NavBar;