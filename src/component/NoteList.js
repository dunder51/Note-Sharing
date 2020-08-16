import React from 'react';
// import ReactDOM from 'react-dom';
// import firebase from 'firebase'
import './NoteList.css';
import { db } from '../init-firebase.js'

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [] };
    }

    componentDidMount() {
        this.getDocuments();
    }

    getDocuments() {
        console.log("getDocuments");
        // const getNotes = async () => {
        //     const notesRef = db.collection('Notes');
        //     const snapshot = await notesRef.get();
        //     snapshot.forEach(doc => {
        //         console.log(doc.id, '=>', doc.data());
        //     });
        //     console.log("done getNotes");
        // }
        // getNotes();

        db.collection("Notes")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ notes: data });
            });

        console.log("done getDocuments");
    }
    
    render() {
        const { notes } = this.state;
        console.log(notes);
        return (
            <div className="App">
                <div className="App-header">
                    <button className="button" onClick={this.getDocuments()}>Notes</button>
                </div>
                <div id="App-main" className="App-main">
                    <div className="noteList">
                        {notes.map(note => (
                            <div key={note.uid} className="col-lg-6 col-md-6 col-s-12 mb-4">
                                <a target="_blank" rel="noopener noreferrer" href={note.notes}>{note.topic}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteList;