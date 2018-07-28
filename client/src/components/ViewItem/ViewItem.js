import React from "react";
import "./ViewItem.css";
import axios from "axios";


class ViewItem extends React.Component{
    componentDidMount(){
            axios.get("/users-and-items").then((res=>{
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