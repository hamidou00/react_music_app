import React from "react";
//import ReactDOM from "react-dom";
import * as Tone from "tone";

export default class loop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
    this.handleClick = this.handleClick.bind(this);

    this.loopBeat = null;
    this.bassSynth = null;
  }

  handleClick() {
    this.loopBeat = new Tone.Loop(this.song, "2n");
    Tone.Transport.start(); // "the thing that drive my loop"
    this.loopBeat.start(0);
  }

 song(time){
    this.bassSynth = new Tone.MembraneSynth().toMaster();
    this.bassSynth.triggerAttackRelease("c1", "8n", time);
    console.log(time);
}

  render() {
    
    return (
      <div>
        <div className="block" onClick={this.handleClick}>
          start the LOOP
        </div>
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById("app"));