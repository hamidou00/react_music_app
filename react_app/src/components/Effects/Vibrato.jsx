import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getVibrato, setVibrato, setOneEffect } from '../../redux/reducers/synthSlice';

export default function Vibrato({synthIndex, vibratoProps}) {
    const dispatch = useDispatch();
    const defaultOptions = useSelector((state) => getVibrato(state, synthIndex))
    
    const [vibrato, setVib] = useState(defaultOptions);
    
    useEffect(()=> {
        let effectName = vibratoProps.toString();
        dispatch(setOneEffect({synthIndex, vibrato, effectName}))
        vibratoProps.set(vibrato)
    });

    const handleBitCrucher = (evt) => {
        let depth = evt.target.name == "depth" ? evt.target.value : vibrato.depth
        let wet = evt.target.name == "wet" ? evt.target.value : vibrato.wet
        let maxDelay = evt.target.name == "maxDelay" ? evt.target.value : vibrato.maxDelay
        let frequency = evt.target.name == "frequency" ? evt.target.value : vibrato.frequency
        let type = evt.target.name == "type" ? evt.target.value : vibrato.type
        setVib( { depth, wet, maxDelay, frequency, type })
    }
    

    return (
        <div className="effect">
            <div style={{border : "1px solid black"}} onChange={handleBitCrucher}> Vibrato
            <p>wet : {vibrato.wet} <input type="range" name="wet" max="1" min="0" step="0.1" defaultValue={vibrato.wet} /></p>
            <p>depth : {vibrato.depth} <input type="range" name="depth" max="1" min="0" step="0.1" defaultValue={vibrato.depth} /></p>
            <p>max delay : {vibrato.maxDelay} <input type="range" name="maxDelay" max="1" min="0" step="0.1" defaultValue={vibrato.maxDelay} /></p>
            <p>frequency : {vibrato.frequency} <input type="range" name="frequency" max="15" min="0" step="0.1" defaultValue={vibrato.frequency} /></p>
            <p>Type : {vibrato.type}
            <select name="type">
                <option>sine</option>
                <option>triangle</option>
                <option>sawtooth</option>
            </select>
            
            </p>
            </div>
        </div>
    )
}

// const mapStateToProps = state => ({
//     wet : state.Synth.synths[synthIndex].effects.bitCrusher.wet
// })