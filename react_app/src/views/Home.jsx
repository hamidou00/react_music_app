import React from 'react';
import '../styles/index.css';
import Header from "../components/nav/header";
import logo from "../assets/svg/logo.svg";
import machine from "../assets/svg/machine.svg";
import arrow from "../assets/svg/arrow.svg";
import transition from "../assets/svg/transition.svg";
export default function Layout() {
    return (
    <>
        {/* <section className="Slide">
            
        </section> */}

        <section className="Slide2">
            <div className="logoSlide"><img src={logo}  alt="logo" /></div>
            <div className="machineSlide"><img src={machine}  alt="machine" /></div>
            <div className="scroll">
                <span>Introduction</span>
                <div className="arrow"><img src={arrow}  alt="arrow" /></div>
            </div>
            {/* <div className="transition"><img src={transition}  alt="transition" /></div> */}
            
        </section>
        <section className="sectionPiano">
            {/* <Header title="Piano" nav={false}/> */}
        </section>
    </>
    )
}
