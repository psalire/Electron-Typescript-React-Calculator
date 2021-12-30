
import React from "react";
import ReactDOM from "react-dom";
import iListener from "../iListener";
import {
    Button,
} from "react-bootstrap";

type CalculatorButtonProps = {
    value?: number;
    content?: string;
    listener?: iListener;
}

export default class CalculatorButton extends React.Component<CalculatorButtonProps,{}> {

    public render(): JSX.Element {
        return (
            <Button
                value={this.props.value}
                onClick={() => {
                    if (this.props.listener) {
                        this.props.listener.update(this.props.value);
                    }
                }}
            >
                {this.props.content || this.props.value}
            </Button>
        );
    }
}
