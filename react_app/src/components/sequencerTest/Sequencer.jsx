import React from 'react';
import * as Tone from "tone";
import StartAudioContext from "startaudiocontext";
import Row from "./row";
// import defaultMatrix from "./matrixSequence.json";
import roi_lion from "./roi-lion.json";
import defaultSequence from "./sequence.json";
import Effects from "./effects";
//const notes = ["C3", "Eb3", "G3", "Bb3"];

const synth = new Tone.PolySynth()


const context = new AudioContext();

//const notes = ["C4","D4","E4","F4", "G4", "A4", "B4", "C5"]
const notes = ["C5","B4","A4","G4", "F4", "E4", "D4", "C4"]

const loopMatrix = notes.map(() => {
    return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
})

const notesMatrix = [];
var count = 0;
var countTime = 0;
for (let i = 0; i < 8; i++){
    countTime = 0;
    for (let b = 0; b <= 16; b++){
        notesMatrix.push({
            time: "0:" + countTime,
            note: notes[i],
            velocity: 0,
            matrixIndex: count,
            rowIndex: i,
            isActive: false
        });
        count++;
        count += 0.5;
    }
}

// create an autopanner and start it

// route an oscillator through the panner and start it

//console.log(notesMatrix)
//console.log('LOOPMATRIX2 >>' , notesMatrix)
//console.log("LOOOP MATRIX",loopMatrix);

export default class Sequencer extends React.Component {

    state = {
        synth : null,
        notes: notes,
        loopMatrix: loopMatrix,
        notesMatrix: roi_lion, //notesMatrix
        noteEnclenche: "",
        bassSynth : null,
        metronomeIndex : 0,
        defaultSequence: defaultSequence,
        matrixMetronome : [],
        effects : {
            volume : 0.5,
            distortion : 0,
            vibrato : 0,
        }
    }

    componentDidMount = () => {

        this.setState({synth})
        StartAudioContext(Tone.context);
        StartAudioContext(context);
    }

    playPart = () => {
        //console.log("NOW >>>> ",Tone.now());
        // Tone.Transport.stop();
        // Tone.Transport.clear();
        
        //Tone.Transport.seconds = 0;
        console.log("play")
        const notes = this.state.notes;
        const loopMatrix = this.state.loopMatrix;
        
        const notesMatrix = loopMatrix.map((row, index) => {
            return row.map((bloc, i, arr) => {
                return {
                    time: i,
                    note: notes[index],
                    velocity: Boolean(bloc) ? 0.5 : 0
                }
            })
        })

        const sequence = [];
        for (let i = 0; i < notesMatrix.length; i++){
            for (let b = 0; b < notesMatrix[i].length; b++){
                if (notesMatrix[i][b] !== undefined) sequence.push(notesMatrix[i][b])
            }
        }
        
        const matrixMetronome = this.state.notesMatrix.map((v, i, index)=> {
            return {
                index : v.matrixIndex,
                isActive : v.velocity === 0.5 ? 1 : 0,
                time: v.time
            }
        })
        this.setState({matrixMetronome})
        const notos = this.state.notesMatrix.filter(bloc => bloc.velocity === 0.5)
        
        console.log(notos)
        //notos.forEach(bloc => )
        //console.log(notos)
        var intervalID = window.setInterval(this.testInterval, 250, 'Parameter 1', 'Parameter 2');
        setTimeout(() => clearInterval(intervalID), 250*17);

        const vibrato = new Tone.Vibrato(this.state.effects.vibrato)
        const distorsion = new Tone.Distortion(this.state.effects.distortion)
        //const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
        const gainNode = new Tone.Gain(this.state.effects.volume)
        this.state.synth.chain(vibrato , distorsion, gainNode, Tone.Master)
        const part = new Tone.Part(this.callBackPart, notos.sort((a, b) => a.time - b.time)).start("+0.0");
        // part.loop = true;
        // part.loopStart = 0;
        // Tone.Transport.bpm.value = 150;
        Tone.Transport.loop = true;
        Tone.Transport.loopEnd = "0:" + 0.5*17;
        Tone.Transport.start("+0.0");
        
        // ramp the bpm to 120 over 10 seconds
        //Tone.Transport.bpm.rampTo(120, 10);
        // console.log("lol")
    }

    testInterval = () => {
        this.metronome(this.state.metronomeIndex+1)
    }

    callBackPart = (time, value) => {
        console.log("time >> ",value.time)
        console.log("SECONDS >>>> :",Tone.Transport.seconds)
        //const timeToTriggerMetronome = this.state.matrixMetronome.find(v => v.index == value.matrixIndex)
        //console.log("TIMTOTRIGGER ",timeToTriggerMetronome)
        
        //console.log("VALUEEE >>>> ",value)
        //console.log("TONE TR SEC : ", Math.round(Tone.Transport.seconds))

        //Tone.Transport.seconds = 0;
        //console.log(Math.round(time))
        
        
        // the value is an object which contains both the note and the velocity
        
        this.state.synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }
    callBackToggleBloc = (blocToToggle) => {
        //console.log(blocToToggle)
        // const loopMatrixClone = [...this.state.loopMatrix].map((row, i) => {
        //     if (i == blocToToggle.rowIndex)
        //     {
        //         return row.map((bloc, i) => {
        //             if (i == blocToToggle.blocIndex)
        //                 return !Boolean(bloc) ? 1 : 0;
        //             else
        //                 return bloc;
        //         })
        //     }else return row;
        // })

        const notesMatrix = this.state.notesMatrix;
        const blocToToggleLol = notesMatrix.find(bloc => bloc.matrixIndex === blocToToggle.matrixIndex)
        //console.log(blocToToggleLol);
        
        notesMatrix.map((bloc) => {
            if (bloc.matrixIndex === blocToToggleLol.matrixIndex)
            {
                // bloc.velocity ==
                bloc.velocity = blocToToggleLol.velocity === 0.5 ? 0 : 0.5;
                bloc.isActive = !blocToToggleLol.isActive
                return bloc;
            }
            else
                return bloc;
        })
        this.setState({notesMatrix: notesMatrix})
    }

    metronome = (time) => {
        this.setState({metronomeIndex : time})
    }

    handleEffects = (options) => {
        Tone.Transport.pause();
        this.setState({effects : options}, () => {
            this.lol();
            Tone.Transport.start()
        })
    }

    lol = () => {
        // const vibrato = new Tone.Vibrato(this.state.effects.vibrato)
        // const distorsion = new Tone.Distortion(this.state.effects.distortion)
        // //const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
        // const gainNode = new Tone.Gain(this.state.effects.volume)
        // this.state.synth.chain(vibrato , distorsion, gainNode, Tone.Master)

        console.log(Tone)
    }
    
    render() {
        //console.log()
        const {metronomeIndex} = this.state;
        const {notesMatrix} = this.state
        //console.log("render render render !!!")
        return (
            <div>
                <div className="sequencer">
                    {[...new Array(8)].map((v, i, arr) => {
                        let row = notesMatrix.filter(v => v.rowIndex === i);
                        //console.log(blabla)
                        return <Row key={i}
                        row={row}
                        // rowIndex={i}
                        metronomeIndex={metronomeIndex}
                        callBackToggleBloc={this.callBackToggleBloc}/>
                    })}
                </div>
                <button onClick={this.playPart}>START</button>
                
                <button onClick={() => {
                    Tone.Transport.stop();
                    //Tone.Transport.dispose();
                    }}>STOP</button>
                <Effects callBackEffects={this.handleEffects}/>
            </div>
        )
    }
}