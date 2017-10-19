import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Add extends PureComponent {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = ({
      inputValue: '',
    });
  }

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  addItem = () => {
    this.props.addItem(this.state.inputValue);
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
            onChange={this.onChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.addItem}
        >
          Add
        </button>
      </li>
    );
  }
}
