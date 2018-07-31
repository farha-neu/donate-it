import React from "react";
import "./Profile.css";
import axios from "axios";
import DonatedAndPostedItems from "./DonatedAndPostedItems";
import RequestedItems from "./RequestedItems";
import UserRequests from "./UserRequests";

class Profile extends React.Component{
    state = {
        items:[],
        donatedItems:[],
        myRequestedItems:[],
        incomingRequests:[],
        currentPage: "Posted Items"
    };
    
    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    renderPage = () => {
        if (this.state.currentPage === "Posted Items") {
          return <DonatedAndPostedItems items={this.state.items}>All Posted Items</DonatedAndPostedItems>;
        } else if (this.state.currentPage === "Donated Items") {
          return <DonatedAndPostedItems items={this.state.donatedItems}>Donated Items</DonatedAndPostedItems>;
        } else if (this.state.currentPage === "Requested Items") {
          return <RequestedItems items={this.state.myRequestedItems}>Requested Items</RequestedItems>;
        } else  if (this.state.currentPage === "User Requests"){
          return <UserRequests items={this.state.incomingRequests}>Other User Requests</UserRequests>;
        }
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
            //  console.log(response.data);
             this.getIncomingRequests();
          });
    }

    getIncomingRequests(){
        axios.get(`/incoming-requests/${this.props.user._id}`).then((response) => {
            this.setState({incomingRequests:response.data});
            //  console.log(response.data);
             this.getDonatedItems();
          });
    }
    getDonatedItems(){
        axios.get(`/donated-items/${this.props.user._id}`).then((response) => {
            this.setState({donatedItems:response.data});
            //  console.log(response.data);
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
                     <h1 className="profileTitle">DONER <span className="profile">PROFILE </span></h1>
                     
                     <div className="container">
                         <div className="row">
                             <div className="col-lg-4 col-md-5">
                                <div className="card">
                                    <div className="card-header user-name">
                                         {this.props.user.firstname} {this.props.user.lastname}
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                                <span className="header"><i className="fas fa-envelope"></i> Email</span><br/>
                                                {this.props.user.email} <hr/>
                                                <span className="header"><i className="fas fa-phone-square"></i> Phone Number</span><br/>
                                                {this.props.user.phonenumber} <hr/>
                                                <span className="header"><i className="fas fa-map-marker-alt"></i> Address</span><br/>
                                                {this.props.user.city}, {this.props.user.state}-{this.props.user.zipcode}<hr/>
                                                <div className="menu-item" 
                                                 onClick={() => this.handlePageChange("Posted Items")}>All Items</div>
                                                <div className="menu-item"
                                                onClick={() => this.handlePageChange("Donated Items")}>Donated Items</div>
                                                <div className="menu-item"
                                                onClick={() => this.handlePageChange("Requested Items")}>Requested Items</div>
                                                <div className="menu-item"
                                                onClick={() => this.handlePageChange("User Requests")}>Other User Requests</div>
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