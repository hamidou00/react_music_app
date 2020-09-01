import React from 'react'

export default function effects() {
    const dispatch = useDispatch();
    const gamme = useSelector(getGammeNotes)

    const handleEffects = (evt) => {
        dispatch([setVolume](evt.target.value))
        synth.set({[evt.target.name]: evt.target.value})
    }

    return (
        <div>
            <input onChange={changeVolume} type="range" name="setVolume" max="5" min="-50" step="1" />
        </div>
    )
}
