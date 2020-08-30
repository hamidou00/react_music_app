import React from 'react'

export default function ToolBar({play, stop}) {

    const playIt = () => {

    }

    const stopIt = () => {

    }
    return (
        <div className="toolbar">
            <button onClick={play}>START</button>
                
                <button onClick={stop}>STOP</button>
        </div>
    )
}
