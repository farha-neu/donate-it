import React from "react";
import axios from "axios";

class StatusButton extends React.Component{

    //   state={
    //       requested:0
    //   }
    //   requestItem = () =>{
    //       console.log("click");
    //     var requestedItem={
    //         userId: this.props.user._id,
    //         itemId: this.props.item._id,
    //         status:"Pending"
    //     }
    //     // console.log(requestedItem);
    //     axios.put("/request-item",requestedItem).then((response) => {
    //        console.log(response.data);
    //        this.setState({requested:1});
    //     });
    //  };

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