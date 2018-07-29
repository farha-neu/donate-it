import React from "react";
import "./Profile.css";


const Profile =(props) =>(
    <div>
        <center>
         <h1 className="profileTitle">USER <span className="profile">PROFILE </span>PAGE</h1>

         <div className="profileDetails">
         {/* <p>User Details</p> */}
         {props.user  ? <div>
         User id: {props.user._id}<br/>
         Username: {props.user.username} <br/> 
         Email: {props.user.email} <br/>
         Phonenumber: {props.user.phonenumber} 
         </div> : ""}

         </div>
         <h1 className="profileTitle">list of <span className="items">items </span>donated</h1>

        <footer id="footer">
            <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
        </footer>
         </center>
    </div>
)

export default Profile;