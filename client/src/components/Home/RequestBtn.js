import React from "react";
import axios from "axios";
import "./Home.css";

class RequestBtn extends React.Component{

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
        axios.put("/request-item",requestedItem).then((response) => {
           console.log(response.data);
           this.setState({requested:1});
        });
      };

    render(){
            return(
                <div>
                    {this.state.requested===0?
                    <div className="interested" onClick={this.requestItem}>I'm Interested</div>:
                    <div className="interested sent"><i className="fas fa-check"></i>Request Sent</div>}   
                </div>
            )
        }
}

export default RequestBtn;