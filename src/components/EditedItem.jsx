import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditedItem extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editedText: props.text,
    };
  }

  onChange = (event) => {
    this.setState({
      editedText: event.currentTarget.value,
    });
  };

  onSaveItem = () => {
    this.props.onSaveItem(this.state.editedText);
  };

  render() {
    return (
      <div>
        <div className="col-xs-4">
          <input
            className="form-control"
            value={this.state.editedText}
            onChange={this.onChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onSaveItem}
        >Save
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={this.props.onCancel}
        >Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >Delete
        </button>
      </div>
    );
  }
}
