import React from 'react';
// import ReactDOM from 'react-dom';
// import firebase from 'firebase'
import './NoteList.css';
import { db } from '../init-firebase.js'

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], Link: '' };
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.getDocuments();
    }

    getDocuments() {
        console.log("getDocuments");
        const getNotes = async () => {
            const notesRef = db.collection('Notes');
            const snapshot = await notesRef.get();
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
            console.log("done getNotes");
        }
        getNotes();
        console.log("done getDocuments");
    }
    
    render() {
        return (
            <div className="sidenav-heading">
                Note Selection
                <div id="sidenav" className="sidenav">
                    <ul className="noteList">
                        <NoteList />
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                        <a href="#">Link</a>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NoteList;