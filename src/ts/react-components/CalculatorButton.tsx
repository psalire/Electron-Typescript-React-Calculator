
import React from "react";
import ReactDOM from "react-dom";
import iListener from "../iListener";
import {
    Button,
} from "react-bootstrap";

export interface CalculatorButtonProps {
    variant?: string;
    value?: number|string;
    content?: string;
    listener?: iListener;
    className?: string;
}

export default class CalculatorButton<T extends CalculatorButtonProps> extends React.Component<T,{}> {

    public render(): JSX.Element {
        return (
            <div className="m-1">
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
            </div>
        );
    }
}
