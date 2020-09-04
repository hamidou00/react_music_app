import React from 'react';
import * as Tone from "tone";
import StartAudioContext from "startaudiocontext";
import Row from "./row";
// import defaultMatrix from "./matrixSequence.json";
import roi_lion from "./datas/roi-lion.json";
import defaultSequence from "./datas/sequence.json";
import Effects from "./effects";
import ToolBar from "./ToolBar";
import PreviewKeyBoard from "./previewKeyBoard";
//const notes = ["C3", "Eb3", "G3", "Bb3"];

// ######################### EFFECTS ###############################
const vibrato = new Tone.Vibrato(0);
const distorsion = new Tone.Distortion(0);
//const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5);
const gainNode = new Tone.Gain(0.5);
const reverb = new Tone.Reverb({
    reverb : 1,
    decay: 1,
    preDelay : 0,
    wet: 0
});
const vol = new Tone.Volume(0);
// ######################### |||||| ##########################
const synth = new Tone.PolySynth();

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
    for (let b = 0; b < 20; b++){
        notesMatrix.push({
            time: "0:" + countTime,
            note: notes[i],
            velocity: 0,
            matrixIndex: count,
            rowIndex: i,
            isActive: false,
            inRowIndex : b
        });
        count++;
        countTime += 0.5;
    }
}

console.log(notesMatrix)

// create an autopanner and start it

// route an oscillator through the panner and start it

//console.log(notesMatrix)
//console.log('LOOPMATRIX2 >>' , notesMatrix)
//console.log("LOOOP MATRIX",loopMatrix);

export default class Sequencer extends React.Component {

    state = {
        synth : synth,
        notes: notes,
        loopMatrix: loopMatrix,
        notesMatrix: notesMatrix, //notesMatrix
        noteEnclenche: "",
        bassSynth : null,
        metronomeIndex : -1,
        defaultSequence: defaultSequence,
        matrixMetronome : [],
        activatedNotes: null,
        effects1: {
            volume : vol,
            gainNode : null,
            distortion : null,
            vibrato : vibrato,
            reverb : reverb
        },
        effects : {
            volume : 0.5,
            distortion : 0,
            vibrato : 0,
            reverb : 0
        },
        testCount : 0
    }
    componentDidMount = () => {
        //this.setState({synth})
        this.setState({
            synth : synth,
            effects1: {
                volume : gainNode,
                distortion : distorsion,
                vibrato : vibrato,
                reverb : reverb,
                gainNode : gainNode
            }
        })
        StartAudioContext(Tone.context);
        StartAudioContext(context);
    }

    playPart = async () => {
        console.log(Tone.Transport);
        clearInterval(intervalID)
        clearTimeout(timeou)
        this.setState({metronomeIndex: -1})

        
        //var intervalID = null
        var intervalID = window.setInterval(this.testInterval, 250, 'Parameter 1', 'Parameter 2');
        var timeou = setTimeout(() => clearInterval(intervalID), 250*22);

        //console.log("NOW >>>> ",Tone.now());
        // Tone.Transport.stop();
        // Tone.Transport.clear();
        //Tone.Transport.seconds = 0;
        
        const notes = this.state.notes;
        const loopMatrix = this.state.loopMatrix;
        
        const notesMatrix = loopMatrix.map((row, index) => {
            return row.map((bloc, i, arr) => {
                return {
                    time: i,
                    note: notes[index],
                }
            })
        })
        const notos = this.state.notesMatrix.filter(bloc => bloc.velocity === 3)
        
        //console.log("NOTOSE :: " , notos)
        

        // const vibrato = new Tone.Vibrato(this.state.effects.vibrato);
        // const distorsion = new Tone.Distortion(this.state.effects.distortion);
        // //const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
        // const gainNode = new Tone.Gain(this.state.effects.volume);
        // const reverb = new Tone.Reverb(this.state.effects.reverb);
        //var lol = await reverb.generate()
        // console.log("THE PROMISE >>>", lol, "AND READY is ? ", reverb.ready);
        // this.state.synth.chain(vibrato , distorsion , reverb , gainNode , Tone.Master)
        
        // this.setState({activatedNotes: notos.sort((a, b) => a.time - b.time)}, () => {
            this.state.synth.chain(
                vibrato,
                // feedbackDelay,
                // distortion,
                // this.state.effects1.reverb,
                reverb,
                vol,
    
                Tone.Master
            )
            const part = new Tone.Part(this.callBackPart, notos.sort((a, b) => a.time - b.time)).start("+0.0");
            const loop = new Tone.Loop(this.testLoop, "8n").start(0);
            Tone.Transport.start("+0.0");
        // })
        // part.loop = true;
        // part.loopStart = 0;
        // Tone.Transport.bpm.value = 150;
        // Tone.Transport.loop = true;
        // Tone.Transport.loopEnd = "0:" + 0.5*17;
    }
    testLoop = (time) => {
        this.setState({testCount : this.state.testCount+1})
    }

