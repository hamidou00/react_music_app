import initMatrix from './initMatrix'

const sequenceToMatrix = (sequence) => {
    const initialMatrix = initMatrix()
    const matrix = initialMatrix.map((bloc, i) => {
        let blocToReplace = sequence.find(note => note.matrixIndex == i)

        return blocToReplace != undefined ? blocToReplace : bloc;
    })

    return matrix
}

export default sequenceToMatrix;