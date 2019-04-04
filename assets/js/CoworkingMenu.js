import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Nav } from './nav';

export default class CoworkingMenu extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            searchToggle: false
        };
    }

    render() {
        const {searchToggle} = this.state;

        return (
            <>
                <Nav modeStatus={this.props.modeStatus} onModeChange={this.props.onModeChange} />

                <Button
                    onClick={() => this.setState({searchToggle: !searchToggle})}
                    aria-controls="search"
                    aria-expanded={searchToggle}
                    variant="outline-primary"
                >
                    <i className="fas fa-search"></i>
                </Button>

                <Collapse in={this.state.searchToggle}>
                    <div id="search">
                        <input type="text"/>
                    </div>
                </Collapse>
            </>
        );
    }
}