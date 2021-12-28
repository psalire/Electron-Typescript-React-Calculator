
import React from 'react';
import ReactDOM from 'react-dom';

interface ContainerProps {
    content?: string;
}

export default class Container extends React.Component<ContainerProps,{}> {

    public render(): JSX.Element {
        return (
            <div>{this.props.content}</div>
        );
    }
}
