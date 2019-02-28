import React from 'react';
import PropTypes from 'prop-types';

import style from '../scss/components/textbox.scss';

class Textbox extends React.Component {

    constructor(props) {
        super(props);

        let { disabled, value } = props;

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.state = {
            value
        }
    }

    getInitialState() {
       return {};
   }

    componentDidMount() {
        let { invalid } = this.props;

        if (invalid) {
            this.input.setCustomValidity(true);
        }
    }

    componentWillReceiveProps(nextProps) {
        let { value, invalid } = nextProps;

        if (value != this.state.value) {
            this.setState({value: value});
        }
        this.input.setCustomValidity(invalid ? true : "");
	}

    render() {
        let { type, className, text, placeholder} = this.props;
        let { value } = this.state;

        return (
            <input
                className={"textbox"}
                type={type}
                defaultValue={value}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                placeholder={placeholder}
                ref={input => this.input = input}
            />
         );
    }

    setValue(value) {
        if (this.state.value == value) {
            return;
        }

        this.setState({value});

        if (!this.props.validation(value)) {
            this.input.setCustomValidity("true");
            return;
        }
        this.input.setCustomValidity("");
        this.props.onInputChanged(value);
    }

    // called when input changed
    onChange(e) {
        this.input.setCustomValidity("");
    }

    onBlur(e) {
        let value = this.input.value.trim();
        this.setValue(value);
    }

    onKeyDown(e) {
        if (e.key === 'Enter') {
            let value = this.input.value.trim();
            this.setValue(value);
        }
    }
}

Textbox.defaultProps = {
    type: "text",
    invalid: false,
    placeholder: ""
};

Textbox.propTypes = {
    onInputChanged: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default Textbox;
