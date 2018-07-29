import React from "react";
import axios from "axios";


class ViewItem extends React.Component {
  state = {
    item: {},
    category:{},
    user:{}
  };

  componentDidMount() {
    axios.get(`/item/${this.props.match.params.id}`).then((response) => {
      this.setState({
        item: response.data,
        category:response.data.category,
        user:response.data.user
      });
      console.log(this.state.item,this.state.category);
    });
  }

 
  render() {
    return (
      <div>
            <img src={this.state.item.img} alt="name"/>
            Item Id: {this.state.item._id}
            Name: {this.state.item.name}
            Description: {this.state.item.description}
            Condition: {this.state.item.condition}
            Note: {this.state.item.note}
            Category: {this.state.category.name}
            <hr/>
            Contact: {this.state.user.username} 
            {this.state.user.email}
            {this.state.user.phonenumber}
            Zipcode:{this.state.user.zipcode}
      </div>
    );
  }
}

export default ViewItem;
