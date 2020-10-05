import React, { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import "./style.scss";

gsap.registerPlugin(CSSRulePlugin);
export default function Test() {
    const content = useRef(null);
    const anime1 = useRef(null);
    // const content = useRef(null);
    // const content = useRef(null);
    // const content = useRef(null);

    useEffect(() => {
        // gsap.from(content.current, {
        //     autoAlpha: 0,
        //     ease: 'none',
        //     delay: 1
        // });
        // gsap.set("main2", {autoAlpha: 0});
        var tl = gsap.timeline({defaults:{duration: 1, opacity: 0}});
        var rule = CSSRulePlugin.getRule(".anim1 span:after");
        tl.from(".avoidAnimationClipping", {autoAlpha: 0})
        .from(".anim1", {y:-50, stagger: .6})
            .to(rule, {duration: 1.8,cssRule: {scaleY: 0}}, "-=2.2")
            .from(".aside1", {backgroundPosition: '200px 0px', opacity: 0}, "-=1.5")
            .from(".img1", {y:30, opacity: 0}, "-=.5")
    }, []);

    return (
        <div className="body2 avoidAnimationClipping">
            <div className="main2">
                <div class="content" ref={content}>
                <h1 class="anim1" ref={anime1}><span>Bridging the gap</span> <span>between dream</span> <span>and reality</span></h1>
                <p class="anim1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio at ipsa alias modi natus excepturi?</p>
                <a href="#" class="anim1 aa" id="cta">Start Dreaming</a>
                </div>
            </div>
            <aside className="aside1">
                <div class="wrapper">
                    <img class="swirl img1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/swirl.png" alt="Swirl Graphic"/>
                </div>
            </aside>
        </div>
        
    )
}
