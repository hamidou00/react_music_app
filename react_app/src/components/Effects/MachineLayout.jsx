import React, {useEffect, useRef, useState} from 'react';
import "../../styles/index.css";
import { gsap } from "gsap";

import Button_Slide from '../Animation/SVGS/Button_Slide';

export default function MachineLayout() {
    const content = useRef(null);
    const [activePiano, setActivePiano] = useState(false);
    const pElement = useRef(null);
    var tl = gsap.timeline({defaults:{duration: 0.5}});
    useEffect(() => {
        
    }, []);
    useEffect(() => {
        let height = {};
        if (activePiano) 
            height =  {back1 : 500,back2 : 490}
        else
            height =  {back1 : 300,back2 : 300}
        tl
        .to("#machineBack_1", {height:height.back1}, "-0")
        .to("#machineBack_2", {height:height.back2}, "-0")
    })
    function switchPiano(){
        setActivePiano(!activePiano);
        tl.reverse();
    }
    return (
        <div className="allEff">
            <div className="effectMachine">
                {/* <h1>LALALALALALALALAALALLAALLALALALALALALAL</h1>
                <div className="testflex">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div> */}
                
                <div id="machineBack_1" className="effectBack"></div>
                <div id="machineBack_2" className="effectBack"></div>
                <div id="machineBack_3" className="effectBack">
                    <div className="effect_cardHead">
                        <div className="machineTitle"> <span>Vibrato</span> </div>
                    </div>
                    <div className="cardBody">
                        <Button_Slide value={50} name={"haha"} button_id={75} size={{height : "52", width : "52"}}/>
                        <Button_Slide value={50} name={"hoho"} button_id={74} size={{height : "52", width : "52"}}/>
                        <Button_Slide value={50} name={"hihi"} button_id={72} size={{height : "52", width : "52"}}/>
                    </div>
                    <div className="sinType"><span>Sin</span></div>
                </div>
                
            </div>

            <button onClick={switchPiano}>down</button>
        </div>
    )
}
