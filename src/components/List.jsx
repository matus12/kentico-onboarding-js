import React, { PureComponent } from 'react';
import { AddItem } from './AddItem';
import { generateId } from '../utils/generateId';
import { generateList } from '../utils/initItemList';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: generateList().map((itemText) => ({
        id: generateId(),
        text: itemText,
        textBackup: itemText,
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

  onDeleteItem = (id) => {
    const newArray = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: newArray,
    });
  };

  onSaveItem = (id, newText) => {
    this.state.items.map((item) => (
      item.id === id ?
        ({
          id: item.id,
          text: newText,
          textBackup: newText,
          isEdited: false,
        }) :
        item
      )
    );
  };

  onCancel = (id) => {
    this.state.items.map((item) => (
        item.id === id ?
          ({
            id: item.id,
            text: this.state.textBackup,
            textBackup: this.state.textBackup,
            isEdited: false,
          }) :
          item
      )
    );
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
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.state.items.map((item, index) =>
              <Item
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
            <AddItem
              value={this.state.inputText}
              onAddItem={this.onAddItem}
            />
          </ul>
        </div>
      </div>
    );
  }
}