    testInterval = () => {
        this.metronome(this.state.metronomeIndex+1)
    }

    callBackPart = async (time, value) => {
        //console.log("time >> ",value.time);
        //console.log("SECONDS >>>> :",Tone.Transport.seconds);
        //const timeToTriggerMetronome = this.state.matrixMetronome.find(v => v.index == value.matrixIndex)
        //console.log("TIMTOTRIGGER ",timeToTriggerMetronome)
        
        //console.log("VALUEEE >>>> ",value)
        //console.log("TONE TR SEC : ", Math.round(Tone.Transport.seconds))
        console.log(time)
        //Tone.Transport.seconds = 0;
        //console.log(Math.round(time))
        const lol = await reverb.generate();
        //console.log(lol)
        // the value is an object which contains both the note and the velocity
        
        synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
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
                bloc.velocity = blocToToggleLol.velocity === 3 ? 0 : 3;
                // bloc.isActive = !blocToToggleLol.isActive
                return bloc;
            }
            else
                return bloc;
        })
        this.setState({notesMatrix: notesMatrix, activatedNotes: notesMatrix.filter(note => note.velocity == 3)})
    }

    metronome = (time) => {
        this.setState({metronomeIndex : time})
        // console.log(time)
    }

    handleEffects = (options) => {
        //Tone.Transport.pause();
        // this.setState({effects : options}, () => {
        //     this.lol();
        //     Tone.Transport.start();
        // })
        //console.log(gainNode.get())
        console.log({options})
        console.log("Effects Options : ", options.volume);
        //const gainNode = this.state.effects1.gainNode;
        // console.log("Avant : ", vol.get());
        vol.set({volume : parseInt(options.volume)});
        vibrato.set({
            depth : parseInt(options.vibrato),
            frequency : 3,
            wet: 3
        });
        // console.log("Après : ", vol.get());
        // gainNode.set(options.volume)
        
        // this.setState({effects1 : {
        //     gainNode : gainNode
        // }}, () => {
        //     this.lol();
        //     Tone.Transport.start();
        // })
    }

    playPreviewsKeyboardNote = (note) => {
        this.state.synth.triggerAttackRelease(note, "8n");
        this.state.synth.chain(
            vibrato,
            // distortion,
            // this.state.effects1.reverb,
            // reverb,
            vol,
            Tone.Master
        )
        Tone.Transport.start();
    }

    lol = () => {
        // const vibrato = new Tone.Vibrato(this.state.effects.vibrato)
        // const distorsion = new Tone.Distortion(this.state.effects.distortion)
        // //const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
        // const gainNode = new Tone.Gain(this.state.effects.volume)
        // this.state.synth.chain(vibrato , distorsion, gainNode, Tone.Master)
        // console.log(Tone)
    }
    stop = () => {
        Tone.Transport.stop();
    }
    render() {
        //console.log()
        const {metronomeIndex} = this.state;
        const {notesMatrix} = this.state;
        const {effects1, synth} = this.state;
        //const {vibrato} = effects1
        // console.log("LALALAAL ", synth, effects1);
        //console.log("render render render !!!")
        return (
            <div className="sequencer">
                {this.state.testCount}
                <ToolBar play={this.playPart} stop={this.stop}/>
                <div className="editor">
                    <PreviewKeyBoard 
                    notes={this.state.notes}
                    noteToShedule={this.state.activatedNotes}
                    synthConfig={{synth, effects1}}
                    playNote={this.playPreviewsKeyboardNote}/>

                    <div className="rows pointer">
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
                </div>
                <Effects callBackEffects={this.handleEffects}/>
            </div>
        )
    }
}