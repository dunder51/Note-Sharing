import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import firebase from 'firebase'
import { db } from './init-firebase.js'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Upload a Note
            </header>
            <div className="App-main">
                <div className="App-form">
                    <NoteForm />
                </div>
            </div>
        </div>
    );
}

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: '',
            description: '',
            college: '',
            course: '',
            notes: ''
        };

        this.notes = null;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadNote = this.uploadNote.bind(this);

        this.preview = React.createRef();

        this.fileTypes = [
            'image/apng',
            'image/bmp',
            'image/gif',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/svg+xml',
            'image/tiff',
            'image/webp',
            `image/x-icon`
        ];
    }

    handleChange(event) {
        const target = event.target;

        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
        console.log(this.notes);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.topic !== '') {
            this.addData();
            alert('A form was submitted: ' + this.state.topic);

            for (const file of this.notes) {
                if (file != null) {
                    this.addFile(file);
                    alert('A note was submitted:' + file.name);
                }
                else {
                    alert('No Note');
                }
            }
        }
        else {
            alert('No Topic');
        }
    }

    uploadNote(event) {
        const files = event.target.files;
        console.log('File:', files);
        this.notes = files;
    }

    addData() {
        db.collection("Notes").doc(this.state.topic).set(
            this.state
        )
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                alert("Error writing document: ", error);
            });
    }

    addFile(file) {
        // Create a root reference
        var storageRef = firebase.storage().ref();

        // Create a reference to file
        var uploadTask = storageRef.child('notes/' + file.name).put(file);
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log(downloadURL);
        });
    }


    validFileType(file) {
        return this.fileTypes.includes(file.type);
    }

    returnFileSize(number) {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number > 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number > 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="note">Upload note (png, jpeg, pdf)</label>
                    <input type="file"
                        id="note" name="note"
                        accept=".jpg, .jpeg, .png, .pdf" multiple onChange={this.uploadNote} />
                </div>
                <div ref={this.preview}>
                    <p>No files currently selected for upload</p>
                </div>
                <div>
                    <label>
                        Topic:
                    <br />
                        <input type="text" name='topic' onChange={this.handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                    <br />
                        <input type="text" name='description' onChange={this.handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        College Name:
                    <br />
                        <input type="text" name='college' onChange={this.handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Course Name:
                    <br />
                        <input type="text" name='course' onChange={this.handleChange} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

ReactDOM.render(
    <NoteForm />,
    document.getElementById('root')
);

export default App;
