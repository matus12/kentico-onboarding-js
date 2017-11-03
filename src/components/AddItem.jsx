import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateText } from '../utils/inputValidation';
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
      isInputValid: validateText(event.currentTarget.value),
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
              this.state.isFocused && {
                'has-success': this.state.isInputValid,
                'has-error': !this.state.isInputValid,
              })
            }
          >
            <input
              className="form-control"
              value={this.state.inputText}
              onChange={this.changeOfInput}
              onFocus={this.focus}
              onBlur={this.blur}
              title={(this.state.isInputValid)
                ? undefined
                : 'Please fill out the form'
              }
            />
          </div>
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
