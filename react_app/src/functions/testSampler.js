import React from "react";
//import ReactDOM from "react-dom";
import { Sampler } from "tone";
import A1 from "../assets/media/Piano.wav";

export default class sampler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
    this.handleClick = this.handleClick.bind(this);
    
    this.sampler = new Sampler(
      { A1 },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toMaster();
  }

  handleClick() {
    this.sampler.triggerAttackRelease(["C2", "E2", "G2", "B2"], 3);
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div>
        <button className="block" disabled={!isLoaded} onClick={this.handleClick}>
          start
        </button>
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById("app"));