
import '../scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './react-components/Container';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

ReactDOM.render(
    <Container
        content="Hello content"
    />,
    document.getElementById('react-container')
);
