import { createSlice } from '@reduxjs/toolkit';

export const synthSlice = createSlice({
  name: 'Synth',
  initialState: {
    gamme : [// add gammes later, dont forget future hamidou plz
      {note: "C4", major:"C#4"},
      {note: "D4", major:"D#4"},
      {note: "E4"},
      {note: "F4", major:"F#4"},
      {note: "G4", major:"G#4"},
      {note: "A4", major:"A#4"},
      {note: "B4"},
      {note: "C5"},
    ],
    gamme2 : [
      ["C4","C#4"],
      ["D4","D#4"],
      ["E4"],
      ["F4","F#4"],
      ["G4","G#4"],
      ["A4","A#4"],
      ["B4"],
      ["C5"],
    ],
    sequence : require('./initialSequenceData.json'),
    synths : [

    ],
    effects : {
      vibrato : {},
      tremolo : {},
      feedbackDelay : {},
      distortion : {},
      bitCrusher : {},
      autoWah : {}
    },
    sample : [],
    metronome: -1,
    
  },
  reducers: { // Les differentes actions (c ici que je vais modif le volume effects, part, matrix et SURTOUR LE METRONOME MERDE trop bien)
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.poly += 1;
    },
    setVolume : (state, action) => {
      state.options.volume = action.payload
    },

    setOptions : (state, action) => {
      state.options = action.payload
    },

    setSynths : (state , action) => {
      state.synths = action.payload
    },

    setBitCrusher : (state , action) => {
      state.synths[action.payload.synthIndex].effects.bitCrusher = action.payload.bitCrusher
      //ici le payload est un objet qui contient : {wet, synthIndex}
      //synthIndex est l'index du synthetiseur ou se trouve le component effect qui exectute cette fonction (getBitCrusher)
      //wet est la donnée qui nous interesse à mettre dans le state
    },

    metronomeNext : state => {
      state.metronome += 1
    },

    resetMetronome : state => {
      state.metronome = -1
    }
  },
});

export const { 
  setOptions,
  setVolume,
  setSynths,
  setBitCrusher,
  metronomeNext,
  resetMetronome
} = synthSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    // dispatch(incrementByAmount(amount));
  }, 1000);
};

// export const setCount2 = () => dispatch => {
//     dispatch(setCount())
//   };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const getOptions = state => state.Synth.options;
export const getGammeNotes = state => state.Synth.gamme;
export const getBitCrusher = (state, synthIndex) => state.Synth.synths[synthIndex].effects.bitCrusher

export default synthSlice.reducer;
