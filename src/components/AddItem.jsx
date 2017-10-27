import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddItem extends PureComponent {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
    chooseFormStyle: PropTypes.func.isRequired,
    isInputValid: PropTypes.func.isRequired,
    fillInTitle: PropTypes.func.isRequired,
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
            className={this.props
              .chooseFormStyle(
              this.state.inputText)}
            value={this.state.inputText}
            onChange={this.changeOfInput}
          />
        </div>
        <button
          type="button"
          title={this.props.fillInTitle(this.state.inputText)}
          className="btn btn-primary"
          disabled={!this.props
            .isInputValid(
            this.state.inputText)}
          onClick={this.addItem}
        >
          Add
        </button>
      </li>
    );
  }
}
