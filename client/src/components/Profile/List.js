import React from "react";
import {Link} from "react-router-dom";
// import Moment from 'react-moment';
import "./Profile.css";

function message(type){
    if(type==="donation") return "No listings";
    else if(type==="donated") return "No donated items";
    else if(type==="my-requests") return "You didn't make any requests for donation";
    else return "No donation requests";
}

const List=(props)=>(
    <div className="card">
          <div className="card-header user-name">
             {props.children}
          </div>
          <div className="row">
            {props.items.length!==0?
                props.items.map(item => (
                    <div className="col-lg-3 col-md-6 float-left post-container text-center" key={item._id}>
                            <div className="d-block mb-2 h-100 post-div">
                                <Link to={`/view-item/${item._id}`} className="link">
                                    <img src={item.img} alt={item.name} className="img-fluid img-thumbnail post-image"/>
                                    <div className="item-name">{item.name}</div>
                                </Link>


                                {props.type==="donated" && props.isLoggedIn? 
                                    <div className="subheader">Donated to : <a href={`/profile/${item.requestedBy._id}`}>{item.requestedBy.username}</a>
                                    </div>
                                :""}


                                {props.type==="my-requests"? 
                                  <span>
                                    <div className="subheader">Donor  : <a href={`/profile/${item.user._id}`}>{item.user.username}</a>
                                    </div>
                                    <div>{props.getColors(item.status)}</div>
                                   </span>
                                :""}

                                {props.type==="user-requests"? 
                                  <span>
                                    <div className="subheader">Requested By  : <a href={`/profile/${item.requestedBy._id}`}>
                                    {item.requestedBy.username}</a>
                                    </div>
                                    <button className="btn btn-success btn-sm btn-custom mb-1 mr-3" onClick={()=>props.changeStatus("Accepted",item._id)}>Accept</button> 
                                    <button className="btn btn-danger btn-custom btn-sm mb-1" onClick={()=>props.changeStatus("Declined",item._id)}>Decline</button>
                                   </span>
                                :""}


                            </div>
                    </div>
                )):<div className="col-lg-12 message text-center">{message(props.type)}</div>
                
                }
        </div>
    </div>)
    
export default List;