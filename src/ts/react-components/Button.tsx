
import React from 'react';
import ReactDOM from 'react-dom';

type ButtonProps = {
    content?: string;
}

export default class Button extends React.Component<ButtonProps,{}> {

    public render(): JSX.Element {
        return (
            <div>{this.props.content}</div>
        );
    }
}
