import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/inputValidation';

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

  chooseClass = () => {
    if (!this.state.isFocused) {
      return 'input-group';
    }
    if (this.state.isInputValid) {
      return 'input-group has-success';
    }
    return 'input-group has-error';
  };

  render() {
    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <div
            className={this.chooseClass()}
          >
            <input
              className="form-control"
              value={this.state.inputText}
              onChange={this.changeOfInput}
              onFocus={this.focus}
              onBlur={this.blur}
            />
          </div>
        </div>
        <button
          type="button"
          title={this.state.isInputValid
            ? undefined
            : 'Please fill out the form'}
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
