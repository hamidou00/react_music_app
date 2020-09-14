import React from 'react';
//import ReactDOM from 'react-dom';
import '../styles/index.css';
// import Sound from './Sound';
// import Sampler from "../functions/testSampler";
// import Loop from "./loop";
import Header from "../components/nav/header";
// import Piano from "./piano";
// import TestLoop from "./testLoop";
// import TestLoop2 from "./testLoop2";
// import Sequencer from "./sequencerTest/Sequencer";

export default function Layout() {
    return (
    <>
        <section className="sectionTests">
            {/* <Sound /> */}
            {/* <Loop /> */}
        </section>
        <section className="sectionPiano">
            <Header title="Piano" nav={false}/>
            {/* <Piano /> */}
            {/* <Sampler /> */}
            {/* <TestLoop /> */}
            {/* <TestLoop2 /> */}
            {/* <Sequencer /> */}
        </section>
    </>
    )
}
