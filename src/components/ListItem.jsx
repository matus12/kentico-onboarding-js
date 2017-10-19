import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItem extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    isEdited: PropTypes.func.isRequired,
    actionDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      textBackup: props.text,
    };
  }

  onDelete = () => {
    this.props.actionDelete(this.props.index);
  };
  onSaveItem = () => {
    this.setState({
      textBackup: this.state.text,
    });
    this.props.onSaveItem(this.props.index, this.state.text);
    this.props.isEdited(this.props.index, false);
  };
  onCancel = () => {
    this.setState({
      text: this.state.textBackup,
    });
    this.props.onCancel(this.props.index);
    this.props.isEdited(this.props.index, false);
  };
  onChange = (event) => {
    this.setState({ text: event.target.value });
  };
  onClick = () => {
    this.props.isEdited(this.props.index, true);
  };

  render() {
    return (
      <li className="list-group-item">
        {(this.props.editable) ?
          <div>
            <div className="col-xs-4">
              <input
                className="form-control"
                value={this.state.text}
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
              onClick={this.onCancel}
            >Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onDelete}
            >Delete
            </button>
          </div> :
          <div onClick={this.onClick}>{this.state.text}</div>}
      </li>
    );
  }
}
