import React, {useState, useEffect} from 'react';
import BitCrusher from '../../Effects/BitCrucher';

export default function Effects({synth, synthIndex}) {
    // const dispatch = useDispatch();
    // const gamme = useSelector(getGammeNotes)
    const [volume, setVolume] = useState(-20);
    const [effects, setEffects] = useState({
        volume : -20,
    });

    const handleEffects = (evt) => {
        setEffects({ [evt.target.name] : evt.target.value})
    }
    return (
        <div className="Effects1">
            <BitCrusher synth={synth} synthIndex={synthIndex}/>
        </div>
    )
}
