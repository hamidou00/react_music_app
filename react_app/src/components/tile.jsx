import React from 'react'

export default class tile extends React.Component {
    state = {
        note: this.props.note,
        meters : 0
    }

    render(){
        const note = this.state.note;
        let tileClasse = "";
        note.includes("#") ? tileClasse = "majorTile" : tileClasse = "tile"
        return (
            <>
                <div className={tileClasse} onClick={() => this.props.playNoteCallback(note)}>
                    <p>{note}</p>
                </div>
            
            </>
        )
    }
    
}
