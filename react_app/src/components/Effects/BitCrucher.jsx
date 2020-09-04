import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getBitCrusher, setBitCrusher } from '../../redux/reducers/synthSlice';

export default function BitCrucher({synthIndex, synth}) {
    const dispatch = useDispatch();
    const lol = useSelector((state) => getBitCrusher(state, synthIndex))
    
    const [bitCrusher, setBit] = useState(lol);

    useEffect(()=> {
        dispatch(setBitCrusher({synthIndex, bitCrusher}))
        // synth.set({
        //     wet : parseInt(bitCrusher.wet),
        //     bits : parseInt(bitCrusher.wet)
        // })
    });

    const handleBitCrucher = (evt) => {
        let bits = evt.target.name == "bits" ? evt.target.value : bitCrusher.bits
        let wet = evt.target.name == "wet" ? evt.target.value : bitCrusher.wet
        setBit( { bits, wet })
        //console.log(synth.getDestination())
    }
    
    return (
        <div>
            <div style={{border : "1px solid black"}}> BitCrusher
            <p>wet : {bitCrusher.wet} <input onChange={handleBitCrucher} type="range" name="wet" max="1" min="0" step="0.1" value={bitCrusher.wet} /></p>
            <p>bits : {bitCrusher.bits} <input onChange={handleBitCrucher} type="range" name="bits" max="10" min="0" step="1" value={bitCrusher.bits} /></p>
            </div>
        </div>
    )
}

// const mapStateToProps = state => ({
//     wet : state.Synth.synths[synthIndex].effects.bitCrusher.wet
// })