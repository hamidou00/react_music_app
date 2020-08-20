import React from 'react';
import { Link } from "react-router-dom";

export default function nav({routes}) {
    return (
    <nav>
        <label><Link to="/">Home</Link></label>
        {routes.map((route, i) => <label key={i}><Link to={'/'+route}>{route}</Link></label>)}
    </nav>
    )
}
