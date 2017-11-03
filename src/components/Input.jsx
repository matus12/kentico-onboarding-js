import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { validateText } from '../utils/textValidation';
import PropTypes from 'prop-types';

export class Input extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      isFocused: false,
      isInputValid: validateText(props.text),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== '' ||
        this.props.text === nextProps.text) {
      return;
    }
    this.setState({
      isInputValid: false,
    });
  }

  focus = () => {
    this.setState({
      isFocused: true,
    });
  };

  blur = () => {
    this.setState(() => ({
      isFocused: false,
    }));
  };

  changeOfInput = (event) => {
    this.setState({
      isInputValid: validateText(event.currentTarget.value),
    });
    this.props.onChange(event);
  };

  render() {
    return (
      <div
        className={classnames('input-group',
          this.state.isFocused && {
            'has-success': this.state.isInputValid,
            'has-error': !this.state.isInputValid,
          })
        }
      >
        <input
          className="form-control"
          value={this.props.text}
          onChange={this.changeOfInput}
          onFocus={this.focus}
          onBlur={this.blur}
          title={(this.state.isInputValid)
            ? undefined
            : 'Please fill out the form'
          }
        />
      </div>
    );
  }
}
