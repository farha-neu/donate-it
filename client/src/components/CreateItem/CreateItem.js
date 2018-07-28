import React from "react";
import "./CreateItem.css";


const CreateItem =() =>(
     <div>
        <center>

        <form>
            <img className="logoD" src="images/logo.png"/>
            <div className="logoName">
                <span className="donate"> DoNATE </span>-  iT!
            </div>

             <h1 className="createTitle">CREATE <span className="new"> NEW </span>ITEM</h1>

            <select data-placeholder="" className="form-control col-md-6">
                <option value="" disabled selected>Category</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <input className="loginInput"
                type="text"
                placeholder="Item Name"
            />
            <input className="loginInput"
                type="text"
                placeholder="Condition"
            />
            <input className="loginInput"
                type="text"
                placeholder="Additional Notes"
            />
            <input className="loginInput"
                type="text"
                placeholder="Phone number"
            />
            <input className="loginInput"
                type="text"
                placeholder="Image"/>

            <button className="createItemButton" onClick={this.handleFormSubmit}>Submit</button>

          </form>

        <footer id="footer">
            <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
        </footer>
        </center>
    </div>
)

export default CreateItem;