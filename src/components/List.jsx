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
      })),
    };
  }

  onAddItem = (newText) => {
    if (newText !== '') {
      const newValues = [
        ...this.state.items, {
          id: generateId(),
          text: newText,
        },
      ];
      this.setState({
        items: newValues,
      });
    }
  };

  onDeleteItem = (id) => {
    const newArray = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: newArray,
    });
  };

  onSaveItem = (id, savedText) => {
    const newArray = this.state.items.map((item) =>
      ((item.id !== id) ?
          item :
          ({
            id: item.id,
            text: savedText,
          })
      )
    );
    this.setState({
      items: newArray,
    });
  };

  render() {
    return (
      <div className="row">
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
                item={item}
                index={index}
                actionDelete={this.onDeleteItem}
                onSaveItem={this.onSaveItem}
              />)}
            <AddItem
              onAddItem={this.onAddItem}
            />
          </ul>
        </div>
      </div>
    );
  }
}
