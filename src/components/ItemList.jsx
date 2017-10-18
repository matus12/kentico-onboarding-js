import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { Add } from './Add';
import PropTypes from 'prop-types';
const Guid = require('guid');

export class ItemList extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      values: props.values.map((val) => ({ id: this.generateID(), text: val, textBackup: val, isEdited: false })),
      inputValue: '',
    };
  }
  generateID = () => {
    return Guid.create().value;
  };
  handleChangeOfInputText = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  handleAdd = (value) => {
    if (value !== '') {
      const newValues = [...this.state.values, { id: this.generateID(), text: value, textBackup: value, isEdited: false }];
      this.setState({
        values: newValues,
        inputValue: '' });
    }
  };
  handleDelete = (index) => {
    const newArray = this.state.values.filter((value, i) => i !== index);
    this.setState({
      values: newArray,
    });
  };
  handleSaveText = (index, text) => {
    const newArray = [...this.state.values];
    newArray[index].text = text;
    newArray[index].textBackup = text;
    this.setState({
      values: newArray,
    });
  };
  handleCancel = (index) => {
    const newArray = [...this.state.values];
    newArray[index].text = this.state.values[index].textBackup;
    this.setState({
      values: newArray,
    });
  };
  handleEditableState = (index, editable) => {
    const newValues = [...this.state.values];
    newValues[index].isEdited = editable;
    this.setState({
      values: newValues,
    });
  };
  render() {
    return (
      <ul className="list-group">
        {this.state.values.map((val, index) =>
          <ListItem
            key={val.id} editable={val.isEdited} text={val.text} index={index}
            actionDelete={this.handleDelete}
            onItemSaved={this.handleSaveText}
            handleEditableState={this.handleEditableState}
            handleCancel={this.handleCancel}
          />)}
        <Add
          value={this.state.inputText}
          handleOnChange={this.handleChangeOfInputText}
          handleAdd={this.handleAdd}
        />
      </ul>
    );
  }
}

ItemList.propTypes = {
  values: PropTypes.array.isRequired,
};
