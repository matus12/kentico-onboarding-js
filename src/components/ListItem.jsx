import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      textBackup: props.text,
    };
  }
  handleDelete = () => {
    this.props.actionDelete(this.props.index);
  }
  handleSave = () => {
    this.setState({
      textBackup: this.state.text,
    });
    this.props.onItemSaved(this.props.index, this.state.text);
    this.props.handleEditableState(this.props.index, false);
  };
  handleCancel = () => {
    this.setState({
      text: this.state.textBackup,
    });
    this.props.handleCancel(this.props.index);
    this.props.handleEditableState(this.props.index, false);
  };
  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };
  handleClick = () => {
    this.props.handleEditableState(this.props.index, true);
  };
  render() {
    return (
      <li className="list-group-item">
        {(this.props.editable) ?
          <div>
            <div className="col-xs-4">
              <input className="form-control" value={this.state.text} onChange={this.handleChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
            <button type="button" className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
          </div> :
          <div onClick={this.handleClick}>{this.state.text}</div>}
      </li>
    );
  }
}

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  onItemSaved: PropTypes.func.isRequired,
  handleEditableState: PropTypes.func.isRequired,
  actionDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
