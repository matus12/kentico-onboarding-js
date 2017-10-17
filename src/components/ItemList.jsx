import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { Add } from './Add';
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
  handleChangeOfInputText(value) {
    this.setState({
      inputValue: value,
    });
  }
  handleAdd(value) {
    if (value !== '') {
      const newValues = [...this.state.values, { text: value, isEdited: false }];
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
        {this.state.values.map((val, index) => <ListItem
          key={this.guid()} editable={val.isEdited} text={val.text}
          actionDelete={() => this.handleDelete(index)}
          onItemEdited={(text) => this.handleEditText(index, text)}
          handleEditableState={(editable) => this.handleEditableState(index, editable)}
        />)}
        <Add
          value={this.state.inputText}
          handleOnChange={(value) => this.handleChangeOfInputText(value)}
          handleAdd={(value) => this.handleAdd(value)}
        />
      </ul>
    );
  }
}
