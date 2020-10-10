import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

export default function Boutton() {
    const [rotation, setRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const Button = useRef(null);
    const Centre = useRef(null);
    const [mouseDirection, setMouseDirectionValue] = useState(null);


    var tl = gsap.timeline({defaults:{duration: 0.5}});

    const isRotating2 = useRef(false);
    const rotation2 = useRef(0);
    const mouseOffsetY = useRef(0);


    useEffect(() => {
        // tl.from(Button.current, {y:30, opacity: 0, rotation: 360})
        // tl.from(Centre.current, {rotation: 360, transformOrigin:"50% 50%"})
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousedown', onMouseDown);
        return () => {
        document.removeEventListener('mouseup', onMouseMove);
        document.removeEventListener('mousedown', onMouseUp);
        document.removeEventListener('mousemove', onMouseDown);
        }
    }, []);


    useEffect(() => {
        tl.to(Centre.current, {rotation: rotation2.current, transformOrigin:"50% 50%"});
    }, [rotation, isRotating])

    function rotateButton(currentMouseOffsetY){
        console.log("rotation2.current >", rotation2.current)
        setRotation(rotation + currentMouseOffsetY);

        if (mouseDirectionY(currentMouseOffsetY)){
            setMouseDirectionValue("Cliqué + glissé haut");
            if (rotation2.current <= 120) rotation2.current = rotation2.current + 10
        }
        else{
            setMouseDirectionValue("Cliqué  + glissé bas");
            if (rotation2.current >= -120) rotation2.current = rotation2.current - 10
        }
    }

    function switchIsRotating(value){
        setIsRotating(value)
    }

    function mouseDirectionY(currentMouseOffsetY){
        const oldMouseOffsetY = mouseOffsetY.current;
        mouseOffsetY.current = currentMouseOffsetY;
        if (currentMouseOffsetY < oldMouseOffsetY)
            return true
        else
            return false
    }

    const onMouseDown = (evt) => {
        if (evt.target.id === "Back") isRotating2.current = true
        // setIsRotating(true)
        switchIsRotating(isRotating2.current)
        console.log("MOUSE FKIN DOWN");
        setMouseDirectionValue("Cliqué")
    }

    const onMouseMove = (evt) => {
        if (isRotating2.current){
            rotateButton(evt.clientY)
            // console.log("x : ", evt.clientX, " y : ", evt.clientY-100);
        }
    }

    const onMouseUp = () => {
        isRotating2.current = false
        // setIsRotating(false)
        switchIsRotating(isRotating2.current)
        console.log("MOUSE FKIN UP !!");
        setMouseDirectionValue("null")
    }

    return (
        <>
        <svg 
        id="Calque_1"
        data-name="Calque 1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        width="144.58"
        height="144.58"
        viewBox="0 0 144.58 144.58"
        >
            <defs>
                <linearGradient id="Dégradé_sans_nom_7" data-name="Dégradé sans nom 7" x1="133.61" y1="18.74" x2="16.69" y2="120.85" gradientUnits="userSpaceOnUse">
                {/* <stop offset="0" stop-color="#1a1a1a"/> */}
                {/* <stop offset="1" stop-color="#303030"/> */}
                </linearGradient>
            </defs>
            <title>Sans titre - 1</title>
            <g id="Button">
                <circle id="Liserais_Lumineux" data-name="Liserais Lumineux" cx="72.29" cy="72.29" r="72.29" fill="url(#Dégradé_sans_nom_7)"/>
                <g id="Centre" ref={Centre} className="pointer">
                <circle id="Back" cx="72.29" cy="72.29" r="70.62" fill="#303030"/>
                <line id="Indicateur" x1="72.03" y1="11.27" x2="72.03" y2="27.32" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="3"/>
                </g>
            </g>
        </svg>
        <button onClick={() => rotateButton(-50)}>ROTATE LEFT</button>
        <button onClick={() => rotateButton(50)}>ROTATE RIGHT</button>
        <p>Value (en degré) : {rotation2.current}</p>
        <p>Statut de la souris  : {mouseDirection}</p>
        </>
    )
}
