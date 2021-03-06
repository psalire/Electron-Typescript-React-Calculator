
import React from "react";
import ReactDOM from "react-dom";
import iCommand from "../iCommand";
import {
    Button,
} from "react-bootstrap";

export interface CalculatorButtonProps {
    variant?: string;
    value?: number|string;
    content?: string;
    commandObj?: iCommand;
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
                        if (this.props.commandObj) {
                            this.props.commandObj.execute(this.props.value);
                        }
                    }}
                >
                    {this.props.content || this.props.value}
                </Button>
            </div>
        );
    }
}
