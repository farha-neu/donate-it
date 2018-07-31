import React from "react";
import "./Signup.css";
import axios from "axios";

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
        zipcode:"",
        error:""
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value 
        });
    };

    handleFormSubmit = event =>{
        event.preventDefault();
        //all fields are required...need to add error message
       /* if  (this.state.username===this.state._id && this.state.email===/.+@.+\..+/){
           
            axios.post("/signup",{
                username:this.state.username, 
                email:this.state.email, 
                }).then(response=>{
                //console.log(response);
               
                console.log(response, "username or email not valid");

        })
    }*/
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

                        if (response.data.message){
                           
                            this.setState({
                                error: response.data.message

                            })
                            console.log(this.state.error)
                        }else{
                                  this.props.history.push("/login");
                            }

        
        
          });
        }
    
        else {
            this.setState({
                error: "PLEASE FILL IN ALL FIELDS" 
            })
        }
    }

    



    

    render(){
        
        return(
            <center>
            <form>
            <img className="logoD" src="images/logo.png" alt="logo"/>
            <div className="logoName">
                <span className="donate"> DoNATE </span>-  iT!
            </div>
           {this.state.error!==""? <span className="emailUserNotValid">EMAIL OR USERNAME NOT VALID</span>:""}
           <br/>
            <input className="loginInput"
                value={this.state.firstname}
                name="firstname"
                onChange={this.handleInputChange}
                type="text"
                placeholder="First name*"
            />
             <input className="loginInput"
                value={this.state.lastname}
                name="lastname"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Last name*"
            />
            <input className="loginInput"
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Username*"
            />
            <input className="loginInput"
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                type="password"
                placeholder="Password*"
            />
            <input className="loginInput"
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                type="email"
                placeholder="Email*"
            />
             <input className="loginInput"
               value={this.state.city}
                name="city"
                onChange={this.handleInputChange}
                type="text"
                placeholder="City*"
            />
             <input className="loginInput"
                value={this.state.state}
                name="state"
                onChange={this.handleInputChange}
                type="text"
                placeholder="State*"
            />
             <input className="loginInput"
                value={this.state.zipcode}
                name="zipcode"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Zipcode*"
            />
            <input className="loginInput"
                value={this.state.phonenumber}
                name="phonenumber"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Phone number*"
            />
            <button className="signUpButton" onClick={this.handleFormSubmit}>Submit</button>
            <br/>
            <br/>
            <span className="signupError">{this.state.error}</span>

          </form>

        <footer id="footer">
            <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
        </footer>
          </center>
        )
    }
}

export default Signup;