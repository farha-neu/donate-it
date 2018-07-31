import React from "react";
import "./Profile.css";
import axios from "axios";
import {Link} from "react-router-dom";
import Moment from 'react-moment';

class Profile extends React.Component{
    state = {
        items:[],
        donatedItems:[],
        myRequestedItems:[],
        incomingRequests:[]
    };
    
    componentDidMount() {
        axios.get(`/user-and-items/${this.props.user._id}`).then((response) => {
          this.setState({items:response.data[0].item});
           console.log(response.data[0].item);
           this.getItemsIRequested();
        });
    }
    getItemsIRequested(){
        axios.get(`/buyer-requests/${this.props.user._id}`).then((response) => {
            this.setState({myRequestedItems:response.data});
             console.log(response.data);
             this.getIncomingRequests();
          });
    }

    getIncomingRequests(){
        axios.get(`/incoming-requests/${this.props.user._id}`).then((response) => {
            this.setState({incomingRequests:response.data});
             console.log(response.data);
             this.getDonatedItems();
          });
    }
    getDonatedItems(){
        axios.get(`/donated-items/${this.props.user._id}`).then((response) => {
            this.setState({donatedItems:response.data});
             console.log(response.data);
          });
    }

    getButtonColors(stat){
        if(stat==="Pending"){
            return <button className="btn btn-warning">{stat}</button>
        }
        else if(stat==="Accepted"){
            return <button className="btn btn-success">{stat}</button>
        }
        else if(stat==="Declined"){
            return <button className="btn btn-danger">{stat}</button>
        }
        
    }

    changeStatus(reqStatus,itemId){
        var r ="";
        if(reqStatus==="Accepted"){
            r = window.confirm("Are you sure you want to donate the item? Click OK to confirm.");
        }
        else{
            r = window.confirm("Are you sure you want to decline the donation request? Click OK to confirm.");
        }
    
        if(r===true){
            console.log(reqStatus);
            var item ={
                reqStatus:reqStatus,
                itemId:itemId

            }
            axios.put("/change-status",item).then((response) => {
            this.getIncomingRequests();
            });
        }
    }

    render(){
        return(
            <div>
                <center>
                     <h1 className="profileTitle">USER <span className="profile">PROFILE </span>PAGE</h1>

                    <div className="profileDetails">
                        {this.props.user  ?
                        <div>
                            User id: {this.props.user._id}<br/>
                            Name: {this.props.user.firstname} {this.props.user.lastname} <br/>
                            Username: {this.props.user.username} <br/> 
                            Email: {this.props.user.email} <br/>
                            Phonenumber: {this.props.user.phonenumber} <br/>
                            Address: {this.props.user.city},{this.props.user.state}-{this.props.user.zipcode}
                        </div> : ""}
                    </div>

                    <h1 className="profileTitle">list of <span className="items">all items </span>posted</h1>

                    {/* list begins here */}
                    {this.state.items.length!==0?
                    <ul>
                     {this.state.items.map(item=>(
                        <li key={item._id}>
                        Id: <Link to={`/view-item/${item._id}`}>{item._id}</Link> | Name: {item.name} | 
                        Posted on: <Moment format="YYYY/MM/DD h:mm:ssa">{item.dateCreated}</Moment></li>
                     ))}
                     </ul>:
                    <div>No item posted</div>
                    }

                     <h1 className="profileTitle">list of <span className="items">donated </span>items</h1>

                    {/* list begins here */}
                    {this.state.donatedItems.length!==0?
                    <ul>
                    {this.state.donatedItems.map(item=>(
                        <li key={item._id}>
                        Id: <Link to={`/view-item/${item._id}`}>{item._id}</Link> | Name: {item.name} </li>
                    ))}
                    </ul>:
                    <div>No items donated.</div>
                    }

                    <h1 className="profileTitle">list of <span className="items">items </span>requested</h1>

                    {this.state.myRequestedItems.length!==0?
                    <ul>
                     {this.state.myRequestedItems.map(item=>(
                        <li key={item._id}>
                         Id: <Link to={`/view-item/${item._id}`}>{item._id}</Link>
                        | Item Name: {item.name} | Donor: {item.user.username} | Status: {this.getButtonColors(item.status)}</li>
                     ))}
                     </ul>:
                    <div>No item requested</div>
                    }

                    <h1 className="profileTitle">list of <span className="items">incoming </span>requests</h1>

                    {this.state.incomingRequests.length!==0?
                    <ul>
                     {this.state.incomingRequests.map(item=>(
                        <li key={item._id}>
                         Id: <Link to={`/view-item/${item._id}`}>{item._id}</Link>
                        |Item Name: {item.name} | Requested By: {item.requestedBy.username} | 
                        <button className="btn btn-success mb-1" onClick={()=>this.changeStatus("Accepted",item._id)}>Accept</button> 
                        <button className="btn btn-danger mb-1" onClick={()=>this.changeStatus("Declined",item._id)}>Decline</button></li>
                     ))}
                     </ul>:
                    <div>No item requested</div>
                    }
                    
                    <footer id="footer">
                        <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
                    </footer>
                </center>
             </div>
        )
    }
}
   


export default Profile;