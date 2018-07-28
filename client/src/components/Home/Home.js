import React from "react";
import "./Home.css";
import axios from "axios"; 
import SearchResult from "./SearchResult";


class Home extends React.Component{
    state={
        results:[]
    }
    componentDidMount(){
       axios.get("/recent-items").then((response)=>{
           console.log(response.data);
           this.setState({results:response.data});
       })
    }

    render(){
        return (
            <div>    
                HOME PAGE<br/>
                SEARCH form<br/>
                <SearchResult results={this.state.results}/>              
             </div>
        )
    }
}
export default Home;