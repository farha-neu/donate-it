import React from "react";
import "./Signup.css";
import axios from "axios";
// import { BrowserRouter as Redirect} from "react-router-dom";


class Signup extends React.Component{

    state={
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        phonenumber:"",
        city:"",
        state:"",
        zipcode:""
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value // name is search
        });
    };

    handleFormSubmit = event =>{
        event.preventDefault();
        if(this.state.firstname!=="" && this.state.lastname!=="" &&
        this.state.username!=="" && this.state.email!=="" && this.state.password!=="" && this.state.phonenumber!==""
         && this.state.city!=="" && this.state.state!=="" && this.state.zipcode!==""){
            axios.post("/signup",{firstname:this.state.firstname,
                                  lastname:this.state.lastname,
                                  username:this.state.username, 
                                  email:this.state.email, 
                                  password:this.state.password, 
                                  phonenumber:this.state.phonenumber,
                                  city:this.state.city,
                                  state:this.state.state,
                                  zipcode:this.state.zipcode}).then(response=>{
                                  console.log(response);
                                  this.props.history.push("/login");
                                    //   <Redirect to="/login" />

          })
        }
    }

    render(){
        return(
            <form>
             <input
                value={this.state.firstname}
                name="firstname"
                onChange={this.handleInputChange}
                type="text"
                placeholder="First name"
            />
             <input
                value={this.state.lastname}
                name="lastname"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Last name"
            />
            <input
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
                type="username"
                placeholder="Username"
            />
            
            <input
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                type="email"
                placeholder="Email"
            />
            
             <input
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                type="password"
                placeholder="Password"
            />
             <input
                value={this.state.city}
                name="city"
                onChange={this.handleInputChange}
                type="text"
                placeholder="City"
            />
             <input
                value={this.state.state}
                name="state"
                onChange={this.handleInputChange}
                type="text"
                placeholder="State"
            />
             <input
                value={this.state.zipcode}
                name="zipcode"
                onChange={this.handleInputChange}
                type="text"
                placeholder="zipcode"
            />
            
            <input
                value={this.state.phonenumber}
                name="phonenumber"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Phone number"
            />
            <button onClick={this.handleFormSubmit}>Submit</button>

          </form>
        )
    }
}

export default Signup;