
import React from "react";
import ReactDOM from "react-dom";
import ColValsFactory from "../ColValsFactory";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
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

enum EvalState {
    AWAITING_FIRST_OPERAND,
    AWAITING_SECOND_OPERAND,
    AWAITING_EVAL,
}

type CalculatorState = {
    displayText: string,
    previousVal: string,
    activeOperation: Function,
    evalState: EvalState,
    clearAfterInput: boolean,
}

export default class Calculator extends React.Component<{}, CalculatorState> {

    state: CalculatorState = {
        displayText: "",
        previousVal: "",
        activeOperation: (_:any, val: string)=>val,
        evalState: EvalState.AWAITING_FIRST_OPERAND,
        clearAfterInput: false,
    };

    private static readonly MAX_DISPLAY_LENGTH = 28;

    private static NumberButtonColVals = class extends ColValsFactory {
        constructor(value: number|string, superThis: Calculator, colProps?: ColProps) {
            super(value, colProps, superThis);
        }

        public execute(val?: CalculatorButtonValues): void {
            if (this.superThis.state.clearAfterInput) {
                this.superThis.setState((state: CalculatorState) => {
                    return {
                        displayText: "",
                        clearAfterInput: false,
                        evalState: (() => {
                            switch(state.evalState) {
                                case EvalState.AWAITING_SECOND_OPERAND:
                                    return EvalState.AWAITING_EVAL;
                                default:
                                    return state.evalState;
                            }
                        })(),
                    }
                });
            }
            if (this.superThis.state.displayText == "0" &&
               this.superThis.state.evalState != EvalState.AWAITING_SECOND_OPERAND) {
                return;
            }
            this.superThis.update(val);
        }
    };
    private static ACColVals = class extends ColValsFactory {
        constructor(superThis: Calculator, colProps?: ColProps) {
            super(CalculatorButtonValues.AC, colProps, superThis);
        }

        public execute(_?: any) {
            this.superThis.clear();
        }
    };
    private static DecimalColVals = class extends ColValsFactory {
        constructor(superThis: Calculator, colProps?: ColProps) {
            super(CalculatorButtonValues.DOT, colProps, superThis);
        }

        public execute(val: CalculatorButtonValues) {
            if (this.superThis.state.displayText &&
                !this.superThis.state.displayText.includes(CalculatorButtonValues.DOT)) {
                this.superThis.update(val);
            }
        }
    };
    private static OperationColVals = class extends ColValsFactory {
        private operation: Function;

        constructor(value: number|string, superThis: Calculator, operation: Function, colProps?: ColProps) {
            super(value, colProps, superThis);
            this.operation = (val1: string, val2: string) => {
                return operation(parseFloat(val1 || "0"), parseFloat(val2)).toString();
            };
        }

        public execute(_?: any) {
            if (this.superThis.state.evalState == EvalState.AWAITING_EVAL) {
                this.superThis.evaluate();
            }
            this.superThis.setState((state: CalculatorState) => {
                return {
                    previousVal: state.displayText,
                    activeOperation: this.operation,
                    // activeOperation: (val1: string, val2: string) => {
                    //     return this.operation(state.activeOperation(state.previousVal, val1), val2);
                    // },
                    evalState: (() => {
                        switch (state.evalState) {
                            case EvalState.AWAITING_FIRST_OPERAND:
                                return EvalState.AWAITING_SECOND_OPERAND;
                            case EvalState.AWAITING_SECOND_OPERAND:
                                return EvalState.AWAITING_EVAL;
                            default:
                                return state.evalState;
                        }
                    })(),
                    clearAfterInput: true,
                }
            });
        }
    };
    private static EqualsColVals = class extends ColValsFactory {
        constructor(superThis: Calculator, colProps?: ColProps) {
            super(CalculatorButtonValues.EQUALS, colProps, superThis);
        }

        public execute(_?: any) {
            this.superThis.evaluate();
        }
    }

    componentDidMount() {
        
    }

    private evaluate(): void {
        this.setState((state: CalculatorState) => {
            return {
                previousVal: state.displayText,
                displayText: state.activeOperation(state.previousVal, state.displayText),
                activeOperation: (_:any, val: string)=>val,
                evalState: EvalState.AWAITING_FIRST_OPERAND,
                clearAfterInput: true,
            };
        });
    }

    private clear(): void {
        this.setState(() => {
            return {
                previousVal: "",
                displayText: "",
                evalState: EvalState.AWAITING_FIRST_OPERAND,
                clearAfterInput: false,
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
                            new Calculator.ACColVals(this, {xs:{span:9}}),
                            new Calculator.OperationColVals(CalculatorButtonValues.DIVIDE, this, (val1: number, val2: number) => {
                                return val1 / val2;
                            }),
                        ],
                        [
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.ONE, this),
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.TWO, this),
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.THREE, this),
                            new Calculator.OperationColVals(CalculatorButtonValues.MULTIPLY, this, (val1: number, val2: number) => {
                                return val1 * val2;
                            }),
                        ],
                        [
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.FOUR, this),
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.FIVE, this),
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.SIX, this),
                            new Calculator.OperationColVals(CalculatorButtonValues.SUBTRACT, this, (val1: number, val2: number) => {
                                return val1 - val2;
                            }),
                        ],
                        [
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.SEVEN, this),
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.EIGHT, this),
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.NINE, this),
                            new Calculator.OperationColVals(CalculatorButtonValues.ADD, this, (val1: number, val2: number) => {
                                return val1 + val2;
                            }),
                        ],
                        [
                            new Calculator.NumberButtonColVals(CalculatorButtonValues.ZERO, this, {xs:{span:6}}),
                            new Calculator.DecimalColVals(this, {xs:{span:3}}),
                            new Calculator.EqualsColVals(this, {xs:{span:3}}),
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
