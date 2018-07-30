import React from "react";
import axios from "axios";

class RequestButton extends React.Component{

      state={
          requested:0
      }
      requestItem = () =>{
        var requestedItem={
            userId: this.props.user._id,
            itemId: this.props.item._id,
            status:"Pending"
        }
        console.log(requestedItem);
        axios.post("/request-item",requestedItem).then((response) => {
           console.log(response.data);
           this.setState({requested:1});
        });
     };

    render(){
              return(
                <div>
                    {this.state.requested===0?
                    <button
                    onClick={this.requestItem}>Request Item</button>:
                    <button disabled
                    onClick={this.requestItem}>Requested</button>}   
                </div>
              )
          }




}

export default RequestButton;