import React from "react";
import "./CreateItem.css";
import axios from "axios";
import {Link} from "react-router-dom";

class CreateItem extends React.Component{
    state={
        categories:[],
        name:"",
        description:"",
        condition:"",
        note:"",
        selectValue:"",
        createdItem:{},
        image:""
    }
    componentDidMount(){
            axios.get("/categories").then((res=>{
                this.setState({categories:res.data});
            }))
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value 
        });
    };


    //getting base64 image 
    onImageChange=(event)=>{
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
   }


    handleFormSubmit = event =>{
        event.preventDefault();
        //all fields are required
        //need to add error message for missing fields
        if(this.state.name!=="" && this.state.description!=="" && this.state.condition!=="" && this.state.note!==""
          && this.state.phonenumber!=="" && this.state.selectValue!=="")
          {
            axios.post("/additem-to-user",
                    {
                        name:this.state.name, 
                        description:this.state.description, 
                        condition:this.state.condition, 
                        note:this.state.note,
                        selectValue:this.state.selectValue,
                        user:this.props.user._id,
                        img:this.state.image
                    }).then(response=>{
                        console.log(response.data);
                        //need to clear fields
                        this.setState({createdItem:response.data});
                        //clear on submit
                        this.setState({name:"",description:"",condition:"",note:"",phonenumber:"",selectValue:""});
           })
         }
     }

    render(){
        return(
          <div>
            <center>
            <form>
                
                <img className="logoD" src="images/logo.png" alt="logo"/>
                <div className="logoName">
                    <span className="donate"> DoNATE </span>-  iT!
                </div>
                
                 <h1 className="createTitle">CREATE <span className="new"> NEW </span>ITEM</h1>

                 {/* After successful insertion */}
                 {Object.keys(this.state.createdItem).length !==0 ?
                 <div> 
                    Item {this.state.createdItem.name} posted! 
                    Click to <Link to={`/view-item/${this.state.createdItem._id}`}>view.</Link>
                 </div>:""}

                 <select className="form-control col-md-6" value={this.state.selectValue} onChange={this.handleInputChange} name="selectValue">
                        <option value = '' disabled>Choose a Category</option>

                        {this.state.categories.map(result=>(
                              <option key={result._id} value={result._id}>{result.name}</option>
                        ))}
                 </select>
    
                 <input className="loginInput"
                        value={this.state.name}
                        name="name"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Item Name"
                    />
                    <textarea className="loginInput" col="3"
                        value={this.state.description}
                        name="description"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Description"
                    />
                     <input className="loginInput"
                        value={this.state.condition}
                        name="condition"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Condition of item"
                    />
                     <input className="loginInput"
                        value={this.state.note}
                        name="note"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Additional Notes"
                    />
                    <input className="loginInput" type="file" placeholder="Upload Image of Item" onChange={this.onImageChange}/><br/>
                    
                    <button className="createItemButton" onClick={this.handleFormSubmit}>Submit</button>
                    
              </form>
            <footer id="footer">
                <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
            </footer>
            </center>
        </div>
        )
    }
}

export default CreateItem;