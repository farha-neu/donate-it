import React from "react";
import "./ViewItem.css";
import axios from "axios";


class ViewItem extends React.Component{

    state = {
        item: {},
        category:{},
        user:{},
        request:{}
    };
    
    componentDidMount() {
        axios.get(`/item/${this.props.match.params.id}`).then((response) => {
          this.setState({
            item: response.data,
            category:response.data.category,
            user:response.data.user,
            request: response.data.request
          });
          console.log(this.state.item.request);
        });
    }

    render(){
        return(
            <div>
             <center>
                <h1 className="viewItem">ViEW <span className="an">AN </span>iTEM</h1>
                
                <img src={this.state.item.img} alt="name"/>
                Item Id: {this.state.item._id}<br/>
                Name: {this.state.item.name}<br/>
                Description: {this.state.item.description}<br/>
                Condition: {this.state.item.condition}<br/>
                Note: {this.state.item.note}<br/>
                Category: {this.state.category.name}<br/>

                {this.state.item.request!=="undefined" ?<button>Request Item</button>:<button disabled>Request Item</button>}
                <br/>

                Contact Details:<br/>
                {this.state.user.firstname} {" "} {this.state.user.lastname}<br/>
                {this.state.user.email}<br/>
                {this.state.user.phonenumber}<br/>
                {this.state.user.city}  {this.state.user.state}  {this.state.user.zipcode}

                <footer id="footer">
                        <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
                </footer>
             </center>
           </div>
        )
    }
}
   


export default ViewItem;