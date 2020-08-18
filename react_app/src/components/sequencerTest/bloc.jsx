import React from 'react'

export default function bloc({bloc, blocIndex, rowIndex, callBackToggleBloc, metronomeActive}) {
    const handle = () => {
        callBackToggleBloc({bloc, blocIndex, rowIndex})
    }

    const classActive = Boolean(bloc) ?  "note_bloc_active" : "note_bloc";
    const onMetronome = metronomeActive ? "pink" : "";
    return (
        <div className={classActive} onClick={()=> handle(bloc)} style={{background : onMetronome}}>
            {bloc}
        </div>
    )
}