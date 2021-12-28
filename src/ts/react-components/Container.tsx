
import React from 'react';
import ReactDOM from 'react-dom';
import Renderable from './Renderable';

interface ContainerProps {
    content?: string;
}

export default class Container implements Renderable {

    public static elem(props?: ContainerProps): JSX.Element {
        return (
            <div>{props.content}</div>
        );
    }
}
