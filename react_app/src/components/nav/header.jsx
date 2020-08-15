import React from 'react';
//import { Link } from "react-router-dom";
import Nav from "./nav"

export default function header({title, nav}) {
    const allRoutes = [
        "about",
        "contact"
    ]
    return (
        <header className="header">
            <h1>{title}</h1>
            {nav && <Nav routes={allRoutes} />}
        </header>
    )
}
