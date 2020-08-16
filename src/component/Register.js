import React from 'react';
// import ReactDOM from 'react-dom';
import './Register.css';
import firebase from 'firebase'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            college: '',
            password:''
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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: this.state.name
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">Register</header>
                <div className="content">
                    <div className="App-form">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    Full Name:
                                <br />
                                    <input type="text" placeholder="Harry Potter" name='name' onChange={this.handleChange} />
                                </label>
                            </div>

                            <div>
                                <label>
                                    Email Address:
                                <br />
                                    <input type="text" placeholder="PotterH@underthestairs.com" name='email' onChange={this.handleChange} />
                                </label>
                            </div>

                            <div>
                                <label>
                                    College Name:
                                <br />
                                    <input type="text" placeholder="Hogwarts" name='college' onChange={this.handleChange} />
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;