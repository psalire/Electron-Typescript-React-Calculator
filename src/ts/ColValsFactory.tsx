
import iCommand from "./iCommand";
import Calculator from "./react-components/Calculator";
import { ColProps } from "react-bootstrap";

export default abstract class ColValsFactory implements iCommand {
    public value: number|string;
    public colProps?: ColProps;
    protected superThis?: Calculator|any;

    public abstract execute(val?: any): void;

    constructor(value: number|string, colProps?: ColProps, superThis?: Calculator|any) {
        this.value = value;
        this.colProps = colProps || {};
        this.superThis = superThis;
    }
}
