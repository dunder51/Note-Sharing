import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NoteList from './component/NoteList';

function App() {
    return (
        <div className="App">
            <NoteList />
        </div>
    );
}

ReactDOM.render(<App />,
    document.getElementById('root')
);

export default App;