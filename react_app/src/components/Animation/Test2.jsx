import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import "./style.scss";

import Arrow from "./SVGS/arrowSVG";
import Boutton from "./SVGS/boutton";
import Boutton2 from "./SVGS/boutton2";
// import Machine from "./SVGS/machineBack";
import Machine from "../Effects/MachineLayout";

gsap.registerPlugin(CSSRulePlugin);
export default function Test2() {
    const content = useRef(null);
    const anime1 = useRef(null);
    const pElement = useRef(null);
    var tl = gsap.timeline({defaults:{duration: 1, opacity: 0}});
    useEffect(() => {
        tl.from(pElement.current, {y:30, opacity: 0})
    }, []);

    const reverse = (timeline) => {
        timeline.reverse();
    }
    return (
        <div>
            {/* arrow : <Arrow ref={pElement}/> */}
            Machine : <Machine />
            Button : <Boutton/>
            Button2 : <Boutton2/>

            {/* <p ref={pElement}>Hello it's magic</p> */}
        </div>
    )
}