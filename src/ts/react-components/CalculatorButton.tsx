
import React from "react";
import ReactDOM from "react-dom";
import iListener from "../iListener";
import {
    Button,
} from "react-bootstrap";

type CalculatorButtonProps = {
    variant?: string;
    value?: number;
    content?: string;
    listener?: iListener;
}

export default class CalculatorButton extends React.Component<CalculatorButtonProps,{}> {

    public render(): JSX.Element {
        return (
            <Button
                variant={this.props.variant}
                className="calculator-button"
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
