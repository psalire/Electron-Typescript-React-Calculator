
import React from "react";
import ReactDOM from "react-dom";
import CalculatorButton, { CalculatorButtonProps } from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import iListener from "../iListener";
import {
    Col,
    ColProps,
    Container,
    Row,
} from "react-bootstrap";

enum CalculatorButtonValues {
    ZERO="0",
    ONE="1",
    TWO="2",
    THREE="3",
    FOUR="4",
    FIVE="5",
    SIX="6",
    SEVEN="7",
    EIGHT="8",
    NINE="9",
    DIVIDE="/",
    MULTIPLY="*",
    SUBTRACT="-",
    ADD="+",
    EQUALS="=",
    AC="AC",
    DOT=".",
}

class ColVals {
    public value: number|string;
    public colProps?: ColProps;

    constructor(value: number|string, colProps?: ColProps) {
        this.value = value;
        this.colProps = colProps || {};
    }
}

type CalculatorState = {
    displayText: string,
}

export default class Calculator extends React.Component<{}, CalculatorState> implements iListener {

    state = {
        displayText: "",
    };

    public update(val: CalculatorButtonValues): void {
        console.log(`update(): ${val}`);
        this.setState(state => {
            switch(val) {
                case CalculatorButtonValues.AC:
                    return { displayText: "" }
                default:
                    return { displayText: state.displayText + val }
            }
        })
    }

    public render(): JSX.Element {
        return (
            <Container
                id="calculator"
                fluid
            >
                <Row>
                    <Col>
                        <CalculatorDisplay text={this.state.displayText} />
                    </Col>
                </Row>
                {
                    [
                        [
                            new ColVals(CalculatorButtonValues.AC, {xs:{span:9}}),
                            new ColVals(CalculatorButtonValues.DIVIDE, {xs:{span:3}}),
                        ],
                        [
                            new ColVals(CalculatorButtonValues.ONE),
                            new ColVals(CalculatorButtonValues.TWO),
                            new ColVals(CalculatorButtonValues.THREE),
                            new ColVals(CalculatorButtonValues.MULTIPLY),
                        ],
                        [
                            new ColVals(CalculatorButtonValues.FOUR),
                            new ColVals(CalculatorButtonValues.FIVE),
                            new ColVals(CalculatorButtonValues.SIX),
                            new ColVals(CalculatorButtonValues.SUBTRACT)
                        ],
                        [
                            new ColVals(CalculatorButtonValues.SEVEN),
                            new ColVals(CalculatorButtonValues.EIGHT),
                            new ColVals(CalculatorButtonValues.NINE),
                            new ColVals(CalculatorButtonValues.ADD),
                        ],
                        [
                            new ColVals(CalculatorButtonValues.ZERO, {xs:{span:6}}),
                            new ColVals(CalculatorButtonValues.DOT, {xs:{span:3}}),
                            new ColVals(CalculatorButtonValues.EQUALS, {xs:{span:3}}),
                        ],
                    ].map((row, i) => (
                            <Row key={i}>
                                {
                                    row.map((col, j) => {
                                        return (
                                            <Col
                                                key={`${j}_${col.value}`}
                                                className="p-0"
                                                {...col.colProps}
                                            >
                                                <CalculatorButton
                                                    value={col.value}
                                                    listener={this}
                                                />
                                            </Col>
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
