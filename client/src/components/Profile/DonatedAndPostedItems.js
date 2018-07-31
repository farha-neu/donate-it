import React from "react";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import "./Profile.css";

const PostedItems=(props)=>(
    <div className="card">
          <div className="card-header user-name">
             {props.children}
          </div>
          <div className="row">
                {props.items.map(item => (
                    <div className="col-lg-3 col-md-3 float-left text-center" key={item._id}>
                            <div className="d-block mb-2">
                                <Link to={`/view-item/${item._id}`} className="link">
                                <img src={item.img} alt={item.name} className="img-fluid img-thumbnail post-image"/>
                                <div className="item-name">{item.name}</div></Link>
                            </div>
                    </div>
                ))}
        </div>
    </div>
    
)

export default PostedItems;