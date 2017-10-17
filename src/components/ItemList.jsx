import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import PropTypes from 'prop-types';
const Guid = require('guid');

export class ItemList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values.map((val) => ({ text: val, isEdited: false })),
      inputValue: '',
    };
  }
  guid() {
    return Guid.create().value;
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }
  handleAdd() {
    const newValues = [...this.state.values];
    if (this.state.inputValue !== '') {
      newValues.push({ text: this.state.inputValue, isEdited: false });
      this.setState({
        values: newValues,
        inputValue: '' });
    }
  }
  handleDelete(index) {
    const newArray = this.state.values.filter((value, i) => i !== index);
    this.setState({
      values: newArray,
    });
  }
  handleEditText(index, text) {
    const newArray = [...this.state.values];
    newArray[index].text = text;
    this.setState({
      values: newArray,
    });
  }
  handleEditableState(index, editable) {
    const newValues = [...this.state.values];
    newValues[index].isEdited = editable;
    this.setState({
      values: newValues,
    });
  }
  render() {
    return (
      <ul className="list-group">
        {this.state.values.map((val, index) => <ListItem key={this.guid()} editable={val.isEdited} text={val.text} actionDelete={() => this.handleDelete(index)} actionEdit={(text) => this.handleEditText(index, text)} handleEditableState={(editable) => this.handleEditableState(index, editable)} />)}
        <li className="list-group-item">
          <div className="col-xs-4">
            <input className="form-control" value={this.state.inputValue} onChange={(event) => this.handleChange(event)} />
          </div>
          <button type="button" className="btn btn-light" onClick={() => this.handleAdd()}>Add</button>
        </li>
      </ul>
    );
  }
}

