import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateText } from '../utils/textValidation';
import { Input } from './Input';

export class AddedItem extends PureComponent {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      inputText: '',
      isInputValid: false,
    });
  }

  changeOfInput = (event) => {
    this.setState({
      inputText: event.target.value,
      isInputValid: validateText(event.currentTarget.value),
    });
  };

  addItem = () => {
    this.props.onAddItem(this.state.inputText);
    this.setState(() => ({
      inputText: '',
      isInputValid: false,
    }));
  };

  render() {
    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <Input
            value={this.state.inputText}
            isInputValid={this.state.isInputValid}
            onChange={this.changeOfInput}
          />
        </div>
        <button
          type="button"
          title={(this.state.isInputValid)
            ? undefined
            : 'Please fill out the form'
          }
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
