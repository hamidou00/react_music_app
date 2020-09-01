import React, { useEffect } from 'react';
import SynthList from './SynthList'

export default function WorkStation({synths, tone}) {
    useEffect(() => {
        synths[0].toMaster();
        tone.Transport.start("+0.0");
    })
    return (
        <div className="WorkStation1">
            <h1>WorkStation (editeur en gros lul)</h1>
            <button>The Super Mega Button To Run All Those LUl trop bien</button>
            <SynthList synths={synths} tone={tone}/>
        </div>
    )
}


