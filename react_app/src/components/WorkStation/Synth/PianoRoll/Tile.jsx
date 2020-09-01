import React from 'react'

export default function Tile({synth, note}) {

    const playNote = () => {
        synth.triggerAttackRelease(note, '8n');
    }
    let tileClasse = "";
    tileClasse = note.includes("#") ? tileClasse = "majorTile" : tileClasse = "tile"
    
    return (
        <div className={tileClasse} onClick={playNote}>
            <p>{note}</p>
        </div>
    )
}