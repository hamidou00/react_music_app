import React from 'react';
//import ReactDOM from 'react-dom';
import '../styles/index.css';
import Sound from './Sound';
import Sampler from "../functions/testSampler";
import Loop from "./loop";
import Header from "./nav/header";
import Piano from "./piano";
import TestLoop from "./testLoop";

export default function Layout() {
    return (
    <>
        <section className="sectionTests">
            <Sound />
            <Loop />
        </section>
        <section className="sectionPiano">
            <Header title="Piano" nav={false}/>
            <Piano />
            {/* <Sampler /> */}
            <TestLoop />
        </section>
    </>
    )
}
