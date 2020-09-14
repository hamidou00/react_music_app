import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getBitCrusher, setBitCrusher, setOneEffect } from '../../redux/reducers/synthSlice';

export default function BitCrucher({synthIndex, bitCrusherProps}) {
    const dispatch = useDispatch();
    const defaultOptions = useSelector((state) => getBitCrusher(state, synthIndex))
    const [bitCrusher, setBit] = useState(defaultOptions);
    
    useEffect(()=> {
        let effectName = bitCrusherProps.toString();
        dispatch(setOneEffect({synthIndex, bitCrusher, effectName}))
        bitCrusherProps.set(bitCrusher)
    });
    
    const handleBitCrucher = (evt) => {
        let bits = evt.target.name == "bits" ? evt.target.value : bitCrusher.bits
        let wet = evt.target.name == "wet" ? evt.target.value : bitCrusher.wet
        setBit( { bits, wet })
    }
    
    return (
        <div className="effect">
            <div style={{border : "1px solid black"}}> BitCrusher
            <p>wet : {bitCrusher.wet} <input onChange={handleBitCrucher} type="range" name="wet" max="1" min="0" step="0.1" defaultValue={bitCrusher.wet} /></p>
            <p>bits : {bitCrusher.bits} <input onChange={handleBitCrucher} type="range" name="bits" max="10" min="4" step="1" defaultValue={bitCrusher.bits} /></p>
            </div>
        </div>
    )
}

// const mapStateToProps = state => ({
//     wet : state.Synth.synths[synthIndex].effects.bitCrusher.wet
// })