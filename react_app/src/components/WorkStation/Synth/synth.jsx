import React, { useState } from 'react'
import Sequencer from '../Sequencer/sequencer';
import { useSelector, useDispatch, connect } from 'react-redux'

import {setVolume, getEffects, getGammeNotes} from '../../../redux/reducers/synthSlice'


import Piano from './PianoRoll/Piano';

export default function Synth({synth, tone, synthIndex}) {
    const dispatch = useDispatch();
    const gamme = useSelector(getGammeNotes)
    //console.log(synth.get())

    const playANote = () => {
        synth.triggerAttackRelease("D4","8n")
    }

    const changeVolume = (evt) => {
        dispatch(setVolume(evt.target.value))
        synth.set({volume: evt.target.value})
    }

    return (
        <>
            <div className="Synth1">
                <h1>Synth {synthIndex}</h1>
                <button onClick={playANote}>Play a Note</button>
                <Piano synth={synth} gamme={gamme}/>
                <Sequencer synth={synth} tone={tone} />
            </div>
        </>
    )
}

// const mapStateToProps = state => ({ effects: state.Synth.effects })
// ToneTestComponent = connect(mapStateToProps)(ToneTestComponent)

// export default ToneTestComponent
