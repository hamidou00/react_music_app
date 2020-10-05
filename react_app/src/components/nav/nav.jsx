import React from 'react';
import { Link } from "react-router-dom";

export default function nav({routes}) {
    return (
        <nav className="navigation"> 
            <Link className="navLinks bigButton" to="/WorkStation"><span>Commencer</span></Link>
            {
                routes.map((route, i) => (
                        <Link className="navLinks" key={i} to={'/'+route}>{route}</Link>
                ))
            }
        </nav>
    )
}