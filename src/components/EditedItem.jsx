import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditedItem extends PureComponent {
  static propTypes = {
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    chooseFormStyle: PropTypes.func.isRequired,
    isInputValid: PropTypes.func.isRequired,
    fillInTitle: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editedText: props.item.text,
    };
  }

  inputChange = (event) => {
    this.setState({
      editedText: event.currentTarget.value,
    });
  };

  saveItem = () => {
    this.props.onSaveItem(this.state.editedText);
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-4">
          <div className="input-group">
            <span className="input-group-addon">
              {this.props.index}.
            </span>
            <input
              className={this.props
                .chooseFormStyle(
                  this.state.editedText)}
              value={this.state.editedText}
              onChange={this.inputChange}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.saveItem}
          title={this.props.fillInTitle(this.state.editedText)}
          disabled={!this.props
            .isInputValid(
              this.state.editedText)}
        >
          Save
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}
