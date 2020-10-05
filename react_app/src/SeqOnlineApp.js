import React from 'react';
//import ReactDOM from 'react-dom';
import './styles/index.css';
import Header from "./components/nav/header";
import Home from "./views/Home";
import About from "./components/about";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Workstation from './components/WorkStation/WorkStation';
import AnimationTest from './components/Animation/Test';

import {useDispatch, useSelector} from 'react-redux';
import {getEffects, setOptions, setSynths} from './redux/reducers/synthSlice';

// A FAIRE : automatiser le chain ligne 44. (le rendre dynamique)
// Faire en sorte que chaque synth ai ses propres effets
// chercher comment rendre mon app plus performante
// Metronome OK
// stop et reset et restart le Transport
// Tone Library
import * as Tone from 'tone';
// Tone.setContext(new Tone.Context({ latencyHint : "playback" }))

export default function SeqOnlineApp() { //Layout
    const dispatch = useDispatch();
    // vibrato : {},
    //   tremolo : {},
    //   feedbackDelay : {},
    //   distortion : {},
    //   bitCrusher : {},
    //   autoWah : {}

    // Synths
    const Memb = new Tone.PolySynth();
    const Memb2 = new Tone.PolySynth();
    const Memb3 = new Tone.PolySynth();
    const Memb4 = new Tone.PolySynth();

    // Effects
    // const vibrato = new Tone.Vibrato();
    // const tremolo = new Tone.Tremolo();
    // const feedbackDelay = new Tone.FeedbackDelay();
    // const distortion = new Tone.Distortion();
    // const bitCrusher = new Tone.BitCrusher();
    // const autoWah = new Tone.AutoWah();
    // console.log(bitCrusher.get())

    Memb.chain(
        Memb2,
        Memb3,
        Memb4,
        Tone.Master
    )
    // const MembraneSynth = new Tone.PolySynth(1, Tone.MembraneSynth).toMaster();
    // MembraneSynth.set(useSelector(getEffects))
    // console.log(MembraneSynth.get())
    const effectssss = [];
    const synths = [Memb, Memb2, Memb3, Memb4];
    const synthsList = [];


    synths.forEach((synth, i) => {

        const vibrato = new Tone.Vibrato();
        const tremolo = new Tone.Tremolo();
        const feedBackDelay = new Tone.FeedbackDelay();
        const distortion = new Tone.Distortion();
        const bitCrusher = new Tone.BitCrusher();
        const autoWah = new Tone.AutoWah();


        const effects = {
            vibrato: vibrato.get(),
            tremolo: tremolo.get(),
            feedBackDelay: feedBackDelay.get(),
            distortion: distortion.get(),
            bitCrusher: bitCrusher.get(),
            autoWah: autoWah.get()
        }

        effectssss.push({ vibrato, tremolo, feedBackDelay, distortion, bitCrusher, autoWah })

        synthsList.push({
            id : i,
            effects : effects
        });
        synth.chain(
            vibrato,
            // tremolo,
            feedBackDelay,
            // distortion,
            // bitCrusher,
            // autoWah,
            Tone.Master
        )
    })

    dispatch(setSynths(synthsList));

    
    return (
    <Router>

        <Header title="SeqOnline" nav={true}/>

        <main className="mainP">
            <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                <Route exact path="/" component={Home}/>
                <Route path="/WorkStation"> <Workstation synths={synths} tone={Tone} effectssss={effectssss}/> </Route>
                <Route path="/about" component={About} />
                <Route path="/animationTest" component={AnimationTest} />
                <Route path="*" component={NotFound} />
            </Switch>
        </main>

        <footer>
            
        </footer>
    </Router>
    )
}



// const synths = [
//     {
//         effects : effectssss,
//         synth : Memb
//     }, 
//     {
//         effects : effectssss,
//         synth : Memb2
//     }, 
//     {
//         effects : effectssss,
//         synth : Memb3
//     }, 
//     {
//         effects : effectssss,
//         synth : Memb4
//     }
// ];