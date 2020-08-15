import React from "react";
import * as Arpeggio from "../functions/povideSound";


class Sound extends React.Component{

    arpeggio_random(){
        Arpeggio.random();
    }

    arpeggio_upDown(){
        Arpeggio.upDown();
    }

    oscillator(){
        Arpeggio.oscillator();
    }

    sequencer(){
        Arpeggio.sequencer();
    }

    render(){
        return <>
        <div className="block" onClick={this.arpeggio_random}>Arpeggio Random</div>
        <div className="block" onClick={this.arpeggio_upDown}>Arpeggio upDown</div>
        <div className="block" onClick={this.oscillator}>Oscillator</div>
        {/* <div className="block" onClick={this.sequencer}>loop</div> */}
        </>
    }
}

export default Sound;