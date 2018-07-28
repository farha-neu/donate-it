import React from "react";
import "./Signup.css";
import axios from "axios";
// import { BrowserRouter as Redirect} from "react-router-dom";


class Signup extends React.Component{

    state={
        username:"",
        email:"",
        password:"",
        phonenumber:""
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
        if(this.state.username!=="" && this.state.email!=="" && this.state.password!=="" && this.state.phonenumber!==""){
            axios.post("/signup",{username:this.state.username, 
                                  email:this.state.email, 
                                  password:this.state.password, 
                                  phonenumber:this.state.phonenumber}).then(response=>{
                                      console.log(response);
                                      this.props.history.push("/login");
                                    //   <Redirect to="/login" />

        })
        }
    }

    render(){
        return(
            <center>
            <form>
            <img className="logoD" src="images/logo.png"/>
            <div className="logoName">
                <span className="donate"> DoNATE </span>-  iT!
            </div>
            <input className="loginInput"
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Username"
            />
            <input className="loginInput"
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                type="password"
                placeholder="Password"
            />
            <input className="loginInput"
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                type="email"
                placeholder="Email"
            />
            <input className="loginInput"
                value={this.state.phonenumber}
                name="phonenumber"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Phone number"
            />
            <button className="signUpButton" onClick={this.handleFormSubmit}>Submit</button>

          </form>

        <footer id="footer">
            <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
        </footer>
          </center>
        )
    }
}

export default Signup;