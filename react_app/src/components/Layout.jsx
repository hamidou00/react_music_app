import React from 'react';
//import ReactDOM from 'react-dom';
import '../styles/index.css';
import Header from "./nav/header";
import Home from "./Home";
import About from "./about";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Layout() {
    return (
    <Router>
        <Header title="Tone.js Test (y'a rien encore lol)" nav={true}/>

        <main className="mainP">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="*" component={NotFound} />
            </Switch>
        </main>

        <footer>
            
        </footer>
    </Router>
    )
}
