import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Add extends PureComponent {
  constructor(props) {
    super(props);

    this.state = ({
      inputValue: '',
    });
  }

  handleOnChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  handleAdd = () => {
    this.props.handleAdd(this.state.inputValue);
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
            onChange={this.handleOnChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.handleAdd}
        >
          Add
        </button>
      </li>
    );
  }
}

Add.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
