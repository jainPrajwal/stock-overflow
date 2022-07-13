import React, { useState } from 'react';
import { Question } from './components/Question';
import logo from './logo.svg';

function App() {
    const [answer, setAnswer] = useState<string | null>(null);
    return (
        <>
            <div className="ck-content">
                <h2>Using Quill from online builder in React</h2>
                <Question />
            </div>
            <div></div>
        </>
    );
}

export default App;
