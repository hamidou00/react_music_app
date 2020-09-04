import React, { useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
// import {setVolume, getEffects} from '../../../redux/reducers/synthSlice'

import Tile from './Tile'

export default function Piano({synth, gamme}) {

    return (
        <div className="piano">
            <div className="gamme">
                {gamme.map((note, i) => <Tile key={i} note={note.note} i={i} synth={synth}/> )}
            </div>

            <div className="gamme major">
                {gamme.map((note, i) => note.major !== undefined && <Tile key={i} note={note.major} synth={synth}/> )}
            </div>
        </div>
    )   
}