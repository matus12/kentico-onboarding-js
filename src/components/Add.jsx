import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Add extends PureComponent {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      inputValue: '',
    });
  }

  onChangeOfInput = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  onAddItem = () => {
    this.props.onAddItem(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };

  render() {
    return (
      <li className="list-group-item">
        <div className="col-xs-4">
          <input
            className="form-control"
            value={this.state.inputValue}
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
