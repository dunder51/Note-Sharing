import React from 'react';
// import ReactDOM from 'react-dom';
import './Login.css';
import firebase from 'firebase'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Reset from './Reset';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.uid = null;

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

    handleSubmit(event) {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function () {
            alert("Success!");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">Log-In<a href="/Register">Register</a></header>
                <div className="content">
                    <div className="App-form">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Email:
                                <br />
                                    <input type="text" placeholder="PotterH@underthestairs.com" name='email' onChange={this.handleChange} />
                                </label>
                            </div>

                            <div>
                                <label>
                                    Password:
                                <br />
                                    <input type="password" placeholder="" name='password' onChange={this.handleChange} />
                                </label>
                            </div>

                            <div>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                        <Router><Link to="/Reset">Reset Password</Link><Route path="/Reset" component={Reset} /></Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;