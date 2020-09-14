import initMatrix from './initMatrix'

const sequenceToMatrix = (sequence) => {
    const initialMatrix = initMatrix()
    // return initialMatrix;
    console.log("SEQUENCE OF CONVERT", sequence)
    // if (sequence.length == 0) return initialMatrix;
    const matrix = initialMatrix.map((bloc, i) => {
        let blocToReplace = sequence.find(note => note.matrixIndex == i)

        return blocToReplace != undefined ? blocToReplace : bloc;
    })

    return matrix
}

export default sequenceToMatrix;