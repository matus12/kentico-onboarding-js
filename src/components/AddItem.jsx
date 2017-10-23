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

  onChangeOfInput = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  onAddItem = () => {
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
            onChange={this.onChangeOfInput}
          />
        </div>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.onAddItem}
        >
          Add
        </button>
      </li>
    );
  }
}
