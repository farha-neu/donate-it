import React from "react";
import "./Profile.css";


const Profile =(props) =>(
    <div>
         <h1>USER PROFILE PAGE</h1>
         {/* <p>User Details</p> */}
         {props.user  ? <div>
         User id: {props.user._id}<br/>
         Username: {props.user.username} <br/> 
         Email: {props.user.email} <br/>
         Phonenumber: {props.user.phonenumber} 
         </div> : ""}
         <h1>List of items donated</h1>
    </div>
)

export default Profile;