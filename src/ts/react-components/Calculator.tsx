
import React from "react";
import ReactDOM from "react-dom";
import CalculatorButton from "./CalculatorButton";
import iListener from "../iListener";
import {
    Col,
    Container,
    Row,
} from "react-bootstrap";

// type CalculatorProps = {
//     content?: string;
// }

export default class Calculator extends React.Component<{},{}> implements iListener {

    public update(val: number): void {
        console.log(`update(): ${val}`);
    }

    public render(): JSX.Element {
        return (
            <Container fluid>
                {
                    [
                        [1,2,3],
                        [4,5,6],
                        [7,8,9],
                    ].map(row => {
                        return (
                            <Row>
                                {
                                    row.map(col => {
                                        return (
                                            <Col className="text-primary">
                                                <CalculatorButton
                                                    value={col}
                                                    listener={this}
                                                />
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        )
                    })
                }
            </Container>
        );
    }
}
