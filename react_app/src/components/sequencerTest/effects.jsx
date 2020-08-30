import React, { Component } from 'react'

export default class effects extends Component {
    state = {
        volume : 0,
        distortion : 0,
        vibrato : 0,
        reverb : 0,
        feedBackDelay : {
            delayTime: 0,
            feedback: 0,
            maxDelay: 0,
            wet: 0
        },
    }
    handleEffects = (evt) => {
        //console.log(evt.target.name)
        this.setState({[evt.target.name] : evt.target.value}, () => {
            this.props.callBackEffects(this.state);
        })
    }

    render() {
        return (
            <div className="effects">
                <p>Jouons avec les effets du synthétiseur youhou</p>
                <label>Volume : {this.state.volume}</label>
                <input type="range" name="volume" max="20" min="-50" step="0.5" value={this.state.volume} onChange={this.handleEffects} list="tickmarks"/>
                <label>Distortion : {this.state.distortion}</label>
                <input type="range" name="distortion" max="1" step="0.1" value={this.state.distortion} onChange={this.handleEffects}/>
                <label>Vibrrrrrato : {this.state.vibrato}</label>
                <input type="range" name="vibrato" max="50" min="0" step="1" value={this.state.vibrato} onChange={this.handleEffects}/>
                <label>Reverb : {this.state.reverb}</label>
                <input type="range" name="reverb" max={20} step={1} value={this.state.reverb} onChange={this.handleEffects}/>
                
                {/* <label>Feedback Delay</label>
                <div className="delay">
                delayTime <input type="range" name="feedBackDelay" value={this.state.feedBackDelay} onChange={this.handleEffects}/>
                feedback <input type="range" name="feedBackDelay" value={this.state.feedBackDelay} onChange={this.handleEffects}/>
                maxDelay <input type="range" name="feedBackDelay" value={this.state.feedBackDelay} onChange={this.handleEffects}/>
                wet <input type="range" name="feedBackDelay" value={this.state.feedBackDelay} onChange={this.handleEffects}/>
                </div> */}
            </div>
        )
    }
}
