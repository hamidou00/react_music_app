import React from 'react';
import Bloc from './bloc';

export default function row({row, rowIndex, metronomeIndex, callBackToggleBloc}) {
    //console.log(">>>>> >>> ",row)
    return (
        <div className="row">
            {
                row.map((bloc, i) => (
                    <Bloc
                    key={i}
                    bloc={bloc}
                    // blocIndex={i}
                    // rowIndex={rowIndex}
                    metronomeActive={metronomeIndex === i ? true : false}
                    callBackToggleBloc={callBackToggleBloc}/>
                ))
            }
        </div>
    )
}