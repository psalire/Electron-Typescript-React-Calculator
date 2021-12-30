
import React from "react";
import ReactDOM from "react-dom";
import {
    Col,
    Container,
    Row,
} from "react-bootstrap";

type CalculatorProps = {
    content?: string;
}

export default class Calculator extends React.Component<CalculatorProps,{}> {

    public render(): JSX.Element {
        return (
            <Container fluid>
                <Row>
                    <Col className="text-primary">{this.props.content}</Col>
                </Row>
            </Container>
        );
    }
}
