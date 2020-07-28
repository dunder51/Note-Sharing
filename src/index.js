import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import NoteList from "./component/NoteList";
// import NoteForm from "./component/NoteForm";
import * as serviceWorker from './serviceWorker';

function App() {
    return (
        <div className="App">
            Test
            {/* <NoteForm /> */}
            {/* <NoteList /> */}
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
