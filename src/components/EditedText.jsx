import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditedText extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <div className="col-xs-4">
          <input
            className="form-control"
            value={this.props.text}
            onChange={this.props.onChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.onSaveItem}
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
