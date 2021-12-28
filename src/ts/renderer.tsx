
import '../scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

function Main() {

    return (
        <span>
            Hello world!
        </span>
    );
}

ReactDOM.render(
    <Main />,
    document.getElementById('react-container')
);
