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
            <div className="content">
                <div className="App-form">
                    <NoteForm />
                </div>
            </div>
            <div className="sidenav-heading">
                Note Selection
                <div className="sidenav">
                    <NoteList />
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
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

        //this.preview = React.createRef();
        this.preview = document.getElementById('preview');
        console.log(this.preview);

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
        this.getDocuments();
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
        //this.updateImageDisplay();
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

    updateImageDisplay() {
        while (this.preview.firstChild) {
            this.preview.removeChild(this.preview.firstChild);
        }

        const curFiles = this.notes;
        if (curFiles.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No files currently selected for upload';
            this.preview.appendChild(para);
        } else {
            const list = document.createElement('ol');
            this.preview.appendChild(list);

            for (const file of curFiles) {
                const listItem = document.createElement('li');
                const para = document.createElement('p');

                if (this.validFileType(file)) {
                    para.textContent = `File name ${file.name}, file size ${this.returnFileSize(file.size)}.`;
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(file);

                    listItem.appendChild(image);
                    listItem.appendChild(para);
                } else {
                    para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                    listItem.appendChild(para);
                }

                list.appendChild(listItem);
            }
        }
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

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], Link: '' };
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
            <ul>
                <script>this.getDocuments()</script>
                {/* {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))} */}
            </ul>
        );
    }
}

ReactDOM.render(
    <NoteForm />,
    document.getElementById('root')
);

ReactDOM.render(
    <NoteList />,
    document.getElementById('root')
)

export default App;
