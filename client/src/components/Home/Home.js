import React from "react";
import "./Home.css";
import axios from "axios"; 
import SearchResult from "./SearchResult";

class Home extends React.Component{
    state={
        results:[],
        categories:[],
        zipCodes:[],
        name:"",
        zipcode:"",
        selectValue:"",
        radius:"0"
    }
   
    componentDidMount(){
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

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value 
        });
    };


    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.name!=="" || this.state.selectValue!==""){
             if(this.state.zipcode!=="" && (this.state.radius!=="0" && this.state.radius!=="")){
                //10 requests per hour api call limit :'(
                var query = "http://www.zipcodeapi.com/rest/js-X56fZ3EDs8gMCsHU0o8VxMDDq1CWjwkJ5X4VsbH5RzZJPTau57rJpru60IpDJDiz/radius.json/"
                +this.state.zipcode+"/"+this.state.radius+"/mile";
                console.log(query);
                axios.get(query)
                .then((response)=>{
                        var zips=[];
                        for(let i = 0; i<response.data.zip_codes.length;i++){
                            zips.push(response.data.zip_codes[i].zip_code);
                        }
                        this.setState({zipCodes:zips});  
                        this.search(zips);
                    })      
                }     
          
                else if(this.state.zipcode!=="" && (this.state.radius==="0" || this.state.radius==="")){
                        this.setState({zipCodes:[this.state.zipcode]});
                        this.search([this.state.zipcode]);
                }
        
                else{
                    this.search([]);
                }
        }
         
    }

    search = (q) =>{
        axios.get('/search-items',{
            params:{
                name: this.state.name,
                selectValue: this.state.selectValue==="all"?"":this.state.selectValue,
                zipCodes: q 
            }
        }).then((res=>{
            this.setState({results:res.data});
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
                         <option value='all'>All</option>
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
                  <button onClick={this.handleFormSubmit}>Search</button> 
            </form>
            <SearchResult results={this.state.results}/>
           </div>
        )
    }
}
export default Home;