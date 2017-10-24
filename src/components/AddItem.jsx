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
        {(this.state.inputText === '') ?
          <button
            type="button"
            title="Please fill out the field"
            className="btn btn-light"
            disabled
          >
            Add
          </button> :
          <button
            type="button"
            className="btn btn-light"
            onClick={this.addItem}
          >
            Add
          </button>
        }
      </li>
    );
  }
}
