import React from "react";
import "./CreateItem.css";
import axios from "axios";


class CreateItem extends React.Component{
    state={
        categories:[],
        name:"",
        description:"",
        condition:"",
        note:"",
        zipcode:"",
        selectValue:"",
        createdItem:{}
    }
    componentDidMount(){
            axios.get("/categories").then((res=>{
                // console.log(res.data);
                this.setState({categories:res.data});
                // this.setState({selectValue:res.data[0]._id});
            }))
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
        if(this.state.name!=="" && this.state.description!=="" && this.state.condition!=="" && this.state.note!==""
          && this.state.phonenumber!=="" && this.state.zipcode!=="" && this.state.selectValue!==""){
              console.log("hi");
            axios.post("/additem-to-user",
                                 {name:this.state.name, 
                                  description:this.state.description, 
                                  condition:this.state.condition, 
                                  note:this.state.note,
                                  zipcode:this.state.zipcode,
                                  selectValue:this.state.selectValue,
                                  user:this.props.user._id
                                }).then(response=>{
                                      console.log(response.data);
                                   //need to clear fields
                                      this.setState({createdItem:response.data});
          })
        }
    }

    render(){
        var message='You selected '+this.state.selectValue;
        return(
            <div>
               <form>
                    <input
                        value={this.state.name}
                        name="name"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Item Name"
                    />
                    <input
                        value={this.state.description}
                        name="description"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="description"
                    />
                     <input
                        value={this.state.condition}
                        name="condition"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="condition"
                    />
                     <input
                        value={this.state.note}
                        name="note"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="note"
                    />
                    <input
                        value={this.state.zipcode}
                        name="zipcode"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="zipcode"
                    />
                     <select value={this.state.selectValue} onChange={this.handleInputChange} name="selectValue">
                            <option value = '' disabled>Select</option>
                        {this.state.categories.map(result=>(
                                <option key={result._id} value={result._id}>{result.name}</option>
                        ))}
                    </select>
                    {message}
                    <button onClick={this.handleFormSubmit}>Submit</button>
               </form>
               {Object.keys(this.state.createdItem).length !==0 ?
               <div>
               {this.state.createdItem.name} {" "}
               {this.state.createdItem.condition} {" "}
               {this.state.createdItem.description} {" "}
               {this.state.createdItem.dateCreated} created! </div>:""}
              </div>
        )
    }

}

export default CreateItem;