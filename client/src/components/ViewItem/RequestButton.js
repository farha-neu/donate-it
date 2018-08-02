import React from "react";
import axios from "axios";

class RequestButton extends React.Component{

      state={
          requested:0
      }
      requestItem = () =>{
          console.log("click");
        var requestedItem={
            userId: this.props.user._id,
            itemId: this.props.item._id,
            status:"Pending"
        }
        // console.log(requestedItem);
        axios.put("/request-item",requestedItem).then((response) => {
           console.log(response.data);
           this.setState({requested:1});
        });
     };

    render(){
              return(
                <div>
                    <br/>
                    {this.state.requested===0?
                    <button className="requestButton"
                    onClick={this.requestItem}>I'M INTERESTED</button>:
                    <button className="requestButton2" disabled
                    onClick={this.requestItem}>REQUEST SENT</button>}   
                </div>
              )
          }




}

export default RequestButton;