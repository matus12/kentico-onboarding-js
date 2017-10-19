import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { Add } from './Add';
import PropTypes from 'prop-types';
import { generateId } from '../utils/generateId';

export class ItemList extends PureComponent {
  static propTypes = {
    values: PropTypes.array.isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      values: props.values.map((val) => ({
        id: generateId(),
        text: val,
        textBackup: val,
        isEdited: false,
      })),
      inputValue: '',
    };
  }

  onAddItem = (value) => {
    if (value !== '') {
      const newValues = [
        ...this.state.values, {
          id: this.generateId,
          text: value,
          textBackup: value,
          isEdited: false,
        },
      ];
      this.setState({
        values: newValues,
        inputValue: '',
      });
    }
  };

  onDeleteItem = (index) => {
    const newArray = this.state.values.filter((value, i) => i !== index);
    this.setState({
      values: newArray,
    });
  };

  onSaveItem = (index, text) => {
    const newArray = [...this.state.values];
    newArray[index].text = text;
    newArray[index].textBackup = text;
    this.setState({
      values: newArray,
    });
  };

  onCancel = (index) => {
    const newArray = [...this.state.values];
    newArray[index].text = this.state.values[index].textBackup;
    this.setState({
      values: newArray,
    });
  };

  isEdited = (index, editable) => {
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
            key={val.id}
            editable={val.isEdited}
            text={val.text}
            index={index}
            actionDelete={this.onDeleteItem}
            onSaveItem={this.onSaveItem}
            isEdited={this.isEdited}
            onCancel={this.onCancel}
          />)}
        <Add
          value={this.state.inputText}
          onAddItem={this.onAddItem}
        />
      </ul>
    );
  }
}
