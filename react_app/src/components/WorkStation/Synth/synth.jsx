import React, { useState } from 'react'
import Sequencer from '../Sequencer/sequencer';
import Effects from './effects';
import { useSelector, useDispatch, connect } from 'react-redux'

import {getEffects, getGammeNotes} from '../../../redux/reducers/synthSlice'
import Piano from './PianoRoll/Piano';

export default function Synth({synth, tone, synthIndex, effects}) {
    const dispatch = useDispatch();
    const gamme = useSelector(getGammeNotes)

    const changeVolume = (evt) => {
        synth.volume.value = evt.target.value;
    }

    return (
        <>
            <div className="Synth1">
                <h1>Synth {synthIndex} - {synth.toString()}</h1>
                Volume <input type="range" name="volume" min="-100" max="5" defaultValue="0" onChange={changeVolume}/>
                <Effects synth={synth} synthIndex={synthIndex} effects={effects}/>
                <Piano synth={synth} gamme={gamme}/>
                <Sequencer synth={synth} tone={tone} synthIndex={synthIndex}/>
            </div>
        </>
    )
}

// const mapStateToProps = state => ({ effects: state.Synth.effects })
// ToneTestComponent = connect(mapStateToProps)(ToneTestComponent)

// export default ToneTestComponent
