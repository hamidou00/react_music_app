import React, { Component } from 'react'
import * as Tone from 'tone';
import effects from './effects';

const synth = new Tone.PolySynth().toMaster();
export default class previewKeyBoard extends Component {

    state = {
        notes : this.props.notes,
        notesToActivate : this.props.noteToShedule,
        synthConfig : this.props.synthConfig,
        //vibrato : this.props.synthConfig.vibrato
    }

    componentDidMount(){
        //if (this.props.noteToShedule != null) this.sheduleNotesToActivate(this.props.noteToShedule);
        //this.setState({synthConfig : })
        //this.setState({vibrato : this.props.synthConfig.vibrato});
        this.setState({notesToActivate : this.props.noteToShedule})
    }

    componentWillReceiveProps(){
        // console.log("HAHAHAHAHAHAHAHAHAHAHHAHAHAHAHAHAH")
        // console.log(this.props.noteToShedule)
        //if (this.props.noteToShedule != null) this.sheduleNotesToActivate(this.props.noteToShedule);
        this.setState({notesToActivate : this.props.noteToShedule})
    }
    
    playNote(note){
        //const synth = this.state.synthConfig.synth;
        const {synth, effects1} = this.state.synthConfig;
        console.log("state SYNTHCONFIG ", this.state.synthConfig);
        // console.log(synth);
        // console.log(effects1);
        //this.props.playNote(note);
        synth.triggerAttackRelease(note, "8n");
        synth.chain(effects1.vibrato, effects1.volume, Tone.Master);
        Tone.Transport.start();
        // Tone.Transport.start();
    }
    // sheduleNotesToActivate = (noteToShedule) => {
            
    //     var count = 0;
    //     const lala = setInterval(() => {
    //         const notesToActivate = noteToShedule.map(note => {
    //             note.isActive = !note.isActive
    //             return note;
    //         })
    //         this.setState({notesToActivate : notesToActivate }) 
    //         //redefinis le state en ne donnant que les les notes qui doivent être activé à un moment précis, grace au count
    //         clearInterval(lala);
    //         count++;
    //     }, 250, count);
        
    // }
    render() {
        //console.log("PREVIEW THAT LUL : ",this.state.notesToActivate)
        //console.log("notes To activate : ",this.state.notesToActivate)
        return (
            <div className="previewNotes">
                {
                    this.props.notes.map((note, i) => (
                    // <div key={i} className="keynotes pointer"> <small>{note} {note == this.state.notesToActivate.find(bloc => bloc.note == note) ? "haha" : "hoho"}</small></div>
                    <div onClick={() => this.playNote(note)} key={i} className="keynotes pointer"><small>{note}</small></div>
                    ))
                }
            </div>
        )
    }
}