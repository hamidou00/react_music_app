import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';


import initMatrix from './functions/initMatrix';
import sequenceToMatrix from './functions/sequenceToMatrix';
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

export function Sequencer({effects, tone, synth, synthIndex, sequences, sequence, metronome}) {
    const dispatch = useDispatch();
    var [loop, setLoop] = useState(null)
    const [notesMatrix, setNotesMatrix] = useState([]);
    useEffect(() => {
        setNotesMatrix(initMatrix())
        
        //console.log("SEQUENCE TO MATRIX", sequenceToMatrix(sequences[0]))
    }, [])

    useEffect(() => {
        if (sequences.length != 0) // selement si sequences reçois les donnée depuis la bdd (async await)
        {
            setNotesMatrix(sequenceToMatrix(sequences[synthIndex])) // introduit les notes de la sequence dans une matrice
        }
        
    }, [sequences]) // update seuelement si sequences change d'etat

    const toggleBloc = (blocToToggle) => {
        //const matrixCopy = [...notesMatrix]
        //const blocToToggleLol = matrixCopy.find(bloc => bloc.matrixIndex === blocToToggle.matrixIndex)
        //blocToToggle.velocity = blocToToggleLol.velocity === 3 ? 0 : 3;
        // setNotesMatrix(matrixCopy);
        
        if (loop != null) {
            loop.stop();
            if (loop._event._state._timeline[0] != undefined)
            tone.Transport.clear( loop._event._state._timeline[0].id)
            loop.cancel("0")
        }
        console.log(notesMatrix)
        

        const lol = notesMatrix.map((bloc) => {
            if (bloc.matrixIndex === blocToToggle.matrixIndex)
            {
                //bloc.velocity = blocToToggle.velocity === 3 ? 0 : 3;
                // bloc.isActive = !blocToToggleLol.isActive
                return {
                    velocity : blocToToggle.velocity === 3 ? 0 : 3,
                    note : blocToToggle.note,
                    matrixIndex : blocToToggle.matrixIndex,
                    rowIndex : blocToToggle.rowIndex,
                    inRowIndex : blocToToggle.inRowIndex,
                    time : blocToToggle.time
                }
            }
            else
                return bloc;
        })
        setNotesMatrix(lol)
        console.log(lol)
        let sequence = lol.filter(bloc => bloc.velocity === 3).sort((a, b) => a.time - b.time)
        dispatch(setOneSequence({synthIndex, sequence})) // pour le sequencer globale : j'ajoute la sequence de ce synth qui va être mis dans le part
        
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
        // tone.Transport.stop();
        if (loop != null) {
            // loop.stop();
            //tone.Transport.clear(loop._event._state._timeline[0].id)
            loop.cancel("0")

            loop.set({
                callback : loopCallback,
                interval : "8n"
            })

            loop.start();

        } else {
            
            
            // console.log(notesToTrigger)
            // synth.triggerAttackRelease("C4", "8n")
            
            
            setLoop(new tone.Loop(loopCallback, "8n").start("+0.0").stop("56"))
        }
        dispatch(resetMetronome())
        const notesToTrigger = notesMatrix.filter(bloc => bloc.velocity === 3).sort((a, b) => a.time - b.time)
        new tone.Part(triggerNote, notesToTrigger).start("+0.0");
        
        
        
        // loop.loopEnd = "2";
        //console.log(loop.toSeconds("0:19"))
    }

    const loopCallback = (time) => dispatch(metronomeNext())

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
                            return <Row key={i} row={row} metronome={metronome} toggleBloc={toggleBloc}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

// ces données proviennent du store (redux) 
//elles sont ensuite envoyées en tant que props à la fonction
const mapStateToProps = state => ({
    // gamme : state.Synth.gamme,
    effects : state.Synth.effects,
    sequences : state.Project.sequences,
    metronome : state.Synth.metronome,
    sequence : state.Synth.sequence
})
Sequencer = connect(mapStateToProps)(Sequencer)

export default Sequencer