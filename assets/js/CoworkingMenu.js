import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export default class CoworkingMenu extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open1: false,
            open2: false,
        };
    }

    render() {
        const {open1, open2} = this.state;
        return (
            <>
                <Button
                    onClick={() => this.setState({open1: !open1})}
                    aria-controls="example1"
                    aria-expanded={open1}
                    className="btn btn-outline-primary btn-sm"
                >
                    <i className="fas fa-search"></i>
                </Button>

                <Button
                    onClick={() => this.setState({open2: !open2})}
                    aria-controls="example2"
                    aria-expanded={open2}
                    className="btn btn-outline-primary btn-sm"
                >
                    <i className="fas fa-cog"></i>
                </Button>

                <Collapse in={this.state.open1}>
                    <div id="example1">
                        1: Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </Collapse>

                <Collapse in={this.state.open2}>
                    <div id="example2">
                        2: Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </Collapse>
            </>
        );
    }
}