import React from "react";
import axios from "axios";

class StatusButton extends React.Component{


    render(){
              return(
                <span>
                    {this.props.status==="Accepted"?
                    <button className="btn btn-danger" onClick={()=>this.props.handleClick}>Decline</button>:
                    <button className="btn btn-success" onClick={()=>this.props.handleClick}>Accept</button>}   
                </span>
              )
          }




}

export default StatusButton;