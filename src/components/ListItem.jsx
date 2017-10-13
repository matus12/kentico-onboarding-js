import React, { PureComponent } from 'react';

export class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editable: props.editable,
      text: props.text,
      text2: props.text,
    };
  }

  handleSave() {
    this.setState({ text2: this.state.text });
    this.setState({ editable: false });
    this.props.actionEdit(this.state.text);
    this.props.handleEditableState(false);
  }
  handleCancel() {
    this.setState({ text: this.state.text2 });
    this.setState({ editable: false });
    this.props.handleEditableState(false);
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  handleClick() {
    this.setState({ editable: true });
    this.props.handleEditableState(true);
  }
  render() {
    return (
      <li className="list-group-item">
        {(this.state.editable) ?
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
