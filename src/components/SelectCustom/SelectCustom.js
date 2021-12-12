import { Label } from 'reactstrap';
import React, { Component } from 'react';
import Select from 'react-select';

export class SelectCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };
    }

    handleChange = (selectedOptionUser) => {
        this.setState({ selectedOption: selectedOptionUser });
        this.props.handleChange(selectedOptionUser);
        //console.log(`Option selected:`, selectedOptionUser);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <div>
                <Label for={this.props.for}> {this.props.text} </Label>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.props.options}
                    placeholder={""}
                    className={this.props.className}
                    name={this.props.name}
                />
            </div>
        );
    }
}

export default SelectCustom
