import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class Input extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isInputValid: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      isFocused: false,
    });
  }

  focus = () => {
    this.setState({
      isFocused: true,
    });
  };

  blur = () => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    return (
      <div
        className={classnames('input-group',
          this.state.isFocused && {
            'has-success': this.props.isInputValid,
            'has-error': !this.props.isInputValid,
          })
        }
      >
        <input
          className="form-control"
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.focus}
          onBlur={this.blur}
          title={(this.props.isInputValid)
            ? undefined
            : 'Please fill out the form'
          }
        />
      </div>
    );
  }
}
