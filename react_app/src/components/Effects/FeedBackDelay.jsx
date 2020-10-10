import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { setOneEffect, getFeedBackDelay } from '../../redux/reducers/synthSlice';

export default function FeedBackDelay({synthIndex, feedBackDelayProps}) {
    const dispatch = useDispatch();
    const defaultOptions = useSelector((state) => getFeedBackDelay(state, synthIndex))
    const [feedBackDelay, setFeed] = useState(defaultOptions);
    
    useEffect(()=> {
        let effectName = feedBackDelayProps.toString();
        dispatch(setOneEffect({synthIndex, feedBackDelay, effectName}))
        feedBackDelayProps.set(feedBackDelay)
    });

    const handleBitCrucher = (evt) => {
        let delayTime = evt.target.name == "delayTime" ? evt.target.value : feedBackDelay.delayTime
        let wet = evt.target.name == "wet" ? evt.target.value : feedBackDelay.wet
        let maxDelay = evt.target.name == "maxDelay" ? evt.target.value : feedBackDelay.maxDelay
        let feedback  = evt.target.name == "feedback" ? evt.target.value : feedBackDelay.feedback 
        setFeed( { delayTime, wet, maxDelay, feedback })
    }	
    return (
        <div className="effect">
            <div style={{border : "1px solid black"}} onChange={handleBitCrucher}> FeedBackDelay
                <p>wet : {feedBackDelay.wet} <input type="range" name="wet" max="1" min="0" step="0.1" defaultValue={feedBackDelay.wet} /></p>
                <p>delayTime : {feedBackDelay.depth} <input type="range" name="delayTime" max="1" min="0" step="0.1" defaultValue={feedBackDelay.delayTime} /></p>
                <p>max delay : {feedBackDelay.maxDelay} <input type="range" name="maxDelay" max="5" min="0" step="0.1" defaultValue={feedBackDelay.maxDelay} /></p>
                <p>feedback : {feedBackDelay.feedback} <input type="range" name="feedback" max="0.800" min="0" step="0.001" defaultValue={feedBackDelay.feedback} /></p>
            </div>
        </div>
    )
}
// const mapStateToProps = state => ({
//     wet : state.Synth.synths[synthIndex].effects.bitCrusher.wet
// })