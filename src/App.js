import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NoteForm from './component/NoteForm';
import NoteList from './component/NoteList';

function App() {
    return (
        <div className="App">
            <NoteForm />
            <NoteList />
        </div>
    );
}

ReactDOM.render(<App />,
    document.getElementById('root')
);

export default App;