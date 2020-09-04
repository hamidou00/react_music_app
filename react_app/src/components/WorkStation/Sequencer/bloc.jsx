import React from 'react'

export default function bloc({bloc, blocRowIndex, toggleBloc, metronome}) {
    const handle = () => {
        toggleBloc(bloc);
    }

    const classActive = bloc.velocity === 3 ?  "note_bloc_active" : "note_bloc";
    const onMetronome = metronome === blocRowIndex ? "#8cafd1" : "";
    return (
        <div className={classActive} onClick={()=> handle(bloc)} style={{background : onMetronome}}>
            
        </div>
    )
}