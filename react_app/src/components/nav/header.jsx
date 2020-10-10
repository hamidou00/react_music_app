import React from 'react';
import { Link } from "react-router-dom";
import Nav from "./nav";
import logo from "../../assets/media/logo_seq_BIG2.png"
export default function header({title, nav}) {
    const allRoutes = [
        "About",
        "Contact",
        "AnimationTest",
        "AnimationTest2"
    ]
    return (
        <header className="header">
            <Link to="/">
                <img className="logo" src={logo}></img>
            </Link>
            
            {/* <div className="logo">{title}</div> */}
            {nav && <Nav routes={allRoutes} />}
        </header>
    )
}