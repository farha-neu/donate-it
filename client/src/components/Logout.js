import React from "react"
import axios from 'axios';
import { BrowserRouter as Redirect} from "react-router-dom";

class Logout extends React.Component{

  componentDidMount(){
    axios.get("/logout").then((response)=>{
      console.log(response.data);
      this.props.setLogout();
      this.props.history.push("/");
    })
  }

  render(){
    return(
      <Redirect to="/" />
    )
  }

}

export default Logout;
