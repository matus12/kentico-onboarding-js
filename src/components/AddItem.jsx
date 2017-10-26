import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddItem extends PureComponent {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      inputText: '',
    });
  }

  changeOfInput = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  addItem = () => {
    this.props.onAddItem(this.state.inputText);
    this.setState({
      inputText: '',
    });
  };

  render() {
    const isInputValid = !!this.state.inputText;
    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <input
            className="form-control"
            value={this.state.inputText}
            onChange={this.changeOfInput}
            required
          />
        </div>
        <button
          type="button"
          title="Please fill out the field"
          className="btn btn-light"
          disabled={!isInputValid}
          onClick={this.addItem}
        >
          Add
        </button>
      </li>
    );
  }
}
