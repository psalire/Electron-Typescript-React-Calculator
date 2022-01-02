
import React from "react";
import ReactDOM from "react-dom";

type CalculatorDisplayProps = {
    text: string,
}

export default class CalculatorDisplay extends React.Component<CalculatorDisplayProps, {}> {

    public render(): JSX.Element {
        return (
            <div>
                {this.props.text || "\u00A0"}
            </div>
        );
    }
}
