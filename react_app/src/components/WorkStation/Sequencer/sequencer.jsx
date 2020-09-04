import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';


import initMatrix from './initMatrix';
import {
    metronomeNext,
    resetMetronome
} from '../../../redux/reducers/synthSlice';
import { 
    setSequences,
    setOneSequence,
    addSequence,
    getSequences,
    testAction,
    getTest,
} from '../../../redux/reducers/projectSlice';
import Row from './row';

const gamme2 = [
    "C5",
    "B4",
    "A#4",
    "A4",
    "G#4",
    "G4",
    "F#4",
    "F4",
    "E4",
    "D#4",
    "D4",
    "C#4",
    "C4"
  ]

export function Sequencer({effects, tone, synth, synthIndex, sequences, metronome}) {
    const dispatch = useDispatch();
    // initMatrix(gamme)
    var [lala, setLala] = useState(null)
    const [notesMatrix, setNotesMatrix] = useState([]);
    useEffect(() => {
        setNotesMatrix(initMatrix())
        console.log(initMatrix())
    }, [])
    //console.log(">>>>>",sequences)

    const addIt = ()=> {
        
    }

    const toggleBloc = (blocToToggle) => {
        const blocToToggleLol = notesMatrix.find(bloc => bloc.matrixIndex === blocToToggle.matrixIndex)
        const lol = notesMatrix.map((bloc) => {
            if (bloc.matrixIndex === blocToToggleLol.matrixIndex)
            {
                bloc.velocity = blocToToggleLol.velocity === 3 ? 0 : 3;
                // bloc.isActive = !blocToToggleLol.isActive
                return bloc;
            }
            else
                return bloc;
        })
        let sequence = notesMatrix.filter(bloc => bloc.velocity === 3).sort((a, b) => a.time - b.time)
        dispatch(setOneSequence({synthIndex, sequence}))
        // setNotesMatrix(lol)
        // var sequenceslol = [... sequences]
        // let sequence = notesMatrix.filter(bloc => bloc.velocity === 3).sort((a, b) => a.time - b.time)
        // sequenceslol[synthIndex] = sequence
        // console.log(sequenceslol)
        // dispatch(setSequences(sequenceslol))
        
        
        // const sequences1 = [... sequences]
        
        // sequences1.push(notesMatrix)
        // console.log(sequences1)

        // dispatch(addSequence(sequences1))
    }

    const playSequence = () => {
        if (lala != null) {
            tone.Transport.clear(lala._event._state._timeline[0].id)
            //lala.cancel("0")
        }
        
        dispatch(resetMetronome())
        const notesToTrigger = notesMatrix.filter(bloc => bloc.velocity === 3).sort((a, b) => a.time - b.time)
        console.log(notesToTrigger)
        // synth.triggerAttackRelease("C4", "8n")
        new tone.Part(triggerNote, notesToTrigger).start("+0.0");
        
        setLala(new tone.Loop((time) => {
            dispatch(metronomeNext())
        }, "8n").start("+0.0").stop("56"))
        
        // lala.loopEnd = "2";
        //console.log(lala.toSeconds("0:19"))
    }

    const triggerNote = (time, value) => {

        console.log(time)
        synth.triggerAttackRelease(value.note, "8n", time, value.velocity)
    }
    
    //console.log(notesMatrix);
    return (
        <div className="Sequencer1" >
            <div className="sequencer">
                <div className="rows pointer">
                    <button onClick={playSequence}>PLAY SEQUENCE</button>
                    {
                        gamme2.map((note, i) => {
                            let row = notesMatrix.filter(v => v.rowIndex === i);
                            return <Row key={i} row={row} metronome={metronome} toggleBloc={toggleBloc}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    // gamme : state.Synth.gamme,
    effects : state.Synth.effects,
    sequences : state.Project.sequences,
    metronome : state.Synth.metronome,
})
Sequencer = connect(mapStateToProps)(Sequencer)

export default Sequencer