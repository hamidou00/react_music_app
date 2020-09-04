import { createSlice } from '@reduxjs/toolkit';

// const notesMatrix = [];
// var count = 0;
// var countTime = 0;
// for (let i = 0; i < gamme2.length; i++){
//     countTime = 0;
//     for (let b = 0; b < 20; b++){
//         notesMatrix.push({
//             time: "0:" + countTime,
//             note: gamme2[i],
//             velocity: 0,
//             matrixIndex: count,
//             rowIndex: i,
//             // isActive: false,
//             inRowIndex : b
//         });
//         count++;
//         countTime += 0.5;
//     }
// }

// setNotesMatrix(notesMatrix)
export const projectSlice = createSlice({
  name: 'Synth',
  initialState: {
    sequences : [],
    test : 0
  },
  reducers: {
    setSequences : (state, action) => {
      state.sequences = action.payload
    },

    addSequence : (state, action) => {
      state.sequences = action.payload
    },

    setOneSequence : (state, action) => {
      state.sequences[action.payload.synthIndex] = action.payload.sequence
    },

    testAction : (state, action) => {
      let lol = action.payload
      state.test = lol
  }
  },
});

export const {setSequences, setOneSequence, addSequence, testAction} = projectSlice.actions;

export const getSequences = state => state.Project.sequences;
export const getTest = state => state.Project.test;

export default projectSlice.reducer;
