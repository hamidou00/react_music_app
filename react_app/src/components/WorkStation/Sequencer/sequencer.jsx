import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';

import {} from '../../../redux/reducers/synthSlice';
import initMatrix from './initMatrix'
import { setSequences, setOneSequence, addSequence, getSequences, testAction, getTest } from '../../../redux/reducers/projectSlice';
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

export function Sequencer({effects, tone, synth, synthIndex, sequences}) {
    const dispatch = useDispatch();
    // initMatrix(gamme)
    const [notesMatrix, setNotesMatrix] = useState([]);
    useEffect(() => {
        setNotesMatrix(initMatrix())
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
        const notesToTrigger = notesMatrix.filter(bloc => bloc.velocity === 3).sort((a, b) => a.time - b.time)
        console.log(notesToTrigger)
        // synth.triggerAttackRelease("C4", "8n")
        const part = new tone.Part(triggerNote, notesToTrigger).start("+0.0");
    }

    const triggerNote = (time, value) => {
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
                            return <Row key={i} row={row} toggleBloc={toggleBloc}/>
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
    sequences : state.Project.sequences
})
Sequencer = connect(mapStateToProps)(Sequencer)

export default Sequencer