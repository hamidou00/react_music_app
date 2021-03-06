import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { 
    setSequences,
    setOneSequence,
    addSequence,
    getSequences,
    testAction,
    getTest
} from '../../redux/reducers/projectSlice';
import { getBitCrusher, getVibrato } from '../../redux/reducers/synthSlice';
import SynthList from './SynthList';
import initMatrix from './Sequencer/functions/initMatrix';
import axios from 'axios';
import Button from '../Animation/SVGS/Button_Slide';

export function WorkStation({synths, tone, sequences, effectssss}) {
    const dispatch = useDispatch();
    const bitCrusher = useSelector((state) => getBitCrusher(state, 0));
    const vibrato = useSelector((state) => getVibrato(state, 0));
    useEffect(() => {
        // effectssss.bitCrusher.set(bitCrusher);
        // effectssss.vibrato.set(vibrato);
        // synths[0].toMaster();
        // tone.Transport.cancel();
        tone.Transport.start("+0.9");
    });
    
    useEffect(() => {
        const sequences = [];
        synths.forEach(synth => sequences.push([]));
        const getSequences = async() => {
            let sequencesLol = await axios.get('http://localhost:8888/sequence/getOne/5f5559df5246fe0bf40d9e74')
            console.log(sequencesLol.data)
            dispatch(setSequences(sequencesLol.data.sequence));
        }

        getSequences();
        
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

    const save = () => {
        axios.patch('http://localhost:8888/sequence/update/5f5559df5246fe0bf40d9e74', {sequence : sequences})
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
            <Button />
            <button onClick={PLAYALLLLLLLLLL}>The Super Mega Button To Run All Those LUl trop bien</button>
            <button onClick={save}>Enregister</button>
            <SynthList synths={synths} tone={tone} effects={effectssss}/>
        </div>
    )
}

const mapStateToProps = state => ({
    sequences : state.Project.sequences
})

WorkStation = connect(mapStateToProps)(WorkStation)

export default WorkStation