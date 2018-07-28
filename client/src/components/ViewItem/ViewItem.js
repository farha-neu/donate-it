import React from "react";
import "./ViewItem.css";
import axios from "axios";


class ViewItem extends React.Component{
    componentDidMount(){
            axios.get("/search-items").then((res=>{
                 console.log("j",res.data); 
            }))
    }


    render(){
     
        return(
                <div></div>
              
        )
    }

}

export default ViewItem;