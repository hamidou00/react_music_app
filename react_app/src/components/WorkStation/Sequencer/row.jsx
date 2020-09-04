import React from 'react'
import Bloc from './bloc'
export default function row({row, toggleBloc, metronome}) {
    return (
        <div className="row">
            {
                row.map((bloc, i) => (
                    <Bloc
                    key={i}
                    bloc={bloc}
                    blocRowIndex={i}
                    metronome={metronome}
                    toggleBloc={toggleBloc}
                    />
                ))
            }
        </div>
    )
}
