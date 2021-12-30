
import React from "react";
import ReactDOM from "react-dom";
import CalculatorButton, { CalculatorButtonProps } from "./CalculatorButton";
import iListener from "../iListener";
import {
    Col,
    ColProps,
    Container,
    Row,
} from "react-bootstrap";

interface ColCalculatorButtonProps extends CalculatorButtonProps {
    colProps?: ColProps
};

class ColCalculatorButton extends CalculatorButton<ColCalculatorButtonProps> {
    public render(): JSX.Element {
        return (
            <Col
                className={"p-0 "+(this.props.className)}
                {...this.props.colProps}
            >
                {super.render()}
            </Col>
        );
    }
}

class ColVals {
    public value: number|string;
    public colProps?: ColProps;

    constructor(value: number|string, colProps?: ColProps) {
        this.value = value;
        this.colProps = colProps || {};
    }
}

export default class Calculator extends React.Component<{},{}> implements iListener {

    public update(val: number): void {
        console.log(`update(): ${val}`);
    }

    public render(): JSX.Element {
        return (
            <Container
                id="calculator"
                fluid
            >
                {
                    [
                        [new ColVals("AC", {xs:{span:9}}), new ColVals("/", {xs:{span:3}})],
                        [new ColVals(1), new ColVals(2), new ColVals(3), new ColVals("*")],
                        [new ColVals(4), new ColVals(5), new ColVals(6), new ColVals("-")],
                        [new ColVals(7), new ColVals(8), new ColVals(9), new ColVals("+")],
                        [new ColVals(0, {xs:{span:6}}), new ColVals(".", {xs:{span:3}}), new ColVals("=", {xs:{span:3}})],
                    ].map(row => (
                            <Row>
                                {
                                    row.map(col => {
                                        return (
                                            <ColCalculatorButton
                                                value={col.value}
                                                colProps={col.colProps}
                                                listener={this}
                                            />
                                        );
                                    })
                                }
                            </Row>
                        )
                    )
                }
            </Container>
        );
    }
}
