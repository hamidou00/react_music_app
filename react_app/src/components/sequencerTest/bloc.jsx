import React from 'react'

export default function bloc({bloc, blocIndex, callBackToggleBloc, metronomeActive}) {
    const handle = () => {
        callBackToggleBloc(bloc)
    }

    const classActive = bloc.velocity == 3 ?  "note_bloc_active" : "note_bloc";
    const onMetronome = metronomeActive ? "#8cafd1" : "";
    return (
        <div className={classActive} onClick={()=> handle(bloc)} style={{background : onMetronome}}>
            
        </div>
    )
}