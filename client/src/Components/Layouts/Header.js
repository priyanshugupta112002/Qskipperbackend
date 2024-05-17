import React from "react";
import "../../css /Header.css"
import logoImage  from "../../images/Unknown.jpeg"
const Header = ()=>{



    return(
        <div className="navbar">
            <di>
                 <img src={logoImage} alt ="QSkipper" className="logo"/>
            </di>
    
            <div className="search-box">
                <input type="text" placeholder="Enter Order Number" />
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          
            <div>
                <ul>
                    <li>Home</li>
                    <li>Payments</li>
                    <li>user</li>
                    <li>Products</li>
                    <li>logout</li>
                
                </ul>
            </div>
    
        </div>
    )
}
export default Header