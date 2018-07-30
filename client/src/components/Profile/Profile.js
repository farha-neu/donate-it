import React from "react";
import "./Profile.css";
import axios from "axios";
import {Link} from "react-router-dom";

class Profile extends React.Component{
    state = {
        items:[]
    };
    
    componentDidMount() {
        axios.get(`/user-and-items/${this.props.user._id}`).then((response) => {
          this.setState({items:response.data[0].item});
           console.log(response.data[0].item);
        });
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

                    <h1 className="profileTitle">list of <span className="items">items </span>posted</h1>

                    {/* list begins here */}
                    {this.state.items.length!==0?
                    <ul>
                     {this.state.items.map(item=>(
                        <li key={item._id}>
                        Id: <Link to={`/view-item/${item._id}`}>{item._id}</Link> | Name: {item.name} | Posted on: {item.dateCreated}</li>
                     ))}
                     </ul>:
                    <div>No item posted</div>
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