const initMatrix = () => {
    const gamme2 = [
        "C5",
        "B4",
        "A#4",
        "A4",
        "G#4",
        "G4",
        "F#4",
        "F4",
        "E4",
        "D#4",
        "D4",
        "C#4",
        "C4"
      ]
    const notesMatrix = [];
    var count = 0;
    var countTime = 0;
    for (let i = 0; i < gamme2.length; i++){
        countTime = 0;
        for (let b = 0; b < 20; b++){
            notesMatrix.push({
                time: "0:" + countTime,
                note: gamme2[i],
                velocity: 0,
                matrixIndex: count,
                rowIndex: i,
                // isActive: false,
                inRowIndex : b
            });
            count++;
            countTime += 0.5;
        }
    }
    return notesMatrix
    // setNotesMatrix(notesMatrix)
    
}

export default initMatrix;