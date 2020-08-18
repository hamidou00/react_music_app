import React from 'react';
import * as Tone from "tone";
import StartAudioContext from "startaudiocontext";
import Row from "./row";
import bloc from './bloc';
import row from './row';
import defaultMatrix from "./matrixSequence.json";
import defaultSequence from "./sequence.json";
//const notes = ["C3", "Eb3", "G3", "Bb3"];
const synth = new Tone.PolySynth().toMaster();
const context = new AudioContext();

//const notes = ["C4","D4","E4","F4", "G4", "A4", "B4", "C5"]
const notes = ["C5","B4","A4","G4", "F4", "E4", "D4", "C4"]

const loopMatrix = notes.map(() => {
    return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
})

//console.log("LOOOP MATRIX",loopMatrix);

export default class Sequencer extends React.Component {

    state = {
        synth : null,
        notes: notes,
        loopMatrix: loopMatrix,
        noteEnclenche: "",
        bassSynth : null,
        metronomeIndex : -1,
        defaultSequence: defaultSequence
    }

    componentDidMount = () => {
        this.setState({synth})
        StartAudioContext(Tone.context);
        StartAudioContext(context);
    }
    
    playPart = () => {
        console.log(this.state.loopMatrix)
        Tone.Transport.stop();
        console.log("play")
        //const synth = new Tone.PolySynth().toMaster();
        // use an array of objects as long as the object has a "time" attribute
        const notes = this.state.notes;
        const loopMatrix = this.state.loopMatrix;
        // const notesMatrix = loopMatrix.filter((row, index) => {
        //     let tab = row.filter(bloc => Boolean(bloc))
        //     if (tab.length != 0) return row
        // })

        // const notesMatrix2 = notesMatrix.map((row, index) => {

        // })
        //copier la matrix et créer une matrix de notes avec leur velocity et time
        //ensuite ne rendre que les bloc actif (le chiffre 1) et leur mettre une
        //velocity de 0.5. Toute les autres cases seront undefined
        const notesMatrix = loopMatrix.map((row, index) => {
            return row.map((bloc, i, arr) => {
                return {
                    time: i,
                    note: notes[index],
                    velocity: Boolean(bloc) ? 0.5 : 0
                }
            })
        })
        //.filter(row => row.filter(bloc => !undefined))
        //console.log(notesMatrix.filter(row => row.find(bloc => !undefined)  ));

        //ne garder seulement les elements qui ne sont pas undefined
        const sequence = [];
        for (let i = 0; i < notesMatrix.length; i++){
            for (let b = 0; b < notesMatrix[i].length; b++){
                if (notesMatrix[i][b] != undefined) sequence.push(notesMatrix[i][b])
            }
        }

        //trier les notes par leur time
        //console.log(sequence.sort((a, b) => a.time - b.time));
        console.log(sequence)
        const part = new Tone.Part(this.callBackPart, sequence.sort((a, b) => a.time - b.time)).start(0);
        // part.loop = true;
        // part.loopStart = 0;
        Tone.Transport.bpm.value = 150;
        Tone.Transport.start("+0.0");
        // ramp the bpm to 120 over 10 seconds
        //Tone.Transport.bpm.rampTo(120, 10);
        
    }

    callBackPart = (time, value) => {
        //console.log("Valu >> ",value)
        console.log(value.time)
        this.metronome(value.time);
        // the value is an object which contains both the note and the velocity
        this.state.synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }
    callBackToggleBloc = (blocToToggle) => {
        //console.log(blocToToggle)
        const loopMatrixClone = [...this.state.loopMatrix].map((row, i) => {
            if (i == blocToToggle.rowIndex)
            {
                return row.map((bloc, i) => {
                    if (i == blocToToggle.blocIndex)
                        return !Boolean(bloc) ? 1 : 0;
                    else
                        return bloc
                })
            }else return row;
        })
        this.setState({loopMatrix: loopMatrixClone})
    }

    metronome = (time) => {
        if (this.state.metronomeIndex == this.state.loopMatrix.length-1)
            this.setState({metronomeIndex : -1})
        else
            this.setState({metronomeIndex : time})
    }
    

    render() {
        const {metronomeIndex} = this.state;
        return (
            <div>
                <div className="sequencer">
                    {this.state.loopMatrix.map((row, i) => (
                        <Row key={i}
                        row={row}
                        rowIndex={i}
                        metronomeIndex={metronomeIndex}
                        callBackToggleBloc={this.callBackToggleBloc}/>
                    ))}
                </div>
                <button onClick={this.playPart}>START seq</button>
                <button onClick={() => {Tone.Transport.stop()}}>STOP</button>
            </div>
        )
    }
}