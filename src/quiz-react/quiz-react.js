import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Quiz = ({ type, question, answer }) => {

    useEffect(() => {
        document.title = 'My Page Title';
    }, []);

    return (
        <div>
            {type}
            {question}
            {answer}
            <h2>This is a React Component</h2>
            <p>Hello from React!</p>
        </div>
    );
};

ReactDOM.render(<Quiz type="mulitple-choice" question="lorem ipsum" answer="yikes" />, document.getElementById('react-root'));
