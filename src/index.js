import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import NoteForm from './component/NoteForm';
import NoteList from './component/NoteList';
import Login from './component/Login';
import Register from './component/Register';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <div className="sidenav-heading">Menu</div>
            <div className="sidenav">
                <ul className="no-bullets">
                    <li>
                        <Link to="/">Note List</Link>
                    </li>
                    <li>
                        <Link to="/Note">Add Note</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                    <li>
                        <Link to="/Register">Register</Link>
                    </li>
                </ul>
            </div>
            <Route exact path="/" component={App} />
            <Route path="/NoteList" component={NoteList} />
            <Route path="/Note" component={NoteForm} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
        </div>
    </Router>
)

ReactDOM.render(routing,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();