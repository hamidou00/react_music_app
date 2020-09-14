import React from 'react';
import Synth from './Synth/synth';


export default function SynthList({synths, tone, effects}) {
    return (
        <div className="SynthList1">
            {
                synths.map((synth, i) => <Synth synth={synth} tone={tone} key={i} synthIndex={i} effects={effects[i]}/>)
            }
        </div>
    )
}
