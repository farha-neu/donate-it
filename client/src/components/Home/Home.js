import React from "react";
import "./Home.css";
import axios from "axios"; 
import SearchResult from "./SearchResult";


class Home extends React.Component{
    state={
        categories:[],
        zipCodes:[],
        name:"",
        zipcode:"",
        selectValue:"",
        results:[]
    }
   
    componentDidMount(){
         
        // axios.get("http://www.zipcodeapi.com/rest/js-ml9xIE3Hvot7gr5awJ4hfyh4UgKmmpFDHtkuQxqwWkfmdorCkEUyoWImaLOkVWZS/radius.json/02115/2/mile")
        // .then((response)=>{
        //     console.log(response.data);
        //     this.setState({zipCodes:response.data});
        // })
        axios.get("/categories").then((res=>{
            // console.log(res.data);
            this.setState({categories:res.data});
            console.log(this.state.categories);
            this.getRecentItems();
        }))
    }
   
    getRecentItems(){
        axios.get("/recent-items").then((res=>{
            this.setState({results:res.data});
            console.log(this.state.results);
        }))
    }

    render(){
        return (
            <div>
            <form>
                 <input
                     value={this.state.name}
                     name="name"
                     onChange={this.handleInputChange}
                     type="text"
                     placeholder="Item Name"
                 />
                  <select value={this.state.selectValue} onChange={this.handleInputChange} name="selectValue">
                         <option value='' disabled>Select Category</option>
                     {this.state.categories.map(result=>(
                             <option key={result._id} value={result._id}>{result.name}</option>
                     ))}
                 </select>
                 <input
                     value={this.state.zipcode}
                     name="zipcode"
                     onChange={this.handleInputChange}
                     type="text"
                     placeholder="zipcode"
                 />
                  <input
                     value={this.state.radius}
                     name="radius"
                     onChange={this.handleInputChange}
                     type="number"
                     placeholder="Radius in miles"
                     min="0"
                 />
                 <button onClick={this.handleFormSubmit}>Submit</button>
            </form>
           <SearchResult results={this.state.results}/>
           </div>
        )
    }
}
export default Home;