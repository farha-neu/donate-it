import React from "react";
import {Link} from "react-router-dom";


class Navbar extends React.Component{
 
  
  
    render(){
      return (
        <header className="mb-4">
           <Link to="/">Home</Link>
           {"|"}
          {!this.props.user? 
          <span>
          <Link to="/login">Login</Link> {"|"}
          <Link to="/signup">Signup</Link> 
          </span>
          :
          <span>
          <Link to="/create-item">Donate Item</Link> {"|"}
          <Link to="/profile">{this.props.user.username}</Link> {"|"}
          <Link to="/logout">Logout</Link> {"|"}
          </span>
          }
        </header>
      );
    };
}
  

export default Navbar;