import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setSequences,
    setOneSequence,
    addSequence,
    getSequences,
    testAction,
    getTest
} from '../../redux/reducers/projectSlice';
import { getBitCrusher } from '../../redux/reducers/synthSlice';
import SynthList from './SynthList';
import initMatrix from './Sequencer/initMatrix';

export function WorkStation({synths, tone, sequences, effectssss}) {
    const dispatch = useDispatch();
    const bitCrusher = useSelector((state) => getBitCrusher(state, 0))
    console.log(bitCrusher)
    useEffect(() => {
        effectssss.bitCrusher.set(bitCrusher);
        // synths[0].toMaster();
        tone.Transport.cancel();
        tone.Transport.start("+0.9");
    });
    
    useEffect(() => {
        const sequences = [];
        synths.forEach(synth => sequences.push([]));
        dispatch(setSequences(sequences));
    }, [])

    const PLAYALLLLLLLLLL = () => {
        //let sequencessss = sequences.sort((a,b) => a.time = b.time);
        // let sequence = []
        // sequences.forEach(seq => {
        //     seq.forEach(note => sequence.push(note))
        // })

        // console.log(sequence)
        // const sequencessss = sequences
        // console.log(sequencessss)

        synths.forEach((synth, i) => {
            let parta = new tone.Part((time, value) => {triggerNote(time, value, synth)}, sequences[i]).start("+0.0");
            console.log(parta.get())
        })
        // const part = new tone.Part(triggerNote, sequence.sort((a,b) => a.time - b.time)).start("+0.0");
    }

    const triggerNote = (time, value, synth) => {
        synth.triggerAttackRelease(value.note, "12n", time, value.velocity)
    }



    return (
        <div className="WorkStation1">
            <div className="legende">
                <div>WorkStation</div>
                <div>SynthList</div>
                <div>Synthetiseur</div>
                <div>Effects</div>
                <div>Sequencer</div>
            </div>
            <h1>WorkStation (editeur en gros lul)</h1>
            <button onClick={PLAYALLLLLLLLLL}>The Super Mega Button To Run All Those LUl trop bien</button>
            <SynthList synths={synths} tone={tone}/>
        </div>
    )
}

const mapStateToProps = state => ({
    sequences : state.Project.sequences
})
WorkStation = connect(mapStateToProps)(WorkStation)

export default WorkStation

