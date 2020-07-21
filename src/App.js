import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
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
            file: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const target = event.target;

        let name = target.name;
        let value = target.value;

        this.setState({ 
            [name]: value
        });
        //console.log(this.state);
    }

    handleSubmit(event) {
        alert('A form was submitted: ' + this.state.topic);
        this.addData();
        event.preventDefault();
    }

    addData() {
        db.collection("cities").doc("LA").set({
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        })
            .then(function () {
                console.log("Document successfully written!");
                alert("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                alert("Error writing document: ", error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Note:
                    <input type="file"
                        id="note" name="note"
                        accept="image/png, image/jpeg, image/pdf"/>
                </label>
                <br />
                <label>
                    Topic:
                    <br />
                    <input type="text" name='topic' onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Description:
                    <br />
                    <input type="text" name='description' onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    College Name:
                    <br />
                    <input type="text" name='college' onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Course Name:
                    <br />
                    <input type="text" name='course' onChange={this.handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <NoteForm />,
    document.getElementById('root')
);

export default App;
