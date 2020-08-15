import React from 'react'
import Tile from './tile'
import * as Tone from "tone";

let notes = [
    {note: "C4", major:"C#4"},
    {note: "D4", major:"D#4"},
    {note: "E4"},
    {note: "F4", major:"F#4"},
    {note: "G4", major:"G#4"},
    {note: "A4", major:"A#4"},
    {note: "B4"},
    {note: "C5"},
]


export default class piano extends React.Component {

    state = {
        meter: 0
    }
    playNote = (note) => {
        var synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease(note, '8n')
        const meter = new Tone.Meter();
        synth.connect(meter);
        setInterval(() => this.setState({meter: meter.getValue().toFixed(2)}), 100);
    }
    
    render(){
        return (
            <>
            <div style={{height: "150px", position: "absolute"}}>
            <p id="meter"
            style={{
                height:((this.state.meter.toString()*1000)+"%"), 
                width:"50px", 
                background:"black", 
                color:"red", 
                transition: "ease 0.2s"
                }}>
                    {this.state.meter.toString()*1000}
                    
                    </p>
            </div>
            <div className="piano">
                <div className="gamme">
                    {notes.map((note, i) => <Tile key={i} note={note.note} i={i} playNoteCallback={this.playNote}/> )}
                </div>
    
                <div className="gamme major">
                    {notes.map((note, i) => note.major !== undefined && <Tile key={i} note={note.major} i={i} playNoteCallback={this.playNote}/> )}
                </div>
            </div>
    
            
            </>
            
        )
    }
    
}
