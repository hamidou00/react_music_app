import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import "../../../styles/index.css";
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
const style = `
.cls-1, .cls-2, .cls-5 {
    fill: none;
    stroke-miterlimit: 10;
  }

  .cls-1 {
    stroke: #4f4f4f;
    stroke-dasharray: 310;
  }

  .cls-1, .cls-5 {
    stroke-width: 4px;
  }

  .cls-2 {
    stroke: #f09cdb;
    stroke-width: 4px;    
  }

  .cls-3 {
    fill: url(#Dégradé_sans_nom_7);
  }

  .cls-4 {
    fill: #303030;
  }

  .cls-5 {
    stroke: #fff;
  }`
export default function Boutton({value, name, button_id, size}) {
    const [rotation, setRotation] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const Boutton_Cercle = useRef(null);
    const [mouseDirection, setMouseDirectionValue] = useState(null);
    const [stroke, setStroke] = useState(0);
    const jauge = useRef(null)

    var tl = gsap.timeline({defaults:{duration: 0}});

    const isRotating2 = useRef(false);
    const rotation2 = useRef(0);
    const mouseOffsetY = useRef(0);


    useEffect(() => {
        console.log("JAUGE : ", jauge.current.getTotalLength())
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
        tl
        .to(Boutton_Cercle.current, {rotation: rotation2.current, transformOrigin:"50% 50%"})
        .to(jauge.current, {strokeDashoffset: rotation2.current})
    }, [rotation, isRotating])

    function rotateButton(currentMouseOffsetY){
        console.log("rotation2.current >", rotation2.current)
        setRotation(rotation + currentMouseOffsetY);

        if (mouseDirectionY(currentMouseOffsetY)){
            setMouseDirectionValue("Cliqué + glissé haut");
            if (rotation2.current < 310){
                rotation2.current = rotation2.current + 10
                setStroke(rotation2.current - 360)
            }
        }
        else{
            setMouseDirectionValue("Cliqué  + glissé bas");
            if (rotation2.current > 0){
                rotation2.current = rotation2.current - 10
                setStroke(rotation2.current + 360)
            }
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
        if (evt.target.id === ("Button_" + button_id)) isRotating2.current = true
        // setIsRotating(true)
        switchIsRotating(isRotating2.current)
        console.log("MOUSE FKIN DOWN");
        setMouseDirectionValue("Cliqué")
    }

    const onMouseMove = (evt) => {
        if (isRotating2.current){
            rotateButton(evt.clientY)
        }
    }

    const onMouseUp = () => {
        isRotating2.current = false
        // setIsRotating(false)
        switchIsRotating(isRotating2.current)
        console.log("MOUSE FKIN UP !!");
        setMouseDirectionValue("null")
    }

    const slider = (e) => {
        console.log(e.target.value);
        setStroke(e.target.value)
    }
    return (
        <div className="buttonSlide">
        <svg 
        id="Calque_1"
        data-name="Calque 1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        width="195.08" height="192.15"
        viewBox="0 0 195.08 192.15"
        >
            <defs>
                <style>{style}</style>
                <linearGradient id="Dégradé_sans_nom_7" data-name="Dégradé sans nom 7" x1="159.1" y1="46.23" x2="42.19" y2="148.34" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#1a1a1a"/>
                <stop offset="1" stopColor="#303030"/>
                </linearGradient>
            </defs>
            <title>Sans titre - 1</title>
                <g id="Button2Test">
                    <g id="Jauge">
                        <path id="Jauge_colored" class="cls-2" d="M996.13,634.31c34.93-14.6,59.55-49.67,59.55-90.62,0-54-42.89-97.86-95.79-97.86s-95.79,43.82-95.79,97.86c0,40.95,24.61,76,59.54,90.62" transform="translate(-862.6 -444.33)"/>
                        <path id="Jauge_back" ref={jauge}  pathLength="310" class="cls-1" d="M996.13,634.31c34.93-14.6,59.55-49.67,59.55-90.62,0-54-42.89-97.86-95.79-97.86s-95.79,43.82-95.79,97.86c0,40.95,24.61,76,59.54,90.62" transform="translate(-862.6 -444.33)"/>
                    </g>
                    <circle id="Liserais_Lumineux" data-name="Liserais Lumineux" className="cls-3" cx="97.79" cy="99.78" r="72.29"/>
                    <g id="Boutton_Cercle" ref={Boutton_Cercle} className="pointer">
                    <circle id={"Button_" + button_id} className="cls-4" cx="97.79" cy="99.78" r="70.62"/>
                    <line id="Indicateur" class="cls-5" x1="72.28" y1="154.94" x2="78.92" y2="140.33"/>
                    </g>
                </g>
            </svg>
            <span>{name}</span>
        </div>
    )
}
