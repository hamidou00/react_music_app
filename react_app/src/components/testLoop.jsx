import React from 'react'
import * as Tone from "tone";
import StartAudioContext from "startaudiocontext";

//const notes = ["C3", "Eb3", "G3", "Bb3"];
const synth = new Tone.MembraneSynth().toMaster();
const context = new AudioContext();


export default class testLoop extends React.Component {

    state = {
        synthSeq : synth,
        notes: [{note:"C3", enabled: false}, {note:"Eb3", enabled: false}, {note:"G3", enabled:false}, {note:"Bb3", enabled: false}],
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

    handleClick = () => {
        
        Tone.Transport.start(); // "the thing that drive my loop"
        this.state.loopBeat.start(0);
      }

    song = (time) => {
        
        this.state.bassSynth.triggerAttackRelease("c1", "8n", time);
        console.log(time);
    }

    OnOffNote = (noteToHandle) => {
        
        // let clone = notes.map((note, i) => {
        //     if(noteToHandle.note == note.note)
        //     {
        //         note.enabled = false
        //         return note
        //     }
        //     else
        //     {
        //         note.enabled = true
        //         return note
        //     }
        // })
        const notes = this.state.notes;
        const index = notes.findIndex((note,i) => noteToHandle === note)
        notes[index].enabled = !notes[index].enabled
        this.setState({notes : notes})
        

        
    }
    

    render() {
        return (
            <div>
                <div className="loopSection">
                    {console.log("STATE >>>>>>>",this.state.notes)}
                    {this.state.notes.map((note, i) => {
                        return (
                            <div
                            key={i}
                            onClick={() => this.OnOffNote(note)}
                            data-note={note.note}
                            data-position={i}
                            className={ "notes " + (note.note === this.state.noteEnclenche ? "note-active" : "note")}
                            style={{
                                color: note.note === this.state.noteEnclenche ? "yellow" : "blue",
                                background: !note.enabled && "rgb(221, 111, 111)"
                            }}
                            >
                                {note.note}
                            </div>
                        
                        )
                    })}
                </div>
                <button onClick={this.playLoop}>START</button>
                <button onClick={this.playSequence}>START seq</button>
                <button onClick={() => {Tone.Transport.stop()}}>STOP</button>
                <button onClick={this.handleClick}>Loop Test</button>
            </div>
        )
    }
}
