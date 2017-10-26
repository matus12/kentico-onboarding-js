import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditedItem extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
              className="form-control"
              value={this.state.editedText}
              onChange={this.inputChange}
              required
            />
          </div>
        </div>
        {(this.state.editedText !== '') ?
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.saveItem}
          >
            Save
          </button> :
          <button
            type="button"
            className="btn btn-primary"
            title="Please fill out the field"
            disabled
          >
            Save
          </button>
        }

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
