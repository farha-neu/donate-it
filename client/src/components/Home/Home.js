import React from "react";
import "./Home.css";
import "./main.css";
import axios from "axios"; 
import SearchResult from "./SearchResult";
import API from "../../utils/API";


class Home extends React.Component{

    state={
        results:[],
        categories:[],
        zipCodes:[],
        name:"",
        zipcode:"",
        selectValue:"",
        radius:"",
        landing: true
    }

    componentDidMount(){
        axios.get("/categories").then((res=>{
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
    }

   
    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.name!=="" || this.state.selectValue!=="" || this.state.zipcode!==""){

            if(this.state.zipcode!=="" && (this.state.radius!=="0" && this.state.radius!=="")){
                API.getZipcodes(this.state.zipcode,this.state.radius).then((response)=>{
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
            this.setState({landing:false});
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
            console.log(res.data);
            this.setState({results:res.data});
        }))
    }


    render(){
        return(
            <div>
               <header id="header">
                    <img className="logoD" src="images/logo.png" alt="logo"/>
                    <div className="logoName">
                        <span className="donate"> DoNATE </span>-  iT!
                    </div>

                    <ul className="icons">
                        <li><a href="https://twitter.com/" className="icon style2 fa-twitter"><span className="label">Twitter</span></a></li>
                        <li><a href="https://facebook.com/" className="icon style2 fa-facebook"><span className="label">Facebook</span></a></li>
                        <li><a href="https://www.instagram.com/" className="icon style2 fa-instagram"><span className="label">Instagram</span></a></li>
                        <li><a href="https://www.gmail.com/" className="icon style2 fa-envelope-o"><span className="label">Email</span></a></li>
                    </ul>
              
                    <form>
                        <div className="form-row">
                            <div className="col-3">
                                <input
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="Item Name"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-3">
                                <select value={this.state.selectValue} onChange={this.handleInputChange} name="selectValue" className="form-control">
                                        <option value="" disabled>Select Category</option>
                                        <option value='all'>All</option>
                                        {this.state.categories.map(result=>(
                                                <option key={result._id} value={result._id}>{result.name}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="col-3">
                                <input
                                    value={this.state.zipcode}
                                    name="zipcode"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    placeholder="Zipcode"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-2">
                                <input
                                    value={this.state.radius}
                                    name="radius"
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Radius in miles"
                                    min="0"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-1">
                            <button className="searchButton" onClick={this.handleFormSubmit}>
                                SEARCH
                            </button>
                            </div>
                        </div>
                    </form>
                </header>
            
                <div className="container">

                      {this.state.results.length!==0?

                            <SearchResult results={this.state.results} user={this.props.user}/>:
                       
                            this.state.landing===false?
                            <section className="recentPost"> 
                                    Your search did not match any items.
                            </section>:""
                       }
                           
                </div>

               
                <footer id="footer">
                    <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
                </footer>

               

          </div>
        )
    }
   
}

export default Home;