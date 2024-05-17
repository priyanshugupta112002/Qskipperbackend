import React from "react";
import Layout from "../Layouts/Layout";
import  "../../css /Header.css"
// import { NavLink } from "react-router-dom";
import SegmentedButton from "../Layouts/segmentedButton";

const HomePage = ()=>{


    return (
        <Layout>
            <div className="HomePage">

            <SegmentedButton options={["Active Order" , "About Resturant" , "Products"]}  />


                {/* <div className="Home-Page-col-1">
                    <div className="HomePage-right-box">
                        <div className="Home-Page-col-1-row-1">
                            <NavLink to = "/" style={{ textDecoration: 'none', color: 'black', fontSize: '25px' }}> Order</NavLink>
                        </div>
                        <div className="Home-Page-col-1-row-2">
                        <NavLink to = "/" style={{ textDecoration: 'none', color: 'black', fontSize: '25px' }}> Listed Products</NavLink>
                        </div>
                        <div className="Home-Page-col-1-row-3">
                        <NavLink to = "/" style={{ textDecoration: 'none', color: 'black', fontSize: '25px' }}> Update Products</NavLink>
                        </div>
                        <div className="Home-Page-col-1-row-3">
                        <NavLink to = "/" style={{ textDecoration: 'none', color: 'black', fontSize: '25px' }}> Payments</NavLink>
                        </div>
                    </div>
                </div>
                <div className="Home-Page-col-2">
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div>
                        <div></div>
                    </div> */}
                {/* </div> */}
            </div>
        </Layout>
    )
}
export default HomePage