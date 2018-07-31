import React from "react";

const RequestedItems=(props)=>(

    <div className="card">
        <div className="card-header user-name">
            {props.children}
        </div>
    </div>
)

export default RequestedItems;