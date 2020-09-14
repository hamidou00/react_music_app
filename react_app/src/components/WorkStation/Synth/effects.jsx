import React, {useState, useEffect} from 'react';
import BitCrusher from '../../Effects/BitCrucher';
import Vibrato from '../../Effects/Vibrato';
import FeedBackDelay from '../../Effects/FeedBackDelay';

export default function Effects({synth, synthIndex, effects}) {
    // const dispatch = useDispatch();
    // const gamme = useSelector(getGammeNotes)

    // const [volume, setVolume] = useState(-20);
    // const [effects, setEffects] = useState({
    //     volume : -20,
    // });
    
    // const handleEffects = (evt) => {
        //setEffects({ [evt.target.name] : evt.target.value})
    // }
    return (
        <div className="Effects1">
            <BitCrusher synth={synth} synthIndex={synthIndex} bitCrusherProps={effects.bitCrusher}/>
            <Vibrato synth={synth} synthIndex={synthIndex} vibratoProps={effects.vibrato}/>
            <FeedBackDelay synth={synth} synthIndex={synthIndex} feedBackDelayProps={effects.feedBackDelay}/>
        </div>
    )
}
