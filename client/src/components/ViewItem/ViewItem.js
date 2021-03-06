import React from "react";
import "./ViewItem.css";
import axios from "axios";
import RequestButton from "./RequestButton";
import {Link,Redirect} from "react-router-dom";
import Moment from 'react-moment';


class ViewItem extends React.Component{

    state = {
        item: {},
        category:{},
        user:{}
    };
    
    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(`/item/${this.props.match.params.id}`).then((response) => {
            this.setState({
                item: response.data,
                category:response.data.category,
                user:response.data.user
            });
        });
    }

   
    render(){
        return(
            this.state.user!==undefined? 
            <div className="container">
             <center>
                <h1 className="viewItem">{this.state.item.name}</h1>
                <h2 className="viewItem viewItemPost">Posted By:  <span className="an">
                <Link to= {`/profile/${this.state.user._id}`}>{this.state.user.username}</Link></span></h2>
                <div className="row">
                      <div className="col-md-6">
                             <img src={this.state.item.img} alt="name" className="img-thumbnail img-fluid item-img"/>  
                      </div>
                      <div className="col-md-6">
                         <div className="detail-div">
                            <div className="viewItemText">
                                    Item Id: {this.state.item._id}<br/>
                                    Description: {this.state.item.description}<br/>
                                    Condition: {this.state.item.condition}<br/>
                                    Note: {this.state.item.note}<br/>
                                    Category: {this.state.category.name}<br/>
                                    Date Posted: <Moment format="YYYY/MM/DD h:mm:ssa">{this.state.item.dateCreated}</Moment><br/>
                                    
                                    {/* if session id matches item creator id..dont show request button */}
                                    {this.props.user._id === this.state.user._id?"":
                                    this.state.item.status==="Nil" || this.state.item.status==="Declined"?
                                    <RequestButton item={this.state.item} user={this.props.user}/>:
                                    <button className="disabled">NOT AVAILABLE</button>
                                    }
                                </div>
                                <br/> <br/>
                                <div className="viewDetails">
                                    CONTACT DETAILS:<br/>
                                </div>
                                <div className="contactLink">
                                        {this.state.user._id === this.props.user._id?
                                            <Link to= {`/profile/${this.state.user._id}`}>MY PROFILE</Link>:
                                            <Link to ={`/profile/${this.state.user._id}`}>VIEW DONOR PROFILE</Link>}
                                </div>              
                      </div>  
                    </div>              
                </div>
                <footer id="footer">
                        <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
                </footer>
             </center>
           </div> :<Redirect to='/'/>
        ) 
    } 
}
   


export default ViewItem;