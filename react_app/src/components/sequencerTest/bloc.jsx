import React from 'react'

export default function bloc({bloc, blocIndex, callBackToggleBloc, metronomeActive}) {
    const handle = () => {
        callBackToggleBloc(bloc)
    }

    const classActive = bloc.isActive ?  "note_bloc_active" : "note_bloc";
    const onMetronome = metronomeActive ? "pink" : "";
    return (
        <div className={classActive} onClick={()=> handle(bloc)} style={{background : onMetronome}}>
            {bloc.note}
        </div>
    )
}