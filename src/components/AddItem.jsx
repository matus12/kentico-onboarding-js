import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/inputValidation';
import classnames from 'classnames';

export class AddItem extends PureComponent {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      inputText: '',
      isFocused: false,
      isInputValid: false,
    });
  }

  changeOfInput = (event) => {
    this.setState({
      inputText: event.target.value,
      isFocused: true,
      isInputValid: isInputValid(event.currentTarget.value),
    });
  };

  addItem = () => {
    this.props.onAddItem(this.state.inputText);
    this.setState({
      inputText: '',
      isInputValid: false,
    });
  };

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

  render() {
    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <div
            className={classnames('input-group',
              { 'has-success': this.state.isFocused && this.state.isInputValid },
              { 'has-error': this.state.isFocused && !this.state.isInputValid })
            }
          >
            <input
              className="form-control"
              value={this.state.inputText}
              onChange={this.changeOfInput}
              onFocus={this.focus}
              onBlur={this.blur}
              title={classnames({
                'Please fill out the form': !this.state.isInputValid,
              })}
            />
          </div>
        </div>
        <button
          type="button"
          title={classnames({
            'Please fill out the form': !this.state.isInputValid,
          })}
          className="btn btn-primary"
          disabled={!this.state.isInputValid}
          onClick={this.addItem}
        >
          Add
        </button>
      </li>
    );
  }
}
