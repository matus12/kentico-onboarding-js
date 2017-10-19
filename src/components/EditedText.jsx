import React, { PureComponent } from 'react';

export class EditedText extends PureComponent {
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
