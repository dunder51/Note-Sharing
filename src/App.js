import React from 'react';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NoteForm />
            </header>
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
            file: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ 
            topic: event.target.topic,
            description: event.target.description,
            college: event.target.colege,
            course: event.target.course,
            file: event.target.file
        });
    }

    handleSubmit(event) {
        alert('A form was submitted: ' + this.state.topic);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Note:
                    <input type="file" />
                </label>

                <label>
                    Topic:
                    <input type="text" value={this.state.topic} onChange={this.handleChange} />
                </label>

                <label>
                    Description:
                    <input type="text" value={this.state.description} onChange={this.handleChange} />
                </label>

                <label>
                    College Name:
                    <input type="text" value={this.state.college} onChange={this.handleChange} />
                </label>

                <label>
                    Course Name:
                    <input type="text" value={this.state.course} onChange={this.handleChange} />
                </label>
        
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
