import React from 'react';
// import ReactDOM from 'react-dom';
import firebase from 'firebase'
import './NoteList.css';

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
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
    }

    handleSubmit() {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(this.state.email).then(function () {
            alert("email sent to " + this.state.email);
        }).catch(function (error) {
            alert(error.message);
        });
    }
    
    render() {
        return (
            <div className="App">
                <div id="App-main" className="App-main">
                    <div className="App-form">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Email Address:
                                <br />
                                    <input type="text" placeholder="HPotterH@underthestairs.com" name='email' onChange={this.handleChange} />
                                </label>
                            </div>

                            <div>
                                <input type="submit" value="Send Password Reset" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteList;