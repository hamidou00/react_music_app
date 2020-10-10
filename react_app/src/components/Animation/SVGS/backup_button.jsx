import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

export default function Boutton() {
    const [rotation, setRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const Button = useRef(null);
    const Centre = useRef(null);
    var tl = gsap.timeline({defaults:{duration: 0}});

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
        // console.log("useEffect ######")
        // console.log("rotation :", rotation);
        // console.log("rotation2.current :", rotation2.current);
        // console.log("useEffect ######")
        // console.log("isROTATING ??? : ", isRotating)
        // console.log("LALALAALALALA ; ", rotation2.current)
    }, [rotation, isRotating])

    function rotateButton(currentMouseOffsetY){
        // console.log("currentRotation Before : ", rotation2.current);
        // setRotation(rotation + degree);
        // rotation2.current = degree;
        // console.log("rotateButton ######")
        // console.log("offset :", mouseOffsetY.current);
        // console.log("rotation2.current :", rotation2.current);
        console.log("currentMouseOffsetY >", currentMouseOffsetY)
        // setRotation(rotation + degree);
        // if (rotation2.current <= 320 && rotation2.current >= 20)
        // {
            // console.log("LOOOOG")
            rotation2.current = rotation2.current + 10
            // if (mouseDirectionY(currentMouseOffsetY))
            // {
            //     console.log("PLUS +++++++++++++")
            //     rotation2.current = rotation2.current + 10
            //     setRotation1(rotation + 1);
            // }
            // else
            // {
            //     console.log("MOINS -----------------")
            //     rotation2.current = rotation2.current - 10
            //     setRotation1(rotation - 1);
            // }

            
            
            mouseOffsetY.current = currentMouseOffsetY;
        // }
        
    }

    function switchIsRotating(value){
        // console.log("AHAHAHAAHAHAHHAAH")
        setIsRotating(value)
    }

    function setRotation1(value){
        setRotation(value);
    }

    function mouseDirectionY(currentMouseOffsetY){
        if (currentMouseOffsetY > mouseOffsetY.current)
            {
                console.log("down");
                mouseOffsetY.current = currentMouseOffsetY;
                return false
            }
        else
            {
                console.log('up');
                mouseOffsetY.current = currentMouseOffsetY;
                return true
            }
    }






    const onMouseDown = (evt) => {
        if (evt.target.id === "Back") isRotating2.current = true
        // setIsRotating(true)
        switchIsRotating(isRotating2.current)
        console.log("MOUSE FKIN DOWN");
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
    }





    
    const onMouseDown1 = (evt) => {
        setIsRotating((lala) => {
            if (!lala) return true;
            return false;
        })
        setIsRotating(!isRotating)

        console.log("mouseDown1", isRotating)
    }





    // const onMouseDown = (evt) => {
            
    //     if (evt.target.id === "Back") setIsRotating(true)
    //     console.log("MOUSE FKIN DOWN", isRotating);
    // }

    // const onMouseMove = (evt) => {
    //     const lala = isRotating
    //     console.log("mouseMove ",isRotating)
    //     if (isRotating) console.log("x : ", evt.clientX, " y : ", evt.clientY);
    // }

    // const onMouseUp = () => {
    //     setIsRotating(false)
    //     console.log("MOUSE FKIN UP !!", isRotating);
    // }
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
        // onMouseDown={(evt) => onMouseDown(evt)}
        // onMouseMove={(evt) => onMouseMove(evt)}
        // onMouseUp={(evt) => onMouseUp(evt)}
        
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
                <g id="Centre" ref={Centre}>
                <circle id="Back" cx="72.29" cy="72.29" r="70.62" fill="#303030"/>
                <line id="Indicateur" x1="72.03" y1="11.27" x2="72.03" y2="27.32" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="3"/>
                </g>
            </g>
        </svg>
        <button onClick={() => rotateButton(-20)}>ROTATE LEFT</button>
        <button onClick={() => rotateButton(20)}>ROTATE RIGHT</button>
        </>


    )
}
