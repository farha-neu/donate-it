import React from "react";
import "./Profile.css";
import axios from "axios";
import List from "./List";
import {Link} from "react-router-dom";

class Profile extends React.Component{
    state = {
        user:{},
        items:[],
        donatedItems:[],
        myRequestedItems:[],
        incomingRequests:[],
        status:"",
        currentPage: "Posted Items"
    };
    
    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    renderPage = () => {
        var loggedIn = this.state.user._id===this.props.user._id;
        if (this.state.currentPage === "Posted Items") {
          return <List items={this.state.items} type="donation" isLoggedIn={loggedIn} 
          handleDeletion={this.handleDeletion}>Items for Donation</List>;
        } else if (this.state.currentPage === "Donated Items") {
          return <List items={this.state.donatedItems} type="donated" isLoggedIn={loggedIn}>Donated Items</List>;
        } else if (this.state.currentPage === "Requested Items") {
          return <List handleFormSubmit={this.handleFormSubmit} handleFormReset={this.handleFormReset}
          handleInputChange={this.handleInputChange} status={this.state.status}
          items={this.state.myRequestedItems} getColors={this.getButtonColors} type="my-requests" isLoggedIn={loggedIn}>My Requested Items</List>;
        } else  if (this.state.currentPage === "User Requests"){
          return <List items={this.state.incomingRequests} changeStatus={this.changeStatus} 
          type="user-requests" 
          isLoggedIn={loggedIn}>User Requests</List>;
        }
    };

    componentDidMount() {
        axios.get(`/user/${this.props.match.params.id}`).then((response) => {
            this.setState({user:response.data[0]});
            //  console.log(response.data);
             this.getAvailableItems();
          });
      
    }
    getAvailableItems(){
        axios.get(`/items-donating/${this.props.match.params.id}`).then((response) => {
            this.setState({items:response.data});
            //  console.log(response.data);
             this.getItemsIRequested();
          });
    }
    getItemsIRequested(){
        axios.get(`/buyer-requests/${this.props.match.params.id}`).then((response) => {
            this.setState({myRequestedItems:response.data});
            //  console.log(response.data);
             this.getIncomingRequests();
          });
    }

    getIncomingRequests(){
        axios.get(`/incoming-requests/${this.props.match.params.id}`).then((response) => {
            this.setState({incomingRequests:response.data});
            // console.log("getting",response.data);
             this.getDonatedItems();
          });
    }
    getDonatedItems(){
        axios.get(`/donated-items/${this.props.match.params.id}`).then((response) => {
            this.setState({donatedItems:response.data});
            //  console.log(response.data);
          });
    }

    handleFormSubmit=event=>{
        event.preventDefault();
        if(this.state.status===""){
            axios.get(`/buyer-requests/${this.props.match.params.id}`).then((response) => {
                this.setState({myRequestedItems:response.data});
              });
        }
        else{
            axios.get(`/buyer-requests-by-status/${this.props.match.params.id}/${this.state.status}`).then((response) => {
            this.setState({myRequestedItems:response.data});
          });
        }
    }

    handleDeletion=(itemId,userId)=>{
     var confirmation = window.confirm("Are you sure you want to delete the item? Click OK to confirm.");
     if(confirmation===true){
        axios.delete(`/delete/${itemId}/user/${userId}`).then((response)=>{
            console.log(response);
            this.getAvailableItems();
       })
     }
    }


    handleFormReset=event=>{
        this.setState({status:""});
        event.preventDefault();
            axios.get(`/buyer-requests/${this.props.match.params.id}`).then((response) => {
                this.setState({myRequestedItems:response.data});
              });
    }

    handleInputChange = event => {
        this.setState({ status: event.target.value });
    }

    getButtonColors(stat){
        if(stat==="Pending"){
            return <button className="btn btn-sm btn-custom btn-warning">{stat}</button>
        }
        else if(stat==="Accepted"){
            return <button className="btn btn-sm btn-custom btn-success">{stat}</button>
        }
        else if(stat==="Declined"){
            return <button className="btn btn-sm btn-custom btn-danger">{stat}</button>
        }
        
    }

    changeStatus=(reqStatus,itemId)=>{
        var confirmation ="";
        if(reqStatus==="Accepted"){
            confirmation = window.confirm("Are you sure you want to donate the item? Click OK to confirm.");
        }
        else{
            confirmation = window.confirm("Are you sure you want to decline the donation request? Click OK to confirm.");
        }
    
        if(confirmation===true){
            // console.log(reqStatus);
            var item ={
                reqStatus:reqStatus,
                itemId:itemId

            }
            axios.put("/change-status",item).then((response) => {
               // console.log(response);
                console.log("hello");
                this.getAvailableItems();
            });
        }
    }

    render(){
        return(
            <div>
                <center>
                     {this.state.user._id===this.props.user._id?
                     <h1 className="profileTitle">MY <span className="profile">PRoFiLE </span></h1>:
                     <h1 className="profileTitle">DoNER <span className="profile">PRoFiLE </span></h1>     
                     }
                     
                     <div className="container">
                         <div className="row">
                             <div className="col-lg-4 col-md-5">
                                <div className="card">
                                    <div className="card-header user-name">
                                         {this.state.user.firstname} {this.state.user.lastname}  

                                         {this.state.user._id===this.props.user._id?
                                         <Link to= {`/edit-profile/${this.state.user._id}`}>
                                         <button className="btn btn-success"><i className="fas fa-pen-square"></i></button>
                                        </Link>:""}


                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                                <span className="header"><i className="fas fa-envelope"></i> Email</span><br/>
                                                {this.state.user.email} <hr/>
                                                <span className="header"><i className="fas fa-phone-square"></i> Phone Number</span><br/>
                                                {this.state.user.phonenumber} <hr/>
                                                <span className="header"><i className="fas fa-map-marker-alt"></i> Address</span><br/>
                                                {this.state.user.city}, {this.state.user.state}-{this.state.user.zipcode}<hr/>
                                                <div 
                                                    onClick={() => this.handlePageChange("Posted Items")}
                                                    className={this.state.currentPage === "Posted Items" ? "active menu-item" : "menu-item"
                                                    }>Items for Donation
                                                 </div>
                                                <div 
                                                    onClick={() => this.handlePageChange("Donated Items")}
                                                    className={this.state.currentPage === "Donated Items" ? "active menu-item" : "menu-item"
                                                    }>Donated Items
                                                </div>
                                                {this.state.user._id===this.props.user._id?
                                                <span>
                                                    <div 
                                                        onClick={() => this.handlePageChange("Requested Items")}
                                                        className={this.state.currentPage === "Requested Items" ? "active menu-item" : "menu-item"
                                                        }>My Requested Items
                                                    </div>
                                                    <div 
                                                        onClick={() => this.handlePageChange("User Requests")}  
                                                        className={this.state.currentPage === "User Requests" ? "active menu-item" : "menu-item"
                                                        }>User Requests
                                                    </div>
                                                </span> : ""}
                                        </div>
                                    </div>
                                </div>
                             </div>
                             <div className="col-lg-8 col-md-7">                             
                                               {this.renderPage()}                            
                             </div>
                         
                         </div>     
                    </div>    
                    <footer id="footer">
                        <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
                    </footer>
                </center>
             </div>
        )
    }
}
   


export default Profile;