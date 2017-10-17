import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }
  handleSave() {
    this.props.onItemSaved(this.state.text);
    this.props.handleEditableState(false);
  }
  handleCancel() {
    this.props.handleCancel();
    this.props.handleEditableState(false);
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
    this.props.keepNotSavedText(event.target.value);
  }
  handleClick() {
    this.props.handleEditableState(true);
  }
  render() {
    return (
      <li className="list-group-item">
        {(this.props.editable) ?
          <div>
            <div className="col-xs-4">
              <input className="form-control" value={this.state.text} onChange={(event) => this.handleChange(event)} />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => this.handleSave()}>Save</button>
            <button type="button" className="btn btn-light" onClick={() => this.handleCancel()}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={() => this.props.actionDelete()}>Delete</button>
          </div> :
          <div onClick={() => this.handleClick()}>{this.state.text}</div>}
      </li>
    );
  }
}

ListItem.propTypes = {
  text: PropTypes.string,
  onItemSaved: PropTypes.func,
  handleEditableState: PropTypes.func,
  keepNotSavedText: PropTypes.func,
  actionDelete: PropTypes.func,
};
