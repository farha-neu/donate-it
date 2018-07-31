import React from "react";

const UserRequests=(props)=>(

    <div className="card">
        <div className="card-header user-name">
        {props.children}
        </div>
    </div>
)

export default UserRequests;