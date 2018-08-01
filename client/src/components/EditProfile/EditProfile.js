import React from "react";
import axios from "axios";
import "./EditProfile.css"

class EditForm extends React.Component{

    state={
        firstname:"",
        lastname:"",
        phonenumber:"",
        city:"",
        state:"",
        zipcode:"",
        user:{}
    }

    componentDidMount(){

        axios.get(`/user/${this.props.match.params.id}`).then((response) => {
            console.log(response.data[0]);
            this.setState({user:response.data[0]});
            this.setState({firstname:response.data[0].firstname,
                           lastname:response.data[0].lastname,
                           city:response.data[0].city,
                           state:response.data[0].state,
                           zipcode:response.data[0].zipcode,
                           phonenumber:response.data[0].phonenumber}
                        );
          });  
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
        if(this.state.firstname!=="" && this.state.lastname!=="" && this.state.phonenumber!==""
         && this.state.city!=="" && this.state.state!=="" && this.state.zipcode!==""){
            axios.put(`/editing-profile/${this.props.match.params.id}`,{
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                phonenumber:this.state.phonenumber,
                city:this.state.city,
                state:this.state.state,
                zipcode:this.state.zipcode}).then(response=>{
                    console.log("response",response);
                    this.props.history.push(`/profile/${this.props.match.params.id}`);
                });
         }
    }
       
      render(){
          return(
            
            <form>
              <div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label>First Name</label>
                    </div>
                    <div className="col-md-6">
                        <label>Last Name</label>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" value={this.state.firstname}
                            name="firstname"
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="First name*"/>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" value={this.state.lastname}
                                name="lastname"
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="Last name*"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-4">
                        <label>City</label>
                    </div>
                    <div className="col-md-4">
                        <label>State</label>
                    </div>
                    <div className="col-md-4">
                        <label>Zipcode</label>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" value={this.state.city}
                                    name="city"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="City*"/>
                        </div>
                    <div className="col-md-4">
                        <input className="form-control" value={this.state.state}
                                    name="state"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="State*"/>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" value={this.state.zipcode}
                                    name="zipcode"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="Zipcode*"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <label>Phone Number</label>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <input className="form-control" value={this.state.phonenumber}
                                        name="phonenumber"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        placeholder="Phone number*"/>
                    </div>
                </div>
            </div>
          
            <button type="button" className="btn btn-secondary" onClick={this.handleFormSubmit}>Save Changes</button>
               
        </form>
          )
      }
}

export default EditForm;

 