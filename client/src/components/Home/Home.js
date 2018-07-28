import React from "react";
import "./Home.css";
import "./main.css";

const Home =(props) =>(
    <div>
        <header id="header">
            <img className="logoD" src="images/logo.png"/>
            <div className="logoName">
                <span className="donate"> DoNATE </span>-  iT!
            </div>

            <ul class="icons">
            <li><a href="#" className="icon style2 fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon style2 fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon style2 fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon style2 fa-envelope-o"><span className="label">Email</span></a></li>
            </ul>

            <form>
                <div className="form-row">
                    <div className="col-3">
                    <input type="text" className="form-control" placeholder="Item Name"></input>
                    </div>
                    <div className="col-3">
                    
                    <select data-placeholder="" className="form-control">
                        <option value="" disabled selected>Category</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    </div>
                    <div className="col-3">
                    <input type="text" className="form-control" placeholder="Zipcode"></input>
                    </div>
                    <div className="col-2">
                    <input type="text" className="form-control" placeholder="Radius"></input>
                    </div>
                    <div className="col-1">
                    <button className="searchButton">
                        SEARCH
                    </button>
                    </div>
                </div>
                </form>
        </header>

        <section id="main">

                <section className="recentPost">
                    <div>
                    <a href="images/playHouse.jpg">
                        <img src="images/playHouse.jpg" alt="" />
                        <h3 className="recentFont">Play House</h3>
                    </a>
                    </div>
                    <div>
                    <a href="images/catPost.jpg">
                        <img src="images/catPost.jpg" alt="" />
                        <h3 className="recentFont">Cat Post</h3>
                    </a>
                    </div>
                    <div>
                    <a href="images/babyGate.jpg">
                        <img src="images/babyGate.jpg" alt="" />
                        <h3 className="recentFont">Baby Safety Gate</h3>
                    </a>
                    </div>
                </section>

        </section>

        <footer id="footer">
            <p>&copy;<span className="copy"> Donate  </span>-  It! 2018</p>
        </footer>

        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/jquery.poptrox.min.js"></script>
        <script src="assets/js/skel.min.js"></script>
        <script src="assets/js/main.js"></script>

    </div>
)

export default Home;