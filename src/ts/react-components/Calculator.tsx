
import React from "react";
import ReactDOM from "react-dom";
import CalculatorButton, { CalculatorButtonProps } from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import iCommand from "../iCommand";
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

class ColVals implements iCommand {
    public value: number|string;
    public colProps?: ColProps;
    public ftn?: Function;

    public execute(val?: any): void {
        this.ftn && this.ftn(val);
    }

    constructor(value: number|string, colProps?: ColProps, ftn?: Function) {
        this.value = value;
        this.colProps = colProps || {};
        this.ftn = ftn;
    }
}

type CalculatorState = {
    displayText: string,
    isOperationActive: boolean,
    previousVal?: string,
}

export default class Calculator extends React.Component<{}, CalculatorState> {

    private static readonly MAX_DISPLAY_LENGTH = 28;

    state: CalculatorState = {
        displayText: "",
        previousVal: "",
        isOperationActive: false,
    };

    componentDidMount() {
        window.addEventListener("keydown", (e) => {
            if (Object.values(CalculatorButtonValues).includes(e.key as CalculatorButtonValues)) {
                this.update(e.key as CalculatorButtonValues);
            }
        });
    }

    private createNumberButtonColVals(value: number|string, colProps?: ColProps) {
        return new class extends ColVals {
            constructor(value: number|string, superThis: Calculator, colProps?: ColProps) {
                super(value, colProps);
                this.ftn = (val: CalculatorButtonValues) => {
                    if (superThis.state.isOperationActive) {
                        superThis.setState({
                            displayText: "",
                            isOperationActive: false,
                        });
                    }
                    superThis.update(val);
                }
            }
        }(value, this, colProps);
    }

    private createOperationButtonColVals(value: number|string, operation: Function, colProps?: ColProps) {
        return new class extends ColVals {
            constructor(value: number|string, superThis: Calculator, colProps?: ColProps) {
                super(value, colProps);
                this.ftn = (_: any) => {
                    superThis.setState(state => {
                        return {
                            previousVal: state.displayText,
                            displayText: operation(state.previousVal, state.displayText),
                            isOperationActive: true,
                        }
                    });
                };
            }
        }(value, this, colProps);
    }

    private clear(): void {
        this.setState(() => {
            return {
                previousVal: "",
                displayText: "",
            }
        });
    }

    public update(val: CalculatorButtonValues): void {
        console.log(`update(): ${val}`);
        this.setState(state => {
            if (this.state.displayText.length < Calculator.MAX_DISPLAY_LENGTH) {
                return { displayText: state.displayText + val };
            }
        });
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
                            new ColVals(CalculatorButtonValues.AC, {xs:{span:9}}, ()=>this.clear()),
                            new ColVals(CalculatorButtonValues.DIVIDE, {xs:{span:3}}),
                        ],
                        [
                            this.createNumberButtonColVals(CalculatorButtonValues.ONE),
                            this.createNumberButtonColVals(CalculatorButtonValues.TWO),
                            this.createNumberButtonColVals(CalculatorButtonValues.THREE),
                            new ColVals(CalculatorButtonValues.MULTIPLY),
                        ],
                        [
                            this.createNumberButtonColVals(CalculatorButtonValues.FOUR),
                            this.createNumberButtonColVals(CalculatorButtonValues.FIVE),
                            this.createNumberButtonColVals(CalculatorButtonValues.SIX),
                            new ColVals(CalculatorButtonValues.SUBTRACT),
                        ],
                        [
                            this.createNumberButtonColVals(CalculatorButtonValues.SEVEN),
                            this.createNumberButtonColVals(CalculatorButtonValues.EIGHT),
                            this.createNumberButtonColVals(CalculatorButtonValues.NINE),
                            this.createOperationButtonColVals(CalculatorButtonValues.ADD, (val1: string, val2: string) => {
                                return (parseFloat(val1 || "0") + parseFloat(val2)).toString();
                            }),
                        ],
                        [
                            this.createNumberButtonColVals(CalculatorButtonValues.ZERO, {xs:{span:6}}),
                            new ColVals(CalculatorButtonValues.DOT, {xs:{span:3}}, (val: CalculatorButtonValues)=>{
                                if (this.state.displayText &&
                                    !this.state.displayText.includes(CalculatorButtonValues.DOT)) {
                                    this.update(val);
                                }
                            }),
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
                                                    commandObj={col}
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
