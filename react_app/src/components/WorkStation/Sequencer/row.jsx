import React from 'react'
import Bloc from './bloc'
export default function row({row, toggleBloc}) {
    return (
        <div className="row">
            {
                row.map((bloc, i) => (
                    <Bloc
                    key={i}
                    bloc={bloc}
                    toggleBloc={toggleBloc}
                    />
                ))
            }
        </div>
    )
}
