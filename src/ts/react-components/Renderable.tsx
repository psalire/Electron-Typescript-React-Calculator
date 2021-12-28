
import React from 'react';
import ReactDOM from 'react-dom';

export default abstract class Renderable {
    public static elem(): JSX.Element {
        throw "Not implemented";
    }
}
