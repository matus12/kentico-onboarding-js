import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { Add } from './Add';
import PropTypes from 'prop-types';
import { generateId } from '../utils/generateId';

export class ItemList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      items: props.items.map((val) => ({
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
        ...this.state.items, {
          id: generateId(),
          text: value,
          textBackup: value,
          isEdited: false,
        },
      ];
      this.setState({
        items: newValues,
        inputValue: '',
      });
    }
  };

  onDeleteItem = (index) => {
    const newArray = this.state.items.filter((value, i) => i !== index);
    this.setState({
      items: newArray,
    });
  };

  onSaveItem = (index, text) => {
    const newArray = [...this.state.items];
    newArray[index].text = text;
    newArray[index].textBackup = text;
    this.setState({
      items: newArray,
    });
  };

  onCancel = (index) => {
    const newArray = [...this.state.items];
    newArray[index].text = this.state.items[index].textBackup;
    this.setState({
      items: newArray,
    });
  };

  setIsEdited = (index, isEdited) => {
    const newValues = [...this.state.items];
    newValues[index].isEdited = isEdited;
    this.setState({
      items: newValues,
    });
  };

  render() {
    return (
      <ul className="list-group">
        {this.state.items.map((item, index) =>
          <ListItem
            key={item.id}
            isEdited={item.isEdited}
            text={item.text}
            item={item}
            index={index}
            actionDelete={this.onDeleteItem}
            onSaveItem={this.onSaveItem}
            setIsEdited={this.setIsEdited}
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
