import React from 'react'
import * as Tone from "tone";
import StartAudioContext from "startaudiocontext";

//const notes = ["C3", "Eb3", "G3", "Bb3"];
const synth = new Tone.MembraneSynth().toMaster();
const context = new AudioContext();


export default class testLoop extends React.Component {

    state = {
        synthSeq : synth,
        notes: [{note:"C4", enabled: false}, {note:"D4", enabled: false}, {note:"E4", enabled:false}, {note:"F4", enabled: false}],
        noteEnclenche: "",
        loopBeat : null,
        bassSynth : null
    }

    componentDidMount = () => {
        StartAudioContext(Tone.context);
        StartAudioContext(context);

        this.setState({loopBeat : new Tone.Loop(this.song, "2n")})
        this.setState({bassSynth : new Tone.MembraneSynth().toMaster()})
    }
    
    playLoop = () =>{
        const loop = new Tone.Loop(this.callBackSound, "4n").start(0);
        Tone.Transport.start();
    }

    callBackSound(time) {
        const membraneSynth = new Tone.Synth().toMaster();
        membraneSynth.triggerAttackRelease("C4", "8n");

        const synth = new Tone.MembraneSynth().toMaster();
        
        console.log(time)
    }

    playSequence = () => {
        const synthSeq = new Tone.Sequence(this.callBackSeq, this.state.notes, "8n");
        synthSeq.start(0)
        Tone.Transport.start();
    }

    callBackSeq = (time, note) => {
        if (note.enabled)
        this.state.synthSeq.triggerAttackRelease(note.note, "8n", time)

        this.setState({noteEnclenche : note.note, noteClassName: "note.note-active"})
        console.log(time)
    }

    song = (time) => {
        
        this.state.bassSynth.triggerAttackRelease("c1", "8n", time);
        console.log(time);
    }


    playPart = () => {
        const synth = new Tone.PolySynth().toMaster();
        // use an array of objects as long as the object has a "time" attribute
        const part = new Tone.Part(((time, value) => {
        // the value is an object which contains both the note and the velocity
            synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
        }),
        [
            { time: 0, note: "D4", velocity: 0.5 },
            { time: 0, note: "F4", velocity: 0.5 },
            { time: 0, note: "A4", velocity: 0.5 },
            { time: 2, note: "G4", velocity: 0.5 }
        ]).start(0);
        part.loop = true;
        part.loopStart = 0;
        Tone.Transport.start(0);
        
    }

    OnOffNote = (noteToHandle) => {
        
        const notes = this.state.notes;
        const index = notes.findIndex((note,i) => noteToHandle === note)
        notes[index].enabled = !notes[index].enabled
        this.setState({notes : notes})
        

        
    }

    handleClick = () => {
        
        Tone.Transport.start(); // "the thing that drive my loop"
        this.state.loopBeat.start(0);
    }
    

    render() {
        return (
            <div>
                <div className="loopSection">
                    {this.state.notes.map((note, i) => {
                        return (
                            <div
                            key={i}
                            onClick={() => this.OnOffNote(note)}
                            data-note={note.note}
                            data-position={i}
                            className={ "notes " + (note.note === this.state.noteEnclenche ? "note-active" : "note2")}
                            style={{
                                color: note.note === this.state.noteEnclenche ? "yellow" : "blue",
                                background: !note.enabled && "green"
                            }}
                            >
                                {note.note}
                            </div>
                        
                        )
                    })}
                </div>
                <button onClick={this.playLoop}>LALALAL START</button>
                <button onClick={this.playSequence}>LALALALA START seq</button>
                <button onClick={() => {Tone.Transport.stop()}}>LALALAL STOP</button>
                <button onClick={this.handleClick}>LALALA Loop Test</button>
                <button onClick={this.playPart}>Sequence Test</button>
            </div>
        )
    }
}
