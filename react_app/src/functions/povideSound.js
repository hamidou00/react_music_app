import * as Tone from "tone";

function simpleNote(note){
    note = 'C4';
    var synth = new Tone.Synth().toMaster()

    synth.triggerAttackRelease(note, '8n')
}

function random(){
    const synth = new Tone.Synth().toMaster();
    var pattern = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.25);
    }, ["C4", "D4", "E4", "G4", "A4"], "random");
    pattern.start(0);
    Tone.Transport.start();
}

function upDown(){
    Tone.Transport.stop().start();
    const synth = new Tone.Synth().toMaster();
    var pattern = new Tone.Pattern(function(time, note){
        synth.triggerAttackRelease(note, 0.25);
    }, ["C4", "D4", "E4", "G4", "A4"], "upDown");
    pattern.start(0);
    Tone.Transport.start();
}

function oscillator(){
    var osc = new Tone.OmniOscillator();
    osc.frequency.value = "C4";
    osc.start().stop("+8n");
    var env = new Tone.AmplitudeEnvelope();
    osc.connect(env);
    env.toMaster();
    osc.start();
    env.triggerAttack();
}

// ###############################################

function sequencer(){
    let loopBeat = new Tone.Loop(song, "4n"); //premier argument un callback -- et deuxieme argument égale famerate of song (BPM ?)
    Tone.Transport.start(); // "the thing that drive my loop"
    loopBeat.start(0);
}

function song(time){
    let bassSynth = Tone.MembraneSynth().toMaster();
    bassSynth.triggerAttackRelease("c1", "8n", time);
    console.log(time);
}

export {random, upDown, oscillator, sequencer, simpleNote};